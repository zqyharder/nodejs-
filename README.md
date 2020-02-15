用commmon.js模块化规范：
    require 和 module.exports
运行：
    单次运行：
        node 文件名
    监视文件改动自动重启：
        安装nodemon
            npm i -g nodemon
        使用
            nodemon 文件名
    
模块操作：
    内置模块：
        调用：
            const os =require("os")
            const mem =os.freemem()/os.totalmem()*100//内存占用率
            console.log(mem+"%")
    第三方模块：
        安装：
            npm i cpu-stat -s
        调用：
            const cpuStat= require  ("cpu-stat")
            cpuStat.usagePercent((err,percent)=>{//cpu占用率
                console.log(percent)
            })
    分文件：(引入自己的模块))
        01-module.js:
            const getState =require('./state')
            setInterval(getState,1000)
        state.js:
            const os =require("os")
            const cpuStat= require  ("cpu-stat")
            module.exports=function (){//若这里有函数名getState则require时需要解构即为{getState}
                const mem =os.freemem()/os.totalmem()*100
                console.log(mem+"%")
                cpuStat.usagePercent((err,percent)=>{
                    console.log(percent)
                })
            }
核心API：
    fs-文件系统:
        同步方式：
            const fs =require('fs')
            const data=fs.readFileSync('./package.json')
            console.log(data.toString())
            //去掉toString则是二进制的状态（这里的是buffer的toString方法）
        异步方式：
            初始写法：
            const fs =require('fs')
            fs.readFile('./package.json',(err,data)=>{
                console.log(data.toString())
            })
            使用promise：
            (async()=>{
                const fs =require('fs')
                const {promisify} =require('util')
                const readFile =promisify(fs.readFile)//包装方法
                const data= await readFile('./package.json')//使用await会工整很多，没有一个套另一个
                console.log(data.toString())
            })()
    buffer：处理二进制数据
        //buffer类在全局作用域，无需使用require
        const buf1=Buffer.alloc(10)//开辟内存十个字节
        const buf2=Buffer.from([1,2,3])//直接进行二进赋值
        const buf3=Buffer.from('Buffer创建方法')//存实际值
        buf1.write("hello")//写入
        const buf4=Buffer.concat([buf1,buf3])//拼接

        console.log('buf4:',buf4.toString())//输出实际值而不是二进制
        toJSON则为输出JSON数据
    http
        建立http协议：
            const http=require('http')
            const server=http.createServer((req,res)=>{
                console.log('request',res)
                res.end('resssssssss....)
            })
            server.listen(3000)
        返回网页:静态服务，根据http请求简单创建一个server
            const http=require('http')
            const fs=require('fs')
            const server=http.createServer((req,res)=>{
            const {url,method}=req//解构函数
                if(url==='/' && method==='GET'){//请求时显示html内容
                    fs.readFile('index.html',(err,data)=>{
                        if(err){//错误时返回500
                            res.wirteHead(500,{'Content-Type':'text/plain'})//若要打印中文的错误则plain后加;charset=utf-8
                            res.end('Server Err')//返回错误消息
                        }
                        //正常
                        res.statusCode=200
                        res.setHeader('Content-Type','text/html')//返回类型为html，也可以用writeHead来写
                        res.end(data)
                    })
                }
            })
            server.listen(3000)
        返回ajax请求
            const {url,method,headers}=req

            else if(url==='/users' &&method ==='GET'){
                res.writeHead(200,{'Content-Type':'application/json'})
                res.end(JSON.stringify({name:'xia'}))//返回JSON对象
            }else if(method==='GET'&&headers.accept.indexOf('image/*')!==-1){//读文件，把文件流引入res
                fs.createReadStream('.'+url).pipe(res)
            }
    express服务器：
        安装：
            npm i express -s
        express服务器基础使用方法：(index.js)
            const express =require('express')
            const app =express()//实例化
            app.get('/',(req,res)=>{
                res.end('helloworld')
            })
            app.get('/users',(req,res)=>{
                res.end(JSON.stringify({name:'abc'}))
            })
            app.listen(3000,()=>{
                console.log('app listen at 3000')
            })
        如何写express服务器：(实现express的路由部分）
            index.js:
                修改const express =require('kpress')
            kpress.js:  
                const http=require('http')
                const url=require('url')
                const router=[]
                class Application{
                    get(path,handler){
                        router.push({
                            path,
                            method:'get',
                            handler
                        })
                    }
                    listen(){//启动服务器
                        const server=http.createServer((req,res)=>{
                            const {pathname}=url.parse(req.url,true)//去掉没有用的一些信息
                            for (const item of router){
                                const {path,method,handler}=item
                                if(pathname===path&&req.method.toLowerCase()===method){
                                    return handler(req,res)
                                }
                            }
                        })
                        server.listen(...arguments)
                    }
                }
                module.exports =function createApplication(){
                    return new Application（）
                }