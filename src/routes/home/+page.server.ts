import { prisma } from '$lib/server/database';
import { AuthService } from '$lib/server/services/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	createConversation: async ({ cookies }) => {
		const user = await AuthService.getUserFromCookies(cookies);

		if (!user) return fail(401, { unauthorized: true }); // Unauthorized

		const capitalize = (s: string) => s && String(s[0]).toUpperCase() + String(s).slice(1);

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
} satisfies Actions;
