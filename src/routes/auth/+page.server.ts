import { prisma } from '$lib/server/database';
import { AuthService } from '$lib/server/services/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions = {
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!username || !email || !password)
			return fail(422, { message: 'Please fill in all fields...' }); // Fields aren't filled in; Unproccessable body

		const sessionToken = await AuthService.createUser(username, email, password);

		if (!sessionToken) return fail(409, { message: 'User already exists...' }); // User already exists; Conflict

		cookies.set('sessionToken', sessionToken, { path: '/' });

		throw redirect(302, '/home');
	},
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!username || !email || !password)
			return fail(422, { message: 'Please fill in all fields...' }); // Fields aren't filled in; Unproccessable body

		const sessionToken = await AuthService.loginUser(username, email, password);

		if (!sessionToken) return fail(401, { message: 'Incorrect username, email or password...' }); // Unauthorized

		cookies.set('sessionToken', sessionToken, { path: '/' });

		throw redirect(302, '/home');
	},
	logout: async ({ cookies, request }) => {
		const sessionToken = cookies.get('sessionToken');

		if (!sessionToken) return fail(401, { message: 'Unauthorized' });

		await prisma.user.update({
			where: {
				sessionToken: sessionToken
			},
			data: {
				sessionToken: 'logged-out'
			}
		});

		cookies.delete('sessionToken', { path: '/' });
	}
} satisfies Actions;

export const load: PageServerLoad = ({ cookies }) => {
	return {
		sessionToken: cookies.get('sessionToken')
	};
};
