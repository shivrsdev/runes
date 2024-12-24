import * as argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class AuthService {
  // create user -> returns the user session token or undefined if the user already exists
  static async createUser(username, email, password) {
    const passwordHashed = await argon2.hash(password);
    const sessionToken = this.generateSessionToken(username);
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });
    if (user) return;
    await prisma.user.create({
      data: {
        username,
        email,
        passwordHashed,
        sessionToken
      }
    });
    return sessionToken;
  }
  // login user -> returns the session token or undefined if unauthorized
  static async loginUser(username, email, password) {
    const user = await prisma.user.findUnique({
      where: {
        username,
        email
      }
    });
    if (!user || !await argon2.verify(user.passwordHashed, password)) return;
    const newSessionToken = this.generateSessionToken(username);
    await prisma.user.update({
      where: user,
      data: {
        sessionToken: newSessionToken
      }
    });
    return newSessionToken;
  }
  static generateSessionToken(username) {
    return `${username}/${Math.random()}${Math.random()}${Math.random()}${Math.random()}`;
  }
  static async getUserFromCookies(cookies) {
    const sessionToken = cookies.get("sessionToken");
    if (!sessionToken || sessionToken === "logged-out") return;
    const user = await prisma.user.findUnique({
      where: {
        sessionToken
      }
    });
    return user;
  }
}
export {
  AuthService as A,
  prisma as p
};
