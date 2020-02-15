// const express =require('express')
const express=require('./kpress')
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