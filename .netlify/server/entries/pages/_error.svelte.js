import { T as getContext, V as store_get, W as unsubscribe_stores, S as pop, Q as push } from "../../chunks/index.js";
import "../../chunks/client.js";
import { e as escape_html } from "../../chunks/escaping.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _error($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<main class="flex h-screen items-center justify-center"><div class="space-y-4 text-center"><h1 class="text-[44px]">Runes</h1> <h2 class="text-[22px]">${escape_html(store_get($$store_subs ??= {}, "$page", page).status)} ${escape_html(store_get($$store_subs ??= {}, "$page", page).error?.message)}...</h2> <button>Return</button></div></main>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _error as default
};
