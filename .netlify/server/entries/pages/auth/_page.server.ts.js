import { A as AuthService, p as prisma } from "../../../chunks/auth.js";
import { f as fail, r as redirect } from "../../../chunks/index2.js";
const actions = {
  register: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    if (!username || !email || !password)
      return fail(422, { message: "Please fill in all fields..." });
    const sessionToken = await AuthService.createUser(username, email, password);
    if (!sessionToken) return fail(409, { message: "User already exists..." });
    cookies.set("sessionToken", sessionToken, { path: "/" });
    throw redirect(302, "/home");
  },
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    if (!username || !email || !password)
      return fail(422, { message: "Please fill in all fields..." });
    const sessionToken = await AuthService.loginUser(username, email, password);
    if (!sessionToken) return fail(401, { message: "Incorrect username, email or password..." });
    cookies.set("sessionToken", sessionToken, { path: "/" });
    throw redirect(302, "/home");
  },
  logout: async ({ cookies, request }) => {
    const sessionToken = cookies.get("sessionToken");
    if (!sessionToken) return fail(401, { message: "Unauthorized" });
    await prisma.user.update({
      where: {
        sessionToken
      },
      data: {
        sessionToken: "logged-out"
      }
    });
    cookies.delete("sessionToken", { path: "/" });
  }
};
const load = async ({ cookies }) => {
  const sessionToken = cookies.get("sessionToken");
  if (!sessionToken)
    return { loggedIn: false };
  const user = await prisma.user.findUnique({
    where: {
      sessionToken
    }
  });
  return {
    loggedIn: user ? true : false
  };
};
export {
  actions,
  load
};
