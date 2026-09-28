export default {
 root: new URL('.', import.meta.url).pathname,
 publicDir:false,
 server:{host:'0.0.0.0',allowedHosts:['terminal.local']},
 plugins:[{name:'local-mobile-qa',configureServer(server){server.middlewares.use((req,res,next)=>{
  if(req.url!=='/__mobile')return next();
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.end('<!doctype html><html><head><title>Mobile layout QA</title><style>body{margin:0;background:#e9edf3;display:flex;justify-content:center;align-items:start;gap:35px;padding:22px}iframe{border:1px solid #888;background:white}h2{font:14px Arial;color:#334}</style></head><body><section><h2>390 × 844</h2><iframe id="qa390" title="390 pixel mobile" width="390" height="844" src="/"></iframe></section><section><h2>360 × 740</h2><iframe id="qa360" title="360 pixel mobile" width="360" height="740" src="/"></iframe></section></body></html>');
 });}}]
};
