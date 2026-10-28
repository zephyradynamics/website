'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Map as MapLibreMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

/*
 * LAMINAR operator view on a real map of Bengaluru (rules: DESIGN.md › Product consoles).
 *
 * Base: OpenStreetMap vector map (OpenFreeMap) or Sentinel-2 cloudless 2016 satellite (EOX, CC BY 4.0).
 * Airspace and corridors are MapLibre layers in geographic coordinates; in 3D they become volumes:
 * corridors are tubes at their altitude band, airspace zones are translucent columns
 * (vertical scale ×3 so 150 m reads at city scale). Aircraft, tags and vertiports are an SVG overlay
 * redrawn per frame; panels update four times a second. Traffic and airspace are illustrative.
 */

type LngLat = [number, number];

const PORTS: Record<string, { name: string; short: string; at: LngLat }> = {
  kia: { name: 'Kempegowda Intl. Airport', short: 'KIA', at: [77.706, 13.199] },
  hebbal: { name: 'Hebbal', short: 'HBL', at: [77.597, 13.035] },
  central: { name: 'MG Road', short: 'MGR', at: [77.607, 12.975] },
  whitefield: { name: 'Whitefield', short: 'WFD', at: [77.75, 12.97] },
  koramangala: { name: 'Koramangala', short: 'KRM', at: [77.624, 12.935] },
  hsr: { name: 'HSR Layout', short: 'HSR', at: [77.638, 12.912] },
  ecity: { name: 'Electronic City', short: 'ECY', at: [77.66, 12.845] },
};

// Routes follow the city's arterial roads and keep clear of the restricted and coordination zones.
const ROUTES: { id: string; from: string; to: string; via: LngLat[]; alt: number }[] = [
  { id: 'L1', from: 'central', to: 'kia', alt: 150, via: [[77.619, 13.0], [77.632, 13.04], [77.648, 13.085], [77.668, 13.13], [77.688, 13.168]] }, // east of NH 44, clear of Yelahanka AFS
  { id: 'L2', from: 'whitefield', to: 'koramangala', alt: 120, via: [[77.722, 12.958], [77.695, 12.94], [77.668, 12.925], [77.645, 12.928]] }, // Outer Ring Road, south of HAL
  { id: 'L3', from: 'hsr', to: 'ecity', alt: 105, via: [[77.643, 12.893], [77.65, 12.872], [77.656, 12.857]] }, // Hosur Road
  { id: 'L4', from: 'hebbal', to: 'whitefield', alt: 135, via: [[77.625, 13.04], [77.66, 13.03], [77.693, 13.01], [77.722, 12.988]] }, // Outer Ring Road north-east
  { id: 'L5', from: 'koramangala', to: 'central', alt: 120, via: [[77.621, 12.947], [77.614, 12.962]] },
];

const FLIGHTS = [
  { call: 'KX2-0417', route: 'L1', speed: 0.03, offset: 0.18 },
  { call: 'KX2-0422', route: 'L2', speed: 0.05, offset: 0.55 },
  { call: 'KX2-0431', route: 'L3', speed: 0.07, offset: 0.3 },
  { call: 'KX2-0436', route: 'L4', speed: 0.04, offset: 0.72 },
  { call: 'KX2-0440', route: 'L1', speed: 0.03, offset: 0.66 },
  { call: 'KX2-0452', route: 'L5', speed: 0.08, offset: 0.05 },
];

const AIRSPACE = [
  { id: 'ctr', label: 'KIA control zone', at: [77.706, 13.199] as LngLat, km: 7, top: 450, color: '#2F6FD6', text: '#2558AE', kind: 'control' },
  { id: 'r1', label: 'Restricted · Yelahanka AFS', at: [77.607, 13.136] as LngLat, km: 3.2, top: 600, color: '#C6372B', text: '#A12B21', kind: 'restricted' },
  { id: 'c1', label: 'HAL · coordinate', at: [77.668, 12.95] as LngLat, km: 2.2, top: 300, color: '#D07A1E', text: '#A35F13', kind: 'coordinate' },
];

