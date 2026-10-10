# Noxcturnal hangs on a `for…of` over an immediately invoked arrow function

Minimal reproduction for Expo SDK 58's experimental Noxcturnal transform worker
(`experiments.noxcturnalTransformWorker`).

`hang.js` contains a single statement:

```js
for (const t of (u => { const r = u; return r; })(o)) void 0;
```

With the experiment on, Noxcturnal never returns when transforming that module: one
transform worker thread spins at 100% CPU forever and the bundle never finishes.

```sh
bun install            # or npm install
npx expo export --platform android   # hangs (also --platform ios, and with --dev)
```

Controls:

- Remove `experiments.noxcturnalTransformWorker` from `app.json` → export finishes in ~3 s.
- Change the arrow body to `{ return u; }` → export finishes in ~3 s.

Reduced from `react-hook-form@7.89.0`'s `dist/index.cjs.js` (`createFormControl`), which
is what Metro resolves for React Native, so any app that imports `react-hook-form` hangs.
