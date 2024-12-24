import { X as ensure_array_like, S as pop, Q as push } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _layout($$payload, $$props) {
  push();
  let { children, data } = $$props;
  $$payload.out += `<main><div class="drawer drawer-open"><input id="my-drawer-2" type="checkbox" class="drawer-toggle"> <div class="drawer-content flex flex-col items-center justify-center">`;
  children($$payload);
  $$payload.out += `<!----></div> <div class="drawer-side"><label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> <ul class="menu min-h-full w-48 space-y-2 bg-base-200 p-4 text-base-content">`;
  if (data.conversations) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.conversations);
    $$payload.out += `<form action="?/createConversation" method="post"><button type="submit" class="w-full">Create conversation</button></form> <!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let conversation = each_array[$$index];
      $$payload.out += `<button>${escape_html(conversation.name)}</button>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></ul></div></div></main>`;
  pop();
}
export {
  _layout as default
};
