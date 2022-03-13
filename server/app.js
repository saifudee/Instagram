const express = require('express')
const app = express()
const mongoose=require('mongoose')
const PORT = 5000
const {MONGOURI}=require('./keys')



mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
  console.log("mongo is connected yeah")
})
mongoose.connection.on('error',(err)=>{
    console.log("error in connected",err)
  })

  
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})