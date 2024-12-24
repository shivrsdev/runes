import { A as AuthService, p as prisma } from "../../../chunks/auth.js";
import { f as fail, r as redirect } from "../../../chunks/index2.js";
const actions = {
  createConversation: async ({ cookies }) => {
    const user = await AuthService.getUserFromCookies(cookies);
    if (!user) return fail(401, { unauthorized: true });
    const capitalize = (s) => s && String(s[0]).toUpperCase() + String(s).slice(1);
    const conversation = await prisma.conversation.create({
      data: {
        name: capitalize(`${user.username}'s group.`),
        users: {
          connect: {
            id: user.id
          }
        }
      }
    });
    throw redirect(302, `/home/conversations/${conversation.id}`);
  }
};
export {
  actions
};
