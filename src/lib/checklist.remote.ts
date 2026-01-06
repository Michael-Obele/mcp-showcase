import { command, getRequestEvent } from '$app/server';
import { prisma } from '$lib/server/prisma';
import * as v from 'valibot';

const updateChecklistSchema = v.object({
	mcpName: v.string(),
	registryName: v.string(),
	checked: v.boolean()
});

const loginSchema = v.object({
	password: v.string()
});

export const updateChecklistItem = command(
	updateChecklistSchema,
	async ({ mcpName, registryName, checked }) => {
		console.log('Updating checklist item:', { mcpName, registryName, checked });
		await prisma.checklistItem.upsert({
			where: {
				mcpName_registryName: {
					mcpName,
					registryName
				}
			},
			update: {
				checked
			},
			create: {
				mcpName,
				registryName,
				checked
			}
		});
	}
);

export const login = command(loginSchema, async ({ password }) => {
	console.log('Login attempt');
	const { cookies } = getRequestEvent();
	const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
	if (!ADMIN_PASSWORD) {
		throw new Error('ADMIN_PASSWORD not set');
	}

	if (password === ADMIN_PASSWORD) {
		cookies.set('admin_session', 'true', {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});
		return { success: true };
	} else {
		throw new Error('Invalid password');
	}
});

export const logout = command(async () => {
	console.log('Logout');
	const { cookies } = getRequestEvent();
	cookies.delete('admin_session', { path: '/' });
	return { success: true };
});
