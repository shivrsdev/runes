import * as server from '../entries/pages/auth/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.LVGM6RzT.js","_app/immutable/chunks/disclose-version.CV1ONs4R.js","_app/immutable/chunks/runtime.DF8yKfUx.js","_app/immutable/chunks/render.Nx4MT_9g.js","_app/immutable/chunks/events.eU_KeV77.js","_app/immutable/chunks/if.D0PRghbL.js","_app/immutable/chunks/index-client.CYTahnoJ.js"];
export const stylesheets = [];
export const fonts = [];
