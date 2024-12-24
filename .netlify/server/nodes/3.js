import * as universal from '../entries/pages/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/3.7hCkqaNr.js","_app/immutable/chunks/disclose-version.CV1ONs4R.js","_app/immutable/chunks/runtime.DF8yKfUx.js","_app/immutable/chunks/legacy.C6kY-jOh.js","_app/immutable/chunks/events.eU_KeV77.js"];
export const stylesheets = [];
export const fonts = [];