const PHASE = { Climbing: '#1E8A55', Cruising: '#2F6FD6', Descending: '#D07A1E' } as const;
type Phase = keyof typeof PHASE;
const AMBER = '#D07A1E';
const RED = '#D22B1F';
const VEX = 3; // vertical exaggeration in 3D
const CRUISE_KMH = 135;

const BOUNDS: [LngLat, LngLat] = [
  [77.55, 12.83],
  [77.78, 13.22],
];
const SAT_TILES = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg';
const SAT_ATTRIBUTION =
  '<a href="https://s2maps.eu" target="_blank" rel="noopener">Sentinel-2 cloudless 2016</a> by EOX IT Services GmbH (contains modified Copernicus Sentinel data 2016), CC BY 4.0';

/* ---------------------------------------------------------------- geometry */

const M_PER_DEG_LAT = 110574;
const mPerDegLon = (lat: number) => 111320 * Math.cos((lat * Math.PI) / 180);

function catmull(pts: LngLat[], steps = 14): LngLat[] {
  const p = [pts[0], ...pts, pts[pts.length - 1]];
  const out: LngLat[] = [];
  for (let i = 1; i < p.length - 2; i++)
    for (let k = 0; k < steps; k++) {
      const u = k / steps;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
      out.push([f(p[i - 1][0], p[i][0], p[i + 1][0], p[i + 2][0]), f(p[i - 1][1], p[i][1], p[i + 1][1], p[i + 2][1])]);
    }
  out.push(pts[pts.length - 1]);
  return out;
}

type Route = (typeof ROUTES)[number] & { line: LngLat[]; cum: number[]; km: number };

const ROUTE_GEO: Route[] = ROUTES.map((r) => {
  const line = catmull([PORTS[r.from].at, ...r.via, PORTS[r.to].at]);
  const cum = [0];
  for (let i = 1; i < line.length; i++) {
    const [x0, y0] = line[i - 1];
    const [x1, y1] = line[i];
    cum.push(cum[i - 1] + Math.hypot((x1 - x0) * mPerDegLon(y0), (y1 - y0) * M_PER_DEG_LAT));
  }
  return { ...r, line, cum, km: cum[cum.length - 1] / 1000 };
});

function along(route: Route, t: number): { at: LngLat; ahead: LngLat } {
  const s = t * route.cum[route.cum.length - 1];
  let i = 1;
  while (i < route.cum.length - 1 && route.cum[i] < s) i++;
  const u = (s - route.cum[i - 1]) / Math.max(1e-6, route.cum[i] - route.cum[i - 1]);
  const a = route.line[i - 1];
  const b = route.line[i];
  return { at: [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u], ahead: b };
}

function ribbon(line: LngLat[], halfM: number): LngLat[] {
  const left: LngLat[] = [];
  const right: LngLat[] = [];
  for (let i = 0; i < line.length; i++) {
    const a = line[Math.max(0, i - 1)];
    const b = line[Math.min(line.length - 1, i + 1)];
    const lat = line[i][1];
    const dx = (b[0] - a[0]) * mPerDegLon(lat);
    const dy = (b[1] - a[1]) * M_PER_DEG_LAT;
    const n = Math.hypot(dx, dy) || 1;
    const ox = (-dy / n) * halfM;
    const oy = (dx / n) * halfM;
    left.push([line[i][0] + ox / mPerDegLon(lat), line[i][1] + oy / M_PER_DEG_LAT]);
    right.push([line[i][0] - ox / mPerDegLon(lat), line[i][1] - oy / M_PER_DEG_LAT]);
  }
  return [...left, ...right.reverse(), left[0]];
}

function circle(c: LngLat, km: number, n = 72): LngLat[] {
  const out: LngLat[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * 2 * Math.PI;
    out.push([c[0] + (Math.cos(a) * km * 1000) / mPerDegLon(c[1]), c[1] + (Math.sin(a) * km * 1000) / M_PER_DEG_LAT]);
  }
  return out;
}

const phaseOf = (t: number): Phase => (t < 0.1 ? 'Climbing' : t > 0.86 ? 'Descending' : 'Cruising');

