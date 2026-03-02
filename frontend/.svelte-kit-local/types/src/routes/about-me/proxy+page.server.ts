// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async () => {
	throw redirect(308, '/about');
};
;null as any as PageServerLoad;