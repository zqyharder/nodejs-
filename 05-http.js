const http=require('http')
const fs=require('fs')
const server=http.createServer((req,res)=>{
    const {url,method,headers}=req
    if(url==='/' && method==='GET'){
        fs.readFile('index.html',(err,data)=>{
            if(err){
                res.wirteHead(500,{'Content-Type':'text/plain'})
                res.end('Server Err')
            }
            res.statusCode=200
            res.setHeader('Content-Type','text/html')
            res.end(data)
        })
    }else if(url==='/users' &&method ==='GET'){
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify({name:'xia'}))
    }else if(method==='GET'&&headers.accept.indexOf('image/*')!==-1){
        fs.createReadStream('.'+url).pipe(res)
    }
})
server.listen(3000)