import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const allowed=['design/character-study','public/brand/v2','app/fonts'].map(p=>resolve(root,p)+sep);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.woff2':'font/woff2','.mjs':'text/javascript; charset=utf-8'};
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://127.0.0.1:3103');
  if(url.pathname==='/'){res.writeHead(302,{Location:'/design/character-study/index.html'});res.end();return;}
  const target=resolve(root,'.'+decodeURIComponent(url.pathname));
  if(!allowed.some(prefix=>target.startsWith(prefix))){res.writeHead(404);res.end('Not found');return;}
  const data=await readFile(target);
  res.writeHead(200,{'Content-Type':types[extname(target)]??'application/octet-stream','Cache-Control':'no-store'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(3103,'127.0.0.1',()=>console.log('Design study: http://127.0.0.1:3103/design/character-study/index.html'));
