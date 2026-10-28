'use client';

import { useEffect, useMemo, useState } from 'react';
import { LayoutGrid, Route, Gauge, FlaskConical, Wind, ClipboardCheck, Play, Square } from 'lucide-react';

/*
 * Zephyra FlightLab, redrawn for the website from the current desktop application:
 * annunciator bar, aircraft card with SITL / HIL mode, grouped navigation
 * (Overview · Fly · Analyse · Record), live telemetry, DGCA test procedures,
 * the Aero twin and the evidence ledger. Values are illustrative.
 */

const DURATION = 16; // seconds per run

type Proc = {
  id: string;
  title: string;
  basis: string;
  objective: string;
  steps: string[];
  criteria: string;
  result: string;
  /** altitude in metres for run fraction t */
  alt: (t: number) => number;
  /** second trace */
  trace2: { label: string; unit: string; max: number; fn: (t: number) => number };
  events: [number, string][];
  fault?: number;
};

const climb = (t: number, top: number) => (t < 0.18 ? (t / 0.18) * top : top);
const land = (t: number, start: number, from: number) => (t < start ? from : Math.max(0, from * (1 - (t - start) / (0.95 - start))));

const PROCS: Proc[] = [
  {
    id: 'DGCA-01',
    title: 'Height limit 120 m AGL',
    basis: 'Drone Rules 2021; DigitalSky green zone ceiling 400 ft AGL',
    objective: 'The aircraft cannot climb above 120 m AGL, even when commanded to.',
    steps: ['Upload a mission with one waypoint at 140 m AGL', 'Take off and start the mission', 'Watch the height as the aircraft reaches the fence', 'Land and disarm'],
    criteria: 'Highest point ≤ 122 m AGL',
    result: 'Highest point 120.4 m AGL',
    alt: (t) => land(t, 0.78, Math.min(120.4, climb(t, 150))),
    trace2: { label: 'Commanded height', unit: 'm', max: 150, fn: (t) => (t < 0.78 ? 140 : 0) },
    events: [[0.03, 'Mission uploaded: waypoint at 140 m AGL'], [0.16, 'Climbing'], [0.2, 'Height fence reached at 120 m. Climb stopped'], [0.78, 'Landing'], [0.96, 'Landed and disarmed']],
  },
  {
    id: 'DGCA-03',
    title: 'Command and control link loss: return',
    basis: 'Drone Rules 2021: return to home on link loss',
    objective: 'Losing the ground station link starts Return after the set timeout.',
    steps: ['Fly a mission leg at 30 m AGL, at least 150 m from home', 'Cut the ground station link', 'Wait 10 s: Return should start', 'Let Return land the aircraft'],
    criteria: 'Lands within 10 m of home · stays below 120 m AGL',
    result: 'Return after 10.2 s · landed 2.1 m from home',
    alt: (t) => land(t, 0.8, climb(t, 30)),
    trace2: { label: 'Distance from home', unit: 'm', max: 220, fn: (t) => (t < 0.18 ? 0 : t < 0.45 ? ((t - 0.18) / 0.27) * 190 : Math.max(2.1, 190 * (1 - (t - 0.5) / 0.3))) },
    events: [[0.03, 'Mission leg started at 30 m AGL'], [0.4, 'Ground station link lost'], [0.47, 'Return started after 10.2 s'], [0.8, 'Over home. Landing'], [0.96, 'Landed 2.1 m from home']],
  },
  {
    id: 'DGCA-05',
    title: 'Low battery: return then land',
    basis: 'Certification Scheme for UAS: failsafe behaviour',
    objective: 'A low battery report brings the aircraft home and down before the battery is exhausted.',
    steps: ['Fly away from home at 30 m AGL', 'Inject a low-battery state', 'Observe Return, then Land', 'Disarm'],
    criteria: 'Ends on the ground · lands within 15 m of home',
    result: 'Landed 4.6 m from home with 9% remaining',
    alt: (t) => land(t, 0.75, climb(t, 30)),
    trace2: { label: 'Battery', unit: '%', max: 100, fn: (t) => (t < 0.42 ? 62 - t * 30 : Math.max(9, 15 - (t - 0.42) * 11)) },
    events: [[0.03, 'Flying away from home at 30 m AGL'], [0.42, 'Low battery reported (15%)'], [0.45, 'Return started'], [0.75, 'Landing'], [0.96, 'Landed 4.6 m from home, 9% remaining']],
  },
  {
    id: 'DGCA-07',
    title: 'Motor failure: controlled descent',
    basis: 'Certification Scheme for UAS: propulsion failure',
    objective: 'Losing one motor leads to a controlled descent, not a loss of control.',
    steps: ['Hover at 30 m AGL', 'Stop one motor', 'Observe the coaxial partner take the load', 'Controlled descent and landing'],
    criteria: 'Roll and pitch stay within 35° · lands upright',
    result: 'Peak tilt 11° · landed upright',
    alt: (t) => land(t, 0.46, climb(t, 30)),
    trace2: { label: 'Tilt', unit: '°', max: 40, fn: (t) => (t < 0.42 ? 2 : t < 0.5 ? 2 + ((t - 0.42) / 0.08) * 9 : Math.max(2, 11 - (t - 0.5) * 30)) },
    events: [[0.03, 'Hover at 30 m AGL'], [0.42, 'Front-right upper motor stopped'], [0.44, 'Thrust redistributed to its coaxial partner'], [0.46, 'Controlled descent'], [0.96, 'Landed upright. Peak tilt 11°']],
    fault: 1,
  },
];

