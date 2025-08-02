import { getHomePage } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  const homePage = await getHomePage();
  
  if (!homePage) {
    console.error("No homepage found with isIndexPage=true");
  }
  
  return {
    homePage
  };
}