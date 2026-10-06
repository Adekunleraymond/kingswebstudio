import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
const root=process.cwd(),errors=[],pages=[];
async function walk(dir){for(const item of await fs.readdir(dir,{withFileTypes:true})){if(item.name.startsWith('.')||item.name==='node_modules')continue;const p=path.join(dir,item.name);if(item.isDirectory())await walk(p);else if(p.endsWith('.html'))pages.push(p);}}
await walk(root);
for(const file of pages){
const html=await fs.readFile(file,'utf8'),label=path.relative(root,file),ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
const allIds=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(allIds.length!==ids.size)errors.push(label+': duplicate IDs');
if((html.match(/<h1\b/g)||[]).length!==1)errors.push(label+': must have one H1');
if(!/<title>[^<]+<\/title>/.test(html)||!html.includes('name="viewport"'))errors.push(label+': missing title or viewport');
if(/lorem ipsum|MOST POPULAR|Some Websites We’ve Built/i.test(html))errors.push(label+': placeholder or unsubstantiated copy');
for(const m of html.matchAll(/<(a|img|script|link|source)\b[^>]*?\b(href|src)="([^"]*)"/g)){
const [,,attr,url]=m;if(!url){errors.push(label+': empty '+attr);continue;}
if(url.startsWith('https://wa.me/')){if(new URL(url).pathname!='/2349030969700')errors.push(label+': incorrect WhatsApp number');continue;}
if(url.startsWith('mailto:')){if(!url.startsWith('mailto:kingswebsiteexpert@gmail.com'))errors.push(label+': incorrect email');continue;}
if(/^(https?:|data:)/.test(url))continue;
const [local,hash]=url.split('#'),clean=local.split('?')[0];let target=clean?path.resolve(path.dirname(file),decodeURIComponent(clean)):file;
try{const stat=await fs.stat(target);if(stat.isDirectory())target=path.join(target,'index.html');await fs.access(target);}catch{errors.push(label+': broken local link '+url);continue;}
if(hash){const targetHtml=target===file?html:await fs.readFile(target,'utf8');if(!targetHtml.includes('id="'+hash+'"'))errors.push(label+': missing anchor '+url);}
}
}
const main=await fs.readFile(path.join(root,'index.html'),'utf8');
for(const name of ['services','about','portfolio','process','pricing','faq','contact'])if(!main.includes('id="'+name+'"'))errors.push('Missing section '+name);
const structured=main.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);try{const data=JSON.parse(structured[1]);if(data.email!=='kingswebsiteexpert@gmail.com'||data.telephone!=='+2349030969700')errors.push('Structured data contact mismatch');}catch(e){errors.push('Invalid structured data: '+e.message);}
new vm.Script(await fs.readFile(path.join(root,'script.js'),'utf8'));
const formFields=['name','email','phone','business','website-type','description','budget'];
for(const field of formFields)if(!main.includes('id="'+field+'"'))errors.push('Missing inquiry field '+field);
for(const p of ['manrope.woff2','studio-devices-640.webp','studio-devices-1200.webp','touch-icon.png','favicon.svg','robots.txt','sitemap.xml'])try{const stat=await fs.stat(path.join(root,p));if(stat.size===0)errors.push('Empty asset '+p);}catch{errors.push('Missing asset '+p);}
const forbidden=[...main.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(m=>m[1]).filter(h=>/facebook\.com|instagram\.com|linkedin\.com|tiktok\.com|twitter\.com|x\.com/.test(h));
if(forbidden.length)errors.push('Social media link found');
console.log(JSON.stringify({pagesChecked:pages.length,errors},null,2));
if(errors.length)process.exit(1);

