import * as server from '../entries/pages/home/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/home/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/home/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.dQG-Akv4.js","_app/immutable/chunks/disclose-version.CV1ONs4R.js","_app/immutable/chunks/runtime.DF8yKfUx.js","_app/immutable/chunks/legacy.C6kY-jOh.js"];
export const stylesheets = [];
export const fonts = [];
