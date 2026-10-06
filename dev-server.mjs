import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = Number(portIndex >= 0 ? args[portIndex + 1] : (process.env.PORT || 4173));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url,'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    if(pathname.startsWith('/kingswebstudio/')) pathname=pathname.slice('/kingswebstudio'.length);
    let relative = pathname === '/__qa/' ? '.qa/index.html' : pathname.replace(/^\/+/, '');
    if(relative.split('/').some(part=>part.startsWith('.') || part==='node_modules') && relative!=='.qa/index.html') {res.writeHead(403);res.end('Forbidden');return;}
    let file = path.resolve(root,relative || 'index.html');
    if(!file.startsWith(root + path.sep) && file!==root){res.writeHead(403);res.end('Forbidden');return;}
    let stat=await fs.stat(file);
    if(stat.isDirectory()) file=path.join(file,'index.html');
    const bytes=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    if(req.method==='HEAD') res.end(); else res.end(bytes);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await fs.readFile(path.join(root,'404.html'),'utf8').catch(()=>'<h1>Page not found</h1>'));
  }
}).listen(port,'0.0.0.0',()=>console.log('King’s Web Studio preview on port '+port));