const MISSIONS = [
  { name: 'KIA Local Validation', detail: 'Local circuit, return to home' },
  { name: 'Airport City Connector', detail: 'Airport to the neighbouring business district' },
  { name: 'Aerospace Park Loop', detail: 'Loop over the aerospace park' },
  { name: 'Devanahalli Response', detail: 'Rapid out-and-back to Devanahalli' },
  { name: 'North Bengaluru Range Study', detail: 'Longest leg, checks reserve energy' },
];

const OBJECTIVES = [
  { objective: 'Configuration baseline', focus: 'Type design and configuration control', status: 'In progress' },
  { objective: 'System safety scenarios', focus: 'Project-specific certification basis evidence', status: 'In progress' },
  { objective: 'Autonomy and flight-control behaviour', focus: 'Means-of-compliance simulation evidence', status: 'In progress' },
  { objective: 'Performance and flight envelope', focus: 'VTOL-capable aircraft performance evidence', status: 'Planned' },
  { objective: 'Operational and training readiness', focus: 'Future operational approval planning', status: 'Planned' },
  { objective: 'Requirements validation', focus: 'Correct and complete aircraft and system requirements', status: 'Planned' },
];

const NAV = [
  { group: null, items: [{ id: 'overview', label: 'Overview', Icon: LayoutGrid }] },
  { group: 'Fly', items: [{ id: 'missions', label: 'Missions', Icon: Route }, { id: 'live', label: 'Live flight', Icon: Gauge }, { id: 'tests', label: 'Flight tests', Icon: FlaskConical }] },
  { group: 'Analyse', items: [{ id: 'aero', label: 'Aero twin', Icon: Wind }] },
  { group: 'Record', items: [{ id: 'evidence', label: 'Evidence', Icon: ClipboardCheck }] },
] as const;
type Tab = 'overview' | 'missions' | 'live' | 'tests' | 'aero' | 'evidence';

// Rotor hub positions measured from the top-down Kestrel X2 render (nose up), 0–100 frame.
const ARMS = [
  { x: 19.2, y: 36.8 },
  { x: 81.1, y: 36.8 },
  { x: 21.0, y: 65.0 },
  { x: 79.2, y: 65.3 },
];

function path(fn: (t: number) => number, max: number, upTo: number, w = 260, h = 56) {
  const pts: string[] = [];
  for (let i = 0; i <= 90 * upTo; i++) {
    const t = i / 90;
    pts.push(`${(t * w).toFixed(1)},${(h - 3 - (Math.min(fn(t), max) / max) * (h - 8)).toFixed(1)}`);
  }
  return pts.join(' ');
}

function Card({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-cloud p-4 ring-1 ring-line">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[14px] font-semibold text-carbon">{title}</p>
        {action}
      </div>
      {children}
    </div>
  );
}