function trafficAt(seconds: number) {
  return FLIGHTS.map((f) => {
    const route = ROUTE_GEO.find((r) => r.id === f.route)!;
    const t = (f.offset + seconds * f.speed) % 1;
    const ph = phaseOf(t);
    const alt = Math.round(route.alt * (ph === 'Climbing' ? t / 0.1 : ph === 'Descending' ? (1 - t) / 0.14 : 1));
    const { at, ahead } = along(route, t);
    return { ...f, t, ph, alt, at, ahead, route, etaMin: Math.max(0, Math.round(((1 - t) * route.km * 60) / CRUISE_KMH)) };
  });
}
type Traffic = ReturnType<typeof trafficAt>[number];

function advisoriesOf(traffic: Traffic[]) {
  const out: { a: string; b: string }[] = [];
  for (let i = 0; i < traffic.length; i++)
    for (let j = i + 1; j < traffic.length; j++) {
      const p = traffic[i];
      const q = traffic[j];
      const d = Math.hypot((p.at[0] - q.at[0]) * mPerDegLon(p.at[1]), (p.at[1] - q.at[1]) * M_PER_DEG_LAT);
      if (d < 1400 && Math.abs(p.alt - q.alt) < 40) out.push({ a: p.call, b: q.call });
    }
  return out;
}

const fc = (features: object[]) => ({ type: 'FeatureCollection' as const, features });
const AIRSPACE_FC = fc(AIRSPACE.map((z) => ({ type: 'Feature', properties: { kind: z.kind, color: z.color, top: z.top * VEX }, geometry: { type: 'Polygon', coordinates: [circle(z.at, z.km)] } })));
const CORRIDOR_FC = fc(ROUTE_GEO.map((r) => ({ type: 'Feature', properties: { id: r.id }, geometry: { type: 'LineString', coordinates: r.line } })));
const TUBE_FC = fc(ROUTE_GEO.map((r) => ({ type: 'Feature', properties: { id: r.id, base: (r.alt - 15) * VEX, top: (r.alt + 15) * VEX }, geometry: { type: 'Polygon', coordinates: [ribbon(r.line, 160)] } })));

/* ---------------------------------------------------------------- controls */

