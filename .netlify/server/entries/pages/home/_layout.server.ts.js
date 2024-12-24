import { A as AuthService, p as prisma } from "../../../chunks/auth.js";
const load = async ({ cookies }) => {
  const user = await AuthService.getUserFromCookies(cookies);
  if (!user) return { unauthorized: true };
  const conversations = await prisma.conversation.findMany({
    where: {
      users: {
        some: {
          id: user.id
        }
      }
    }
  });
  return {
    conversations
  };
};
export {
  load
};