function Rows({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-1.5 text-[12.5px]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-slate">{k}</dt>
          <dd className="text-carbon">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Trace({ label, value, fn, max, t }: { label: string; value: string; fn: (t: number) => number; max: number; t: number }) {
  return (
    <div className="rounded-xl bg-cloud p-3 ring-1 ring-line">
      <div className="flex items-baseline justify-between">
        <p className="text-[12px] text-slate">{label}</p>
        <p className="tabular text-[13px] font-semibold text-carbon">{value}</p>
      </div>
      <svg viewBox="0 0 260 56" className="mt-1 h-14 w-full" aria-hidden="true">
        <line x1="0" y1="53" x2="260" y2="53" stroke="#DCE3E8" />
        <polyline points={path(fn, max, t)} fill="none" stroke="#D22B1F" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function FlightLabConsole() {
  const [tab, setTab] = useState<Tab>('tests');
  const [proc, setProc] = useState(PROCS[0]);
  const [mission, setMission] = useState(MISSIONS[0].name);
  const [mode, setMode] = useState<'SITL' | 'HIL'>('SITL');
  const [run, setRun] = useState(0);
  const [running, setRunning] = useState(true);
  const [t, setT] = useState(0);
  const [clock, setClock] = useState('');
  const [passed, setPassed] = useState<string[]>([]);

  // run clock: 20 updates a second is smooth for traces and cheap for the whole console
  useEffect(() => {
    if (!running) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = window.setTimeout(() => setT(1), 0);
      return () => window.clearTimeout(id);
    }
    const start = performance.now();
    const id = window.setInterval(() => {
      const next = Math.min(1, ((performance.now() - start) / 1000 / DURATION) % 1.12);
      setT(next);
      if (next >= 0.97) setPassed((list) => (list.includes(proc.id) ? list : [...list, proc.id]));
    }, 50);
    return () => window.clearInterval(id);
  }, [proc, run, running]);

  useEffect(() => {
    const tick = () => setClock(new Date().toISOString().slice(11, 19));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const alt = proc.alt(t);
  const v2 = proc.trace2.fn(t);
  const step = t < 0.04 ? 0 : t < 0.97 ? 1 : 2;
  const log = useMemo(() => proc.events.filter(([at]) => t >= at), [proc, t]);
  const faulted = proc.fault !== undefined && t > 0.42;
  const caution = t > 0.4 && t < 0.97 && proc.id !== 'DGCA-01';
  const airborne = alt > 0.3;
  const speed = airborne ? (proc.id === 'DGCA-07' && t > 0.46 ? 4 : t > 0.2 && t < 0.78 ? 80 : 18) : 0;
  const flightMode = !airborne ? (t > 0.9 ? 'Landed' : 'Ready') : proc.events.slice().reverse().find(([at]) => t >= at)?.[1].split('.')[0] ?? 'Mission';

  const launch = () => {
    setRunning(true);
    setRun((n) => n + 1);
    setT(0);
  };

  const topView = (
    <div className="relative mx-auto aspect-square w-full max-w-[300px]" role="img" aria-label={`Top view of Kestrel X2 during ${proc.id}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/kestrel/kestrel-topdown.webp" alt="" className="absolute inset-0 h-full w-full object-contain" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {ARMS.map((a, i) => {
          const lost = faulted && proc.fault === i;
          return (
            <g key={i}>
              <circle cx={a.x} cy={a.y} r={15} fill={lost ? 'rgba(210,43,31,0.08)' : 'rgba(29,107,63,0.05)'} stroke={lost ? '#D22B1F' : '#1D6B3F'} strokeOpacity={lost ? 0.9 : 0.5} strokeWidth="0.5" strokeDasharray={lost ? '1.6 1.6' : undefined} />
              {lost && <circle cx={a.x} cy={a.y} r={12.8} fill="none" stroke="#1D6B3F" strokeWidth="1" />}
            </g>
          );
        })}
      </svg>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-[20px] bg-cloud shadow-[0_1px_0_rgba(21,25,29,0.04),0_30px_80px_-30px_rgba(21,25,29,0.25)] ring-1 ring-line">
      {/* title + annunciator bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/flightlab-icon.png" alt="" className="h-7 w-7 rounded-md" />
          <span className="text-[14px] font-semibold tracking-tight text-carbon">Zephyra FlightLab</span>
          <span className="hidden text-[13px] text-slate md:inline">Integrated flight simulation for the Kestrel platform</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className={`rounded px-2 py-1 ring-1 ${caution ? 'bg-amber-100 text-amber-800 ring-amber-300' : 'text-slate ring-line'}`}>Master caution</span>
          <span className="rounded px-2 py-1 text-slate ring-1 ring-line">Master warning</span>
          <span className="tabular hidden pl-1 font-normal text-slate sm:inline">{clock || '--:--:--'} UTC</span>
        </div>
      </div>

      {/* link status */}
      <ul className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line bg-sky px-4 py-2 text-[12px] sm:px-5">
        {[
          ['Session', mode],
          ['Flight controller', 'On'],
          ['Simulator', 'On'],
          ['LAMINAR', 'On'],
          ['Telemetry', 'On'],
          ['Aero twin', tab === 'aero' ? 'Running' : 'Idle'],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${v === 'Idle' ? 'bg-steel' : 'bg-ok'}`} aria-hidden="true" />
            <span className="font-medium text-carbon">{k}</span>
            <span className={v === 'Idle' ? 'text-slate' : 'text-ok'}>{v}</span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
        {/* sidebar */}
        <aside className="flex flex-col border-b border-line p-4 lg:border-r lg:border-b-0">
          <p className="text-[11px] font-medium text-slate">Aircraft</p>
          <div className="mt-2 overflow-hidden rounded-xl bg-sky ring-1 ring-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kestrel/kestrel-hero.webp" alt="Kestrel X2" className="aspect-[16/10] w-full object-cover" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-[16px] font-semibold tracking-tight text-carbon">Kestrel X2</p>
              <p className="text-[12px] text-slate">Civilian eVTOL</p>
            </div>
            <div className="flex rounded-lg bg-mist p-0.5 text-[11px] font-semibold" role="group" aria-label="Session mode">
              {(['SITL', 'HIL'] as const).map((m) => (
                <button key={m} type="button" onClick={() => setMode(m)} aria-pressed={mode === m} className={`min-h-10 rounded-md px-3 py-1 sm:min-h-0 sm:px-2 ${mode === m ? 'bg-cloud text-carbon shadow-sm' : 'text-slate'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <nav aria-label="FlightLab sections" className="mt-4 flex gap-1 overflow-x-auto lg:block lg:space-y-3">
            {NAV.map(({ group, items }) => (
              <div key={group ?? 'top'} className="flex shrink-0 gap-1 lg:block">
                {group && <p className="hidden px-3 pb-1 text-[11px] font-medium text-steel lg:block">{group}</p>}
                {items.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id as Tab)}
                    aria-pressed={tab === id}
                    className={`flex w-full shrink-0 items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-[13.5px] transition-colors ${tab === id ? 'bg-mist font-semibold text-carbon' : 'text-slate hover:bg-sky hover:text-carbon'}`}
                  >
                    <Icon size={15} aria-hidden="true" className={tab === id ? 'text-kestrel' : ''} />
                    {label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="mt-4 space-y-2 lg:mt-auto lg:pt-6">
            <button type="button" onClick={launch} className="flex w-full items-center justify-center gap-2 rounded-full bg-kestrel px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-kestrel-deep">
              <Play size={13} aria-hidden="true" fill="currentColor" />
              Launch {mode} session
            </button>
            <button type="button" onClick={() => setRunning(false)} className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-kestrel ring-1 ring-line hover:bg-sky">
              <Square size={11} aria-hidden="true" fill="currentColor" />
              Stop session
            </button>
          </div>
        </aside>

        {/* main */}
        <div className="min-w-0 bg-sky/60 p-4 sm:p-5">
          {tab === 'overview' && (
            <div className="space-y-3">
              <p className="text-[17px] font-semibold tracking-tight text-carbon">Overview</p>
              <Card title="Alerts" action={<span className="text-[12px] text-slate">Acknowledge all</span>}>
                <p className={`text-[13px] font-medium ${caution ? 'text-amber-700' : 'text-ok'}`}>{caution ? `Caution: ${log[log.length - 1]?.[1] ?? ''}` : 'No active alerts.'}</p>
              </Card>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Card title="Session" action={<button type="button" onClick={() => setTab('live')} className="text-[12px] font-semibold text-kestrel">Open live flight</button>}>
                  <Rows rows={[['Mode', `${mode} · simulation`], ['Aircraft', 'Kestrel X2'], ['Running', running ? `${proc.id} ${proc.title}` : 'Nothing'], ['Evidence', `Record ${proc.id}-R0${run + 1}`]]} />
                </Card>
                <Card title="Readiness">
                  <ul className="grid grid-cols-2 gap-1.5 text-[12.5px]">
                    {['Flight controller', 'Simulator', 'LAMINAR', 'Telemetry', 'Aero twin', 'Hardware bench'].map((k) => (
                      <li key={k} className="flex items-center gap-1.5 text-carbon">
                        <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
                        {k}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card title="Last flight record" action={<button type="button" onClick={() => setTab('evidence')} className="text-[12px] font-semibold text-kestrel">Open evidence</button>}>
                  <Rows rows={[['Procedure', proc.id], ['Result', step === 2 ? 'Pass' : 'In progress'], ['Detail', proc.result]]} />
                </Card>
                <Card title="Aero twin" action={<button type="button" onClick={() => setTab('aero')} className="text-[12px] font-semibold text-kestrel">Open Aero twin</button>}>
                  <Rows rows={[['Case', 'Cruise, 80 km/h, level'], ['Use', 'Advisory engineering data, kept separate from the evidence ledger']]} />
                </Card>
              </div>
            </div>
          )}

          {tab === 'missions' && (
            <div>
              <p className="text-[17px] font-semibold tracking-tight text-carbon">Missions</p>
              <p className="mt-1 text-[13px] text-slate">Kestrel mission library. Simulation scenarios only, not approved flight corridors.</p>
              <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
                <ul className="divide-y divide-line overflow-hidden rounded-xl bg-cloud ring-1 ring-line">
                  {MISSIONS.map((m) => (
                    <li key={m.name}>
                      <button type="button" onClick={() => setMission(m.name)} aria-pressed={mission === m.name} className={`w-full px-4 py-2.5 text-left transition-colors ${mission === m.name ? 'bg-mist' : 'hover:bg-sky'}`}>
                        <span className={`block text-[13.5px] font-semibold ${mission === m.name ? 'text-kestrel' : 'text-carbon'}`}>{m.name}</span>
                        <span className="block text-[12px] text-slate">{m.detail}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <Card title={mission}>
                  <Rows rows={[['Take-off', '30 m AGL'], ['Climb rate', '3.0 m/s'], ['Cruise', '150 m AGL'], ['Cruise speed', '80 km/h'], ['Departure', 'Current home position'], ['Mission end', 'Return to launch']]} />
                  <p className="mt-4 rounded-lg bg-ok/10 px-3 py-2 text-[12px] font-medium text-ok">Within range, with energy reserve</p>
                  <button type="button" onClick={launch} className="mt-3 rounded-full bg-carbon px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-kestrel">Upload and fly in simulation</button>
                </Card>
              </div>
            </div>
          )}

          {tab === 'live' && (
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[17px] font-semibold tracking-tight text-carbon">Live flight</p>
                <p className="text-[12px] text-slate">Telemetry once a second during a recorded session. Read-only.</p>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_260px]">
                <div className="space-y-3">
                  {[
                    { title: 'Flight', rows: [['Mode', flightMode], ['Armed', airborne || t < 0.96 ? 'Yes' : 'No'], ['On ground', airborne ? 'No' : 'Yes'], ['GPS', '3D fix']] },
                    { title: 'Height and speed', rows: [['Altitude AGL', `${alt.toFixed(1)} m`], ['Airspeed', `${speed} km/h`], ['Climb rate', `${t < 0.18 && airborne ? '3.0' : t > 0.78 && airborne ? '-1.5' : '0.0'} m/s`], ['Ground speed', `${Math.max(0, speed - 3)} km/h`]] },
                    { title: 'Attitude and power', rows: [['Roll', `${faulted && t < 0.55 ? 8 : 1}°`], ['Pitch', `${speed > 40 ? -6 : 0}°`], ['Heading', '042°'], ['Battery', `${Math.round(proc.id === 'DGCA-05' ? v2 : 70 - t * 18)}%`]] },
                  ].map((g) => (
                    <div key={g.title} className="rounded-xl bg-cloud p-3 ring-1 ring-line">
                      <p className="text-[13px] font-semibold text-carbon">{g.title}</p>
                      <dl className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {g.rows.map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-[11px] text-slate">{k}</dt>
                            <dd className="tabular text-[14px] font-semibold text-carbon">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Trace label="Altitude AGL" value={`${alt.toFixed(0)} m`} fn={proc.alt} max={150} t={t} />
                    <Trace label={proc.trace2.label} value={`${v2.toFixed(0)} ${proc.trace2.unit}`} fn={proc.trace2.fn} max={proc.trace2.max} t={t} />
                  </div>
                </div>
                <div className="rounded-xl bg-cloud p-3 ring-1 ring-line">
                  <p className="text-[13px] font-semibold text-carbon">Propulsion</p>
                  {topView}
                  <p className="text-center text-[12px] text-slate">{faulted ? 'One motor lost · partner carrying the load' : 'Eight rotors nominal'}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'tests' && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[17px] font-semibold tracking-tight text-carbon">Flight tests</p>
                  <p className="text-[12.5px] text-slate">DGCA test procedures · simulation evidence</p>
                </div>
                <ol className="flex gap-1 text-[12px]" aria-label="Test stage">
                  {['Prepare', 'Execute', 'Review'].map((s, i) => (
                    <li key={s} aria-current={i === step ? 'step' : undefined} className={`rounded-md px-2.5 py-1 ${i === step ? 'bg-carbon font-semibold text-white' : i < step ? 'bg-mist text-carbon' : 'text-slate'}`}>
                      {i + 1} {s}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[230px_1fr_250px]">
                {/* procedures: scannable list with status */}
                <ul className="flex gap-2 overflow-x-auto xl:flex-col xl:overflow-visible" aria-label="Procedures">
                  {PROCS.map((p) => {
                    const on = p.id === proc.id;
                    const status = on && step < 2 ? 'Running' : passed.includes(p.id) ? 'Pass' : 'Not run';
                    return (
                      <li key={p.id} className="min-w-[200px] xl:min-w-0">
                        <button
                          type="button"
                          onClick={() => {
                            setProc(p);
                            setRunning(true);
                            setT(0);
                          }}
                          aria-pressed={on}
                          className={`w-full rounded-xl p-3 text-left ring-1 transition-colors ${on ? 'bg-cloud ring-2 ring-carbon' : 'bg-cloud ring-line hover:ring-line-strong'}`}
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-[12px] font-semibold text-carbon">{p.id}</span>
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10.5px] font-semibold ${
                                status === 'Pass' ? 'bg-ok/10 text-ok' : status === 'Running' ? 'bg-[#2F6FD6]/10 text-[#2558AE]' : 'bg-mist text-slate'
                              }`}
                            >
                              {status}
                            </span>
                          </span>
                          <span className="mt-1 block text-[12.5px] leading-snug text-slate">{p.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* the procedure and its verdict */}
                <div className="space-y-3">
                  <div className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 ring-1 ${step === 2 ? 'bg-ok/10 ring-ok/30' : 'bg-cloud ring-line'}`} aria-live="polite">
                    <div>
                      <p className={`text-[12px] font-semibold ${step === 2 ? 'text-ok' : 'text-slate'}`}>{step === 2 ? 'Verdict' : 'Running'}</p>
                      <p className="text-[15px] font-semibold text-carbon">{step === 2 ? `Pass · ${proc.result}` : `${proc.id} in progress`}</p>
                    </div>
                    <p className={`tabular text-[26px] font-semibold ${step === 2 ? 'text-ok' : 'text-carbon'}`}>{step === 2 ? 'PASS' : `${Math.round(t * 100)}%`}</p>
                  </div>

                  {/* timeline: progress with each event marked where it happens */}
                  <div className="rounded-xl bg-cloud p-4 ring-1 ring-line">
                    <div className="relative h-2 rounded-full bg-mist">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-kestrel" style={{ width: `${t * 100}%` }} />
                      {proc.events.map(([at, label]) => (
                        <span
                          key={label}
                          title={label}
                          className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-cloud ${t >= at ? 'bg-carbon' : 'bg-line-strong'}`}
                          style={{ left: `${at * 100}%` }}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-[13px] text-carbon">
                      <span className="tabular mr-2 text-slate">T+{Math.round(t * DURATION * 8)}s</span>
                      {log[log.length - 1]?.[1] ?? 'Waiting to start'}
                    </p>
                  </div>

                  <Card title={`${proc.id}  ${proc.title}`}>
                    <Rows
                      rows={[
                        ['Objective', proc.objective],
                        ['Steps', <ol key="s" className="list-decimal space-y-0.5 pl-4">{proc.steps.map((s) => <li key={s}>{s}</li>)}</ol>],
                        ['Pass criteria', proc.criteria],
                        ['Basis', <span key="b" className="text-slate">{proc.basis}</span>],
                      ]}
                    />
                  </Card>
                </div>

                {/* aircraft and live readouts */}
                <div className="space-y-3">
                  <div className="rounded-xl bg-cloud p-3 ring-1 ring-line">
                    {topView}
                    <p className="text-center text-[12px] text-slate">{faulted ? 'One motor lost · partner carrying the load' : 'Eight rotors nominal'}</p>
                  </div>
                  <Trace label="Altitude AGL" value={`${alt.toFixed(0)} m`} fn={proc.alt} max={150} t={t} />
                  <Trace label={proc.trace2.label} value={`${v2.toFixed(0)} ${proc.trace2.unit}`} fn={proc.trace2.fn} max={proc.trace2.max} t={t} />
                </div>
              </div>
            </div>
          )}

          {tab === 'aero' && (
            <div>
              <p className="text-[17px] font-semibold tracking-tight text-carbon">Aero twin</p>
              <p className="mt-1 text-[12.5px] text-slate">CFD wind tunnel for Kestrel X2. Advisory engineering data, kept separate from the evidence ledger.</p>
              <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_240px]">
                <div className="relative overflow-hidden rounded-xl bg-[#EEF3F6] ring-1 ring-line">
                  <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    {Array.from({ length: 13 }, (_, i) => {
                      const y = 20 + i * 18.5;
                      const d = Math.abs(y - 130);
                      const bulge = d < 70 ? (70 - d) * 0.55 * Math.sign(y - 130 || 1) : 0;
                      return (
                        <path
                          key={i}
                          d={`M0 ${y} C120 ${y}, 150 ${y + bulge}, 200 ${y + bulge} S280 ${y}, 400 ${y}`}
                          fill="none"
                          stroke={d < 40 ? '#D22B1F' : '#8FA3B3'}
                          strokeOpacity={d < 40 ? 0.7 : 0.55}
                          strokeWidth="1.3"
                          strokeDasharray="6 10"
                          style={{ strokeDashoffset: -t * 640 }}
                        />
                      );
                    })}
                  </svg>
                  <div className="relative mx-auto w-[58%] py-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/kestrel/kestrel-topdown.webp" alt="Kestrel X2 in the CFD wind tunnel, seen from above" className="w-full -rotate-90" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Card title="Case">
                    <Rows rows={[['Condition', 'Cruise, 80 km/h'], ['Attitude', 'Level, 6° nose-down'], ['Status', 'Converged']]} />
                  </Card>
                  <Card title="Airframe loads">
                    <dl className="space-y-2">
                      {[
                        ['Drag', `${(310 + Math.sin(t * 12) * 4).toFixed(0)} N`],
                        ['Lift', `${(42 + Math.sin(t * 9) * 2).toFixed(0)} N`],
                        ['Side force', `${(3 + Math.sin(t * 7)).toFixed(1)} N`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-[13px]">
                          <dt className="text-slate">{k}</dt>
                          <dd className="tabular font-semibold text-carbon">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {tab === 'evidence' && (
            <div>
              <p className="text-[17px] font-semibold tracking-tight text-carbon">Certification readiness</p>
              <p className="mt-1 text-[12.5px] text-slate">DGCA primary path, with indicative EASA and FAA reference mapping. Simulation evidence only.</p>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ['Evidence objectives', '8'],
                  ['Simulation records', String(12 + run)],
                  ['Ready for review', '3'],
                  ['Open planning gaps', '5'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-cloud px-4 py-3 ring-1 ring-line">
                    <p className="text-[12px] text-slate">{k}</p>
                    <p className="tabular mt-1 text-[24px] font-semibold text-carbon">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 overflow-x-auto rounded-xl bg-cloud ring-1 ring-line">
                <table className="w-full min-w-[560px] text-left text-[12.5px]">
                  <thead className="bg-sky text-[12px] text-slate">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">Objective</th>
                      <th className="px-4 py-2.5 font-medium">DGCA focus</th>
                      <th className="px-4 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {OBJECTIVES.map((o) => (
                      <tr key={o.objective}>
                        <td className="px-4 py-2.5 font-medium text-carbon">{o.objective}</td>
                        <td className="px-4 py-2.5 text-slate">{o.focus}</td>
                        <td className="px-4 py-2.5">
                          <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${o.status === 'In progress' ? 'bg-kestrel/10 text-kestrel' : 'bg-mist text-slate'}`}>{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[12px] text-slate">Statuses show internal evidence maturity. They are not regulatory findings or approvals.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
