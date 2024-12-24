import * as server from '../entries/pages/home/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/home/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/home/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.66MeWbD0.js","_app/immutable/chunks/disclose-version.CV1ONs4R.js","_app/immutable/chunks/runtime.DF8yKfUx.js","_app/immutable/chunks/render.Nx4MT_9g.js","_app/immutable/chunks/events.eU_KeV77.js","_app/immutable/chunks/if.D0PRghbL.js","_app/immutable/chunks/each.RFIr7tNH.js","_app/immutable/chunks/snippet.Bs89tlIX.js"];
export const stylesheets = [];
export const fonts = [];