function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div className="flex rounded-lg bg-mist p-0.5" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)} aria-pressed={value === o} className={`h-10 rounded-md px-3 text-[12px] font-semibold transition-colors sm:h-7 sm:px-2.5 ${value === o ? 'bg-cloud text-carbon shadow-sm' : 'text-slate hover:text-carbon'}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- overlay (per frame) */

const OPEN_3D = { pitch: 55, bearing: -20, zoomIn: 0.75 };

type Layers = { Airspace: boolean; Corridors: boolean; Traffic: boolean; 'Ground risk': boolean };

function Overlay({ map, selected, onSelect, layers, view, sat }: { map: MapLibreMap; selected: string; onSelect: (c: string) => void; layers: Layers; view: '2D' | '3D'; sat: boolean }) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const start = performance.now();
    const tick = (time: number) => {
      setNow(reduced ? 6 : (time - start) / 1000);
      if (!reduced) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const traffic = trafficAt(now);
  const adv = advisoriesOf(traffic);
  const pitch = (map.getPitch() * Math.PI) / 180;
  const mpp = (40075016.686 * Math.cos((13 * Math.PI) / 180)) / (512 * 2 ** map.getZoom());
  const lift = (altM: number) => (view === '3D' ? ((altM * VEX) / mpp) * Math.sin(pitch) : 0);
  const halo = sat ? '#0F1317' : '#FFFFFF';
  const ink = sat ? '#FFFFFF' : '#0F1317';

  const pts = Object.fromEntries(
    traffic.map((f) => {
      const g = map.project(f.at);
      const h = map.project(f.ahead);
      const up = lift(f.alt);
      return [f.call, { gx: g.x, gy: g.y, x: g.x, y: g.y - up, hdg: (Math.atan2(h.y - g.y, h.x - g.x) * 180) / Math.PI + 90 }];
    }),
  );

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" role="img" aria-label="LAMINAR airspace, corridors and Kestrel X2 traffic over Bengaluru">
      {layers.Airspace &&
        AIRSPACE.map((z) => {
          const c = map.project(z.at);
          const top = map.project([z.at[0], z.at[1] + (z.km * 1000) / M_PER_DEG_LAT]);
          return (
            <text key={z.id} x={c.x} y={top.y - 6 - lift(z.top)} fontSize="11" fontWeight="600" fill={sat ? '#FFFFFF' : z.text} textAnchor="middle" stroke={halo} strokeWidth="3" strokeOpacity="0.9" paintOrder="stroke">
              {z.label}
            </text>
          );
        })}

      {Object.entries(PORTS).map(([k, p]) => {
        const c = map.project(p.at);
        return (
          <g key={k} transform={`translate(${c.x} ${c.y})`}>
            <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#0F1317" stroke="#fff" strokeWidth="1.2" />
            <circle r="4.2" fill="none" stroke="#fff" strokeWidth="1.4" />
            <text x="12" y="4" fontSize="11" fontWeight="700" fill={ink} stroke={halo} strokeWidth="3" paintOrder="stroke">
              {p.short}
            </text>
          </g>
        );
      })}

      {layers.Traffic &&
        adv.map((a) => (
          <line key={a.a + a.b} x1={pts[a.a].x} y1={pts[a.a].y} x2={pts[a.b].x} y2={pts[a.b].y} stroke={AMBER} strokeWidth="1.6" strokeDasharray="3 3" />
        ))}

      {layers.Traffic &&
        traffic.map((f) => {
          const p = pts[f.call];
          const on = f.call === selected;
          const col = on ? RED : PHASE[f.ph];
          const warn = adv.some((a) => a.a === f.call || a.b === f.call);
          return (
            <g key={f.call} className="pointer-events-auto cursor-pointer" onClick={() => onSelect(f.call)}>
              {view === '3D' && (
                <>
                  <line x1={p.gx} y1={p.gy} x2={p.x} y2={p.y} stroke={col} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.8" />
                  <ellipse cx={p.gx} cy={p.gy} rx="5" ry="2.5" fill={col} fillOpacity="0.35" />
                </>
              )}
              {/* separation ring only where it matters: the selected flight and any advisory pair */}
              {(on || warn) && <circle cx={p.x} cy={p.y} r="15" fill="none" stroke={warn ? AMBER : col} strokeOpacity="0.9" strokeDasharray="2 3" />}
              <g transform={`translate(${p.x} ${p.y}) rotate(${p.hdg})`}>
                <path d="M0 -8 L6 6 L0 3 L-6 6 Z" fill={col} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
              </g>
              {on ? (
                <>
                  <line x1={p.x + 8} y1={p.y - 8} x2={p.x + 16} y2={p.y - 16} stroke={col} strokeWidth="0.9" />
                  <g transform={`translate(${p.x + 16} ${p.y - 42})`}>
                    <rect width="92" height="27" rx="3" fill="#fff" fillOpacity="0.96" stroke={col} strokeWidth="1.3" />
                    <text x="5" y="12" fontSize="9" fontWeight="700" fill="#0F1317">{f.call}</text>
                    <text x="5" y="22" fontSize="8" fill="#4A5560">
                      {f.alt} m · {CRUISE_KMH} km/h · {f.route.id}
                    </text>
                  </g>
                </>
              ) : (
                // everyone else: just the call sign, small, beside the arrow
                <text x={p.x + 10} y={p.y + 3} fontSize="9" fontWeight="600" fill={ink} fillOpacity="0.8" stroke={halo} strokeWidth="2.5" paintOrder="stroke">
                  {f.call}
                </text>
              )}
            </g>
          );
        })}
    </svg>
  );
}

/* ---------------------------------------------------------------- console */

export default function LaminarConsole({ compact = false }: { compact?: boolean }) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [selected, setSelected] = useState(FLIGHTS[0].call);
  const [base, setBase] = useState<'Map' | 'Satellite'>('Map');
  const [view, setView] = useState<'2D' | '3D'>('3D');
  // opens on the essentials: corridors and traffic; airspace and ground risk are one tap away
  const [layers, setLayers] = useState<Layers>({ Airspace: false, Corridors: true, Traffic: true, 'Ground risk': false });
  const [slow, setSlow] = useState(0);

  // panels: four updates a second
  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => setSlow((performance.now() - start) / 1000), 250);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const maplibregl = await import('maplibre-gl');
      if (cancelled || !mapEl.current) return;
      // the bundler can't resolve MapLibre's worker from node_modules, so it is served from /public
      // (copied from node_modules/maplibre-gl/dist by the postinstall script)
      maplibregl.setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');
      const m = new maplibregl.Map({
        container: mapEl.current,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        bounds: BOUNDS,
        // opens tilted: the 3D view is the default
        fitBoundsOptions: { padding: 12, pitch: OPEN_3D.pitch, bearing: OPEN_3D.bearing },
        pitch: OPEN_3D.pitch,
        bearing: OPEN_3D.bearing,
        attributionControl: { compact: true },
        scrollZoom: false,
        dragRotate: false,
        touchPitch: false,
        maxZoom: 16,
        minZoom: 9,
      });
      m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      const ro = new ResizeObserver(() => m.resize());
      ro.observe(mapEl.current);
      m.once('remove', () => ro.disconnect());
      m.on('load', () => {
        m.resize();
        m.fitBounds(BOUNDS, { padding: 12, pitch: OPEN_3D.pitch, bearing: OPEN_3D.bearing, duration: 0 });
        m.jumpTo({ zoom: m.getZoom() + OPEN_3D.zoomIn }); // a tilted fit leaves the network small: step in
        const firstSymbol = m.getStyle().layers?.find((l: { type: string }) => l.type === 'symbol')?.id;

        // standard OpenStreetMap colours, with the fine detail removed so corridors and aircraft stay readable:
        // no shop or landmark icons, house numbers, road names or shields, rail and transit lines, one-way
        // arrows, footpaths or service lanes, and no village or hamlet names (areas and cities stay)
        for (const l of m.getStyle().layers ?? []) {
          const id = l.id;
          const detail = /^poi|housenumber|shield|one_way|transit|rail|aerialway|ferry|path|track|service|pedestrian|steps|cycleway|bridleway/.test(id);
          const roadName = l.type === 'symbol' && /road|street|highway/.test(id);
          const smallPlace = l.type === 'symbol' && /village|hamlet|neighbourhood|quarter|isolated|place_other/.test(id);
          if (detail || roadName || smallPlace) m.setLayoutProperty(id, 'visibility', 'none');
        }

        // direction arrow for corridors (SDF so it can be recoloured)
        const c = document.createElement('canvas');
        c.width = c.height = 32;
        const g = c.getContext('2d')!;
        g.strokeStyle = '#fff';
        g.lineWidth = 5;
        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.beginPath();
        g.moveTo(10, 7);
        g.lineTo(22, 16);
        g.lineTo(10, 25);
        g.stroke();
        m.addImage('lam-arrow', g.getImageData(0, 0, 32, 32), { sdf: true });

        m.addSource('sat', { type: 'raster', tiles: [SAT_TILES], tileSize: 256, maxzoom: 13, attribution: SAT_ATTRIBUTION });
        m.addLayer({ id: 'sat', type: 'raster', source: 'sat', layout: { visibility: 'none' } }, firstSymbol);
        m.addSource('risk', {
          type: 'image',
          url: '/map/ground-risk.png',
          coordinates: [
            [77.5, 13.24],
            [77.8, 13.24],
            [77.8, 12.8],
            [77.5, 12.8],
          ],
        });
        m.addLayer({ id: 'risk', type: 'raster', source: 'risk', layout: { visibility: 'none' }, paint: { 'raster-opacity': 0.65 } }, firstSymbol);

        m.addSource('airspace', { type: 'geojson', data: AIRSPACE_FC as never });
        m.addLayer({ id: 'air-fill', type: 'fill', source: 'airspace', paint: { 'fill-color': ['get', 'color'], 'fill-opacity': ['case', ['==', ['get', 'kind'], 'restricted'], 0.16, 0.08] } });
        for (const [kind, dash] of [
          ['control', [4, 2]],
          ['restricted', [1, 0]],
          ['coordinate', [2, 2]],
        ] as const)
          m.addLayer({ id: `air-line-${kind}`, type: 'line', source: 'airspace', filter: ['==', ['get', 'kind'], kind], paint: { 'line-color': ['get', 'color'], 'line-width': 1.6, 'line-opacity': 0.85, 'line-dasharray': [...dash] } });
        m.addLayer({ id: 'air-3d', type: 'fill-extrusion', source: 'airspace', layout: { visibility: 'none' }, paint: { 'fill-extrusion-color': ['get', 'color'], 'fill-extrusion-height': ['get', 'top'], 'fill-extrusion-base': 0, 'fill-extrusion-opacity': 0.1 } });

        m.addSource('corridors', { type: 'geojson', data: CORRIDOR_FC as never });
        m.addLayer({ id: 'corr-casing', type: 'line', source: 'corridors', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#FFFFFF', 'line-width': 6, 'line-opacity': 0.9 } });
        m.addLayer({ id: 'corr-line', type: 'line', source: 'corridors', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#5B6F86', 'line-width': 2.4 } });
        m.addLayer({
          id: 'corr-arrows',
          type: 'symbol',
          source: 'corridors',
          layout: { 'symbol-placement': 'line', 'symbol-spacing': 90, 'icon-image': 'lam-arrow', 'icon-size': 0.42, 'icon-allow-overlap': true },
          paint: { 'icon-color': '#5B6F86' },
        });
        m.addSource('tubes', { type: 'geojson', data: TUBE_FC as never });
        m.addLayer({ id: 'corr-3d', type: 'fill-extrusion', source: 'tubes', layout: { visibility: 'none' }, paint: { 'fill-extrusion-color': '#2F6FD6', 'fill-extrusion-height': ['get', 'top'], 'fill-extrusion-base': ['get', 'base'], 'fill-extrusion-opacity': 0.7 } });
        setMap(m);
      });
      mapRef.current = m;
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // layer visibility and selection styling
  useEffect(() => {
    if (!map) return;
    const vis = (on: boolean) => (on ? 'visible' : 'none');
    const three = view === '3D';
    map.setLayoutProperty('sat', 'visibility', vis(base === 'Satellite'));
    map.setLayoutProperty('risk', 'visibility', vis(layers['Ground risk']));
    for (const id of ['air-fill', 'air-line-control', 'air-line-restricted', 'air-line-coordinate']) map.setLayoutProperty(id, 'visibility', vis(layers.Airspace));
    map.setLayoutProperty('air-3d', 'visibility', vis(layers.Airspace && three));
    map.setLayoutProperty('corr-line', 'visibility', vis(layers.Corridors));
    for (const id of ['corr-casing', 'corr-arrows']) map.setLayoutProperty(id, 'visibility', vis(layers.Corridors && !three));
    map.setLayoutProperty('corr-3d', 'visibility', vis(layers.Corridors && three));
    const sel = FLIGHTS.find((f) => f.call === selected)!.route;
    const pick = (on: string, off: string) => ['case', ['==', ['get', 'id'], sel], on, off] as never;
    map.setPaintProperty('corr-line', 'line-color', pick(RED, base === 'Satellite' ? '#FFFFFF' : '#5B6F86'));
    map.setPaintProperty('corr-line', 'line-width', ['case', ['==', ['get', 'id'], sel], 3.4, 2.2] as never);
    map.setPaintProperty('corr-line', 'line-opacity', three ? 0.35 : 1);
    map.setPaintProperty('corr-arrows', 'icon-color', pick(RED, '#5B6F86'));
    map.setPaintProperty('corr-3d', 'fill-extrusion-color', pick(RED, '#2F6FD6'));
  }, [map, base, layers, view, selected]);

  // camera for the view: the first framing is instant, later switches animate
  const framed = useRef(false);
  useEffect(() => {
    if (!map) return;
    const fit = map.cameraForBounds(BOUNDS, { padding: 12 });
    if (!framed.current) {
      framed.current = true; // the map was created already tilted
      return;
    }
    const cam = view === '3D'
      ? { pitch: OPEN_3D.pitch, bearing: OPEN_3D.bearing, zoom: (fit?.zoom ?? map.getZoom()) + OPEN_3D.zoomIn, center: fit?.center }
      : { pitch: 0, bearing: 0, zoom: fit?.zoom, center: fit?.center };
    map.easeTo({ ...cam, duration: view === '3D' ? 900 : 700 });
  }, [map, view]);

  const traffic = useMemo(() => trafficAt(slow), [slow]);
  const adv = useMemo(() => advisoriesOf(traffic), [traffic]);
  const active = traffic.find((f) => f.call === selected)!;
  const clock = new Date(Date.UTC(2026, 0, 1, 3, 12) + slow * 1000).toISOString().slice(11, 19);
  const sat = base === 'Satellite';

  return (
    <div className="overflow-hidden rounded-[20px] bg-cloud shadow-[0_1px_0_rgba(21,25,29,0.04),0_30px_80px_-30px_rgba(21,25,29,0.25)] ring-1 ring-line">
      {/* title bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/laminar-logo.png" alt="" className="h-7 w-7 object-contain" />
          <span className="text-[14px] font-semibold tracking-[0.02em] text-carbon">LAMINAR</span>
          <span className="hidden text-[13px] text-slate sm:inline">Bengaluru · Whitefield sector</span>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-slate">
          <span className="hidden rounded-md bg-sky px-2.5 py-1 ring-1 ring-line md:inline">Wind 240° 12 kt · Vis 8 km · 27 °C</span>
          <span className="flex items-center gap-1.5 font-medium text-ok">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" aria-hidden="true" />
            Live
          </span>
          <span className="tabular">{clock} UTC</span>
        </div>
      </div>

      {/* toolbar: base · view · layers */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-sky px-4 py-2 sm:px-5">
        <Seg label="Base map" value={base} options={['Map', 'Satellite'] as const} onChange={setBase} />
        <Seg label="View" value={view} options={['2D', '3D'] as const} onChange={setView} />
        <span className="hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Map layers">
          {(Object.keys(layers) as (keyof Layers)[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLayers((s) => ({ ...s, [l]: !s[l] }))}
              aria-pressed={layers[l]}
              className={`flex h-10 items-center gap-1.5 rounded-md px-3 text-[12px] font-semibold ring-1 transition-colors sm:h-7 sm:px-2.5 ${layers[l] ? 'bg-carbon text-white ring-carbon' : 'bg-cloud text-slate ring-line hover:text-carbon'}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${layers[l] ? 'bg-white' : 'bg-steel'}`} aria-hidden="true" />
              {l}
            </button>
          ))}
        </div>
        {view === '3D' && <span className="text-[11px] text-slate lg:ml-auto">Heights ×{VEX}. Zoom in to see 3D buildings.</span>}
      </div>

      <div className={`grid grid-cols-1 ${compact ? '' : 'lg:grid-cols-[1fr_320px]'}`}>
        {/* map */}
        <div className="relative aspect-[4/3] bg-[#EEF3F6] sm:aspect-[800/520]">
          {/* MapLibre forces position: relative on its container, so size it explicitly */}
          <div ref={mapEl} className="h-full w-full" aria-label="Map of Bengaluru" />
          {map && <Overlay map={map} selected={selected} onSelect={setSelected} layers={layers} view={view} sat={sat} />}
          {!map && <p className="absolute inset-0 grid place-items-center text-[13px] text-slate">Loading the map of Bengaluru…</p>}

          <div className="absolute bottom-8 left-3 hidden flex-wrap gap-x-3 gap-y-1 rounded-lg bg-cloud/95 px-3 py-2 text-[11px] text-slate shadow-sm ring-1 ring-line md:flex">
            {(Object.keys(PHASE) as Phase[]).map((k) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm" style={{ background: PHASE[k] }} aria-hidden="true" />
                {k}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-kestrel" aria-hidden="true" />
              Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-3" style={{ background: AMBER }} aria-hidden="true" />
              Advisory
            </span>
          </div>
        </div>

        {/* panel: selected flight (primary) · strips (secondary) · status (tertiary) */}
        {!compact && (
          <div className="flex flex-col border-t border-line lg:border-t-0 lg:border-l">
            <div className="border-b border-line p-4">
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-slate">Selected flight</p>
                <span className="rounded-md px-2 py-0.5 text-[11px] font-semibold text-white" style={{ background: PHASE[active.ph] }}>
                  {active.ph}
                </span>
              </div>
              <p className="mt-1 text-[22px] font-semibold tracking-tight text-carbon">{active.call}</p>
              <p className="text-[13px] text-slate">
                {PORTS[active.route.from].name} → {PORTS[active.route.to].name}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
                <div className="h-full rounded-full bg-kestrel transition-[width] duration-200" style={{ width: `${Math.round(active.t * 100)}%` }} />
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[12px] sm:grid-cols-4 lg:grid-cols-2">
                {[
                  ['Altitude', `${active.alt} m`],
                  ['Speed', `${CRUISE_KMH} km/h`],
                  ['Corridor', `${active.route.id} · ${active.route.km.toFixed(1)} km`],
                  ['ETA', `${active.etaMin} min`],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="text-slate">{k}</dt>
                    <dd className="tabular truncate text-[13px] font-semibold text-carbon">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex items-center justify-between px-4 pt-3 pb-1.5 text-[11px] font-medium text-steel">
              <span>Flight strips</span>
              <span>Altitude · ETA</span>
            </div>
            <ul className="max-h-[236px] flex-1 overflow-y-auto px-3 pb-2">
              {traffic.map((f) => {
                const on = f.call === selected;
                return (
                  <li key={f.call} className="mb-1.5">
                    <button
                      type="button"
                      onClick={() => setSelected(f.call)}
                      aria-pressed={on}
                      className={`flex w-full items-stretch overflow-hidden rounded-lg text-left ring-1 transition-colors ${on ? 'bg-mist ring-kestrel/40' : 'bg-cloud ring-line hover:bg-sky'}`}
                    >
                      <span className="w-1 shrink-0" style={{ background: on ? RED : PHASE[f.ph] }} aria-hidden="true" />
                      <span className="grid flex-1 grid-cols-[1fr_auto] items-center gap-2 px-3 py-2">
                        <span>
                          <span className="block text-[12.5px] font-semibold text-carbon">{f.call}</span>
                          <span className="block text-[11px] text-slate">
                            {PORTS[f.route.from].short} → {PORTS[f.route.to].short} · {f.route.id} · {f.ph}
                          </span>
                        </span>
                        <span className="tabular text-right text-[11.5px] text-carbon">
                          {f.alt} m
                          <br />
                          <span className="text-slate">{f.etaMin} min</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line p-4">
              {adv.length > 0 ? (
                <p className="rounded-lg px-3 py-2 text-[12px]" style={{ background: 'rgba(208,122,30,0.1)', color: '#8A4F0E' }}>
                  <span className="font-semibold">Advisory.</span> {adv[0].a} and {adv[0].b} converging at similar height. {adv[0].b} slowed by 8 km/h to keep separation.
                </p>
              ) : (
                <p className="rounded-lg bg-ok/10 px-3 py-2 text-[12px] font-medium text-ok">All aircraft separated. No advisories.</p>
              )}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  [String(FLIGHTS.length), 'Aircraft'],
                  [String(ROUTES.length), 'Corridors'],
                  ['0', 'Conflicts'],
                ].map(([v, k]) => (
                  <div key={k} className="rounded-lg bg-sky py-2 ring-1 ring-line">
                    <p className="tabular text-[18px] font-semibold text-carbon">{v}</p>
                    <p className="text-[11px] text-slate">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
