# Zephyra Dynamics website: design rules

## Foundations

- **Type:** Geist only.
  - Headlines are semibold with tight tracking.
  - UI sizes are 11, 12, 13, 14, 17 and 22 px.
  - All data uses tabular numerals.
- **Colour:** daylight neutrals with one brand accent.

  | Token | Hex |
  |---|---|
  | `sky` | #F5F8FA |
  | `cloud` | #FFFFFF |
  | `mist` | #EBF0F3 |
  | `line` | #DCE3E8 |
  | `carbon` | #0F1317 |
  | `slate` | #4A5560 |
  | `kestrel` | #D22B1F |

  Kestrel Red is reserved for the primary action, the selected item and the aircraft itself.
- **Spacing:** an 8 px grid (4 px only inside dense data rows).
- **Radii by role, not one radius for everything:**
  - 20 px for product consoles
  - 12 px for cards inside them
  - 8 px for controls
  - fully round only for pills and toggles
- **Contrast:** at least 4.5:1 for text.
  - Map labels always get a halo.
  - Focus is always visible.
  - Touch targets are at least 36 px; 44 px for primary actions.

## Product consoles (LAMINAR, FlightLab)

1. **One task per screen.**
   - LAMINAR: follow a selected flight and see that the airspace is safe.
   - FlightLab: run a procedure and read its verdict.

   The element serving that task is the largest and clearest on screen.
2. **Hierarchy.** A primary card (the selected flight, or the procedure and its verdict), then a secondary list (flight strips, procedures), then tertiary status (totals, links, legend).
3. **Colour means something.** At most five meaningful colours per console, the same everywhere:

   | Meaning | Hex |
   |---|---|
   | Climbing / pass | #1E8A55 |
   | Cruising / controlled airspace | #2F6FD6 |
   | Descending / advisory / coordination | #D07A1E |
   | Restricted / fault | #C6372B |
   | Selected | Kestrel Red |

   Everything else is neutral.
4. **Controls live in one toolbar**, grouped by kind: base map, view, layers. Toggle state is shown by fill, never by colour alone.
5. **Progressive disclosure.** Details appear for the selection. Lists show only what is needed to choose.
6. **Motion carries meaning only:** aircraft movement and live traces. It respects `prefers-reduced-motion`.
7. **Performance.**
   - Per-frame work stays in the map or overlay layer.
   - Panels and lists update at most a few times a second.
8. **Honesty.** Illustrative traffic, airspace and values are labelled as such. No third-party software names in product UI.
