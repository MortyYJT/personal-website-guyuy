// Runs in <head> before the browser can paint the server-rendered page.
// The timeout fails open even if hydration never starts.
export const introBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){let seen=false;try{seen=sessionStorage.getItem('guyuy:intro:v1')==='seen'}catch{}if(!seen){document.documentElement.dataset.intro='pending';setTimeout(()=>{delete document.documentElement.dataset.intro},8000)}}}catch{delete document.documentElement.dataset.intro}`;
