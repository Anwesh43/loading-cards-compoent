const express = require('express')
const app = express()
const path = require('path')
app.get('/card',(req,res)=>{
    setTimeout(()=>{
      res.json({img:'stp.jpg',title:'Startup',subtitle:'Image showing some stuff'})
    },1000)
})
app.use(express.static(__dirname))
app.listen(8000)
