import * as argon2 from 'argon2';
import { prisma } from '../database';
import type { Cookies } from '@sveltejs/kit';
import type { User } from '@prisma/client';

export class AuthService {
	// create user -> returns the user session token or undefined if the user already exists
	static async createUser(
		username: string,
		email: string,
		password: string
	): Promise<string | undefined> {
		const passwordHashed = await argon2.hash(password);
		const sessionToken = this.generateSessionToken(username);

		const user = await prisma.user.findFirst({
			where: {
				OR: [{ email: email }, { username: username }]
			}
		});

		if (user) return;

		await prisma.user.create({
			data: {
				username: username,
				email: email,
				passwordHashed: passwordHashed,
				sessionToken: sessionToken
			}
		});

		return sessionToken;
	}

	// login user -> returns the session token or undefined if unauthorized
	static async loginUser(
		username: string,
		email: string,
		password: string
	): Promise<string | undefined> {
		const user = await prisma.user.findUnique({
			where: {
				username: username,
				email: email
			}
		});

		if (!user || !(await argon2.verify(user.passwordHashed, password))) return;

		const newSessionToken = this.generateSessionToken(username);

		await prisma.user.update({
			where: user,
			data: {
				sessionToken: newSessionToken
			}
		});

		return newSessionToken;
	}

	static generateSessionToken(username: string): string {
		return `${username}/${Math.random()}${Math.random()}${Math.random()}${Math.random()}`;
	}

	static async getUserFromCookies(cookies: Cookies): Promise<User | undefined> {
		const sessionToken = cookies.get('sessionToken') as string;

		if (!sessionToken || sessionToken === 'logged-out') return;

		const user = (await prisma.user.findUnique({
			where: {
				sessionToken: sessionToken
			}
		})) as User;

		return user;
	}
}
