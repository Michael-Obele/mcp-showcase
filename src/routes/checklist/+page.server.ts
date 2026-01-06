import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
	const authenticated = cookies.get('admin_session') === 'true';

	// Load checklist data from Prisma
	const dbItems = (await prisma.checklistItem.findMany()) || [];

	// Convert to the nested object format used by the UI
	const checklistData: Record<string, Record<string, boolean>> = {};
	dbItems.forEach((item) => {
		if (!checklistData[item.mcpName]) {
			checklistData[item.mcpName] = {};
		}
		checklistData[item.mcpName][item.registryName] = item.checked;
	});

	return {
		authenticated,
		checklistData
	};
};
