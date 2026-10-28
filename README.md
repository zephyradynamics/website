# Zephyra Dynamics website

Shaping the future of Urban Air Mobility in India.

Next.js 16 (App Router), React 19, Tailwind CSS 4. Light-only "daylight" brand system.

## Run

```bash
npm install
npm run dev
```

## Environment

| Variable | Use |
|---|---|
| `RESEND_API_KEY` | Server-only key for the contact and careers forms. Do **not** prefix it with `NEXT_PUBLIC_`, which would expose it in the browser. The old `NEXT_PUBLIC_RESEND_API_KEY` is read as a fallback until Vercel is updated. |

## Where things live

- `app/globals.css`: brand tokens (Sky, Cloud, Haze, Carbon, Slate, Kestrel Red) and type scale. Archivo with its width axis; `.font-wide` is the expanded display cut.
- `components/LoopVideo.tsx`: muted looping clips that play only on screen and fall back to a poster for reduced motion.
- `components/LaminarConsole.tsx`, `components/FlightLabConsole.tsx`: the coded LAMINAR and FlightLab product UIs.
- `public/video/*.mp4` and `public/poster/*.jpg`: web loops cut from the master films (H.264, no audio, 0.5–6 MB each).
- `public/kestrel/*.webp`: Kestrel X2 studio renders. Source script: `../renders/studio_stills.py` (Blender, Cycles).

## Approved public facts

Kestrel X2: single seat, fully autonomous, electric, eight rotors in four coaxial pairs, 35–45 km range, 80–135 km/h cruise.
Also approved: floor battery, dual flight computers, thrust redistributed to the coaxial partner on a motor fault.
Partners: Member of NVIDIA Inception; Dassault Systèmes. Anything beyond this needs sign-off before it goes on the site.
