import { X as ensure_array_like, Y as stringify, S as pop, Q as push } from "../../../../../chunks/index.js";
import "../../../../../chunks/client.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let content = "";
  let targetUsername = "";
  $$payload.out += `<main class="flex min-h-screen w-full flex-col"><div class="flex items-center justify-between p-4 shadow-xl"><h1 class="text-xl font-bold">${escape_html(data.conversationName)}</h1> <form action="?/addUser" method="post" class="flex"><input type="text" name="targetUsername" placeholder="User"${attr("value", targetUsername)} class="border p-2"> <button type="submit" class="ml-2 border p-2"${attr("disabled", !targetUsername, true)}>Add ➕</button></form></div> <div class="chat-container flex-grow overflow-y-scroll p-4" style="max-height: calc(100vh - 160px);">`;
  if (data.messages) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.messages);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let message = each_array[$$index];
      $$payload.out += `<div${attr("class", `chat ${stringify(data.user.id === message.user.id ? "chat-end" : "chat-start")}`)}><div class="chat-header flex justify-between items-center space-x-1"><span>${escape_html(message.user.username)}</span> <time class="text-xs opacity-50">${escape_html(new Date(message.createdAt).toLocaleTimeString())}</time> <div class="dropdown relative"><button tabindex="0" class="btn rounded-lg m-1 scale-75" aria-label="Options">...</button> <ul class="menu dropdown-content absolute right-0 z-[1] rounded-box bg-base-100 p-2 shadow">`;
      if (message.user.id === data.user.id) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<form action="?/deleteMessage" method="post" class="flex items-center"><input type="number" name="messageId"${attr("value", message.id)} hidden> <button type="submit" class="text-red-600 hover:underline">Delete</button></form>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<form action="?/reportMessage" method="post" class="flex items-center"><input type="number" name="messageId"${attr("value", message.id)} hidden> <button type="submit" class="text-blue-600 hover:underline">Report ${escape_html(message.reports.length)}</button></form>`;
      }
      $$payload.out += `<!--]--></ul></div></div> <div class="chat-bubble">${escape_html(message.content)}</div></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <form action="?/sendMessage" method="post" class="flex w-full p-2"><input type="text" name="content" placeholder="Message" class="flex-grow border p-2"${attr("value", content)}> <button type="submit" class="w-1/4 border p-2"${attr("disabled", !content, true)}>Send 📨</button></form></main>`;
  pop();
}
export {
  _page as default
};
