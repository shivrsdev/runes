export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["logo.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CgW2QRmf.js","app":"_app/immutable/entry/app.D6shwAQc.js","imports":["_app/immutable/entry/start.CgW2QRmf.js","_app/immutable/chunks/entry.DwYlP_6y.js","_app/immutable/chunks/runtime.DF8yKfUx.js","_app/immutable/chunks/index-client.CYTahnoJ.js","_app/immutable/entry/app.D6shwAQc.js","_app/immutable/chunks/runtime.DF8yKfUx.js","_app/immutable/chunks/render.Nx4MT_9g.js","_app/immutable/chunks/events.eU_KeV77.js","_app/immutable/chunks/disclose-version.CV1ONs4R.js","_app/immutable/chunks/if.D0PRghbL.js","_app/immutable/chunks/this.CqEbsjfb.js","_app/immutable/chunks/store.835Gg7Ry.js","_app/immutable/chunks/index-client.CYTahnoJ.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/home",
				pattern: /^\/home\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/home/conversations/[id]",
				pattern: /^\/home\/conversations\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
