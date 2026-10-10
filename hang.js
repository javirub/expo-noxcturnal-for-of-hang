// Noxcturnal never returns when transforming this module: the transform
// worker thread spins at 100% CPU and `expo export` / `expo start` hang.
// Reduced from react-hook-form@7.89.0 dist/index.cjs.js (createFormControl).
export function f(o) {
  for (const t of (u => { const r = u; return r; })(o)) void 0;
}
