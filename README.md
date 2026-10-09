# Orbital Readiness Platform: two-part site

Files: `index.html` (cinematic homepage), `platform.html` (interactive platform), `styles.css` + `script.js` (homepage), `platform.css` + `platform.js` (platform), `content.js` (ALL editable homepage text), `assets/` (images).

## Run
Open `index.html` in a browser (no server, backend or API key). Optional: `python3 -m http.server` in this folder, then visit http://localhost:8000.

## Edit your content (only `content.js`)
- Project name, tagline, intro: `project`. Team text and members: `team` (add or remove member objects).
- Photos: copy your image into `assets/` and change the `photo` / `groupPhoto` path (and `alt` text). Suggested sizes: group 1600x900, members 800x800 (square crop). If a path is wrong the page shows `assets/placeholder.svg`.
- Why we started: `why`. Goals: `goals`. Vision: `vision`. Milestones and updates: `progress`.
- Science data: add objects to `science.stats` with `label`, `value`, `unit`, `meaning`, `source`, `url`, `date`, `status` (`"sourced"` only after you checked the source; otherwise `"pending"`). Numeric sourced items with a unit starting `kPa` appear in the chart.
Replace every "[Editable]" and "to be confirmed" text before submission.

## Notes
Platform crew, readings and rules are fictional or simulated, not NASA data or a flight-safety assessment. See the References section in `platform.html`.
