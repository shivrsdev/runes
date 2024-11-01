import { prisma } from '$lib/server/database';
import { AuthService } from '$lib/server/services/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
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
		conversations: conversations
	};
};
