const os =require("os")
const cpuStat= require  ("cpu-stat")


module.exports.getState=function (){
        const mem =os.freemem()/os.totalmem()*100
        console.log(mem+"%")
        cpuStat.usagePercent((err,percent)=>{
            console.log(percent)
        })
    }