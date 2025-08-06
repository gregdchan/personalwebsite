import { getHomePage } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
  const homePage = await getHomePage(); // Removed unused 'fetch'
  
  if (!homePage) {
    console.error("No homepage found with isIndexPage=true");
  }
  
  return {
    homePage
  };
}