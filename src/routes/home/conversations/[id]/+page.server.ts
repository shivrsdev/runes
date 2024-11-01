import { prisma } from '$lib/server/database';
import { AuthService } from '$lib/server/services/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions = {
	sendMessage: async ({ cookies, params, request }) => {
		const user = await AuthService.getUserFromCookies(cookies);

		if (!user) return fail(401, { unauthorized: true }); // Unauthorized
		if (!params.id) return fail(422, { paramsMissing: true }); // Unproccessable entity due to params missing

		const conversationId = parseInt(params.id);

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
				users: {
					some: {
						id: user.id
					}
				}
			}
		});

		if (!conversation) return fail(500, { conversationNotFound: true });

		const data = await request.formData();
		const content = data.get('content') as string;

		if (!content) return fail(422, { missingFields: true }); // Missing content field

		await prisma.message.create({
			data: {
				content: content,
				user: {
					connect: {
						id: user.id
					}
				},
				conversation: {
					connect: {
						id: conversationId
					}
				}
			}
		});

		throw redirect(302, `/home/conversations/${params.id}`);
	},
	addUser: async ({ cookies, params, request }) => {
		const user = await AuthService.getUserFromCookies(cookies);

		if (!user) return fail(401, { unauthorized: true }); // Unauthorized
		if (!params.id) return fail(422, { paramsMissing: true }); // Unproccessable entity due to params missing

		const conversationId = parseInt(params.id);

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
				users: {
					some: {
						id: user.id
					}
				}
			}
		});

		if (!conversation) return fail(500, { conversationNotFound: true });

		const data = await request.formData();
		const targetUsername = data.get('targetUsername') as string;

		if (!targetUsername) return fail(422, { missingFields: true }); // Missing targetUsername field

		const targetUser = await prisma.user.findUnique({
			where: {
				username: targetUsername
			}
		});

		if (!targetUser) return fail(404, { userNotFound: true }); // User not found

		await prisma.conversation.update({
			where: conversation,
			data: {
				users: {
					connect: {
						id: targetUser.id
					}
				}
			}
		});

		throw redirect(302, `/home/conversations/${params.id}`);
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ cookies, params }) => {
	const user = await AuthService.getUserFromCookies(cookies);
	const conversationId = parseInt(params.id);

	if (!user) return { unauthorized: true };

	const conversation = await prisma.conversation.findFirst({
		where: {
			users: {
				some: {
					id: user.id
				}
			}
		}
	});

	if (!conversation) return { conversationNotFound: true };

	const messages = await prisma.message.findMany({
		where: {
			conversation: {
				id: conversationId
			}
		},
		include: {
			user: {
				select: {
					id: true,
					username: true
				}
			}
		},
		orderBy: {
			id: 'desc'
		},
		take: 20
	});

	const reversedMessages = messages.reverse();

	return {
		messages: reversedMessages,
		user: user
	};
};
