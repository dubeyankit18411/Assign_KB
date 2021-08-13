const express =require('express')
require('./db/mongoose') 
const User=require('./model/user')
const userRouter=require('./routers/user')
const driverRouter=require('./routers/driver')
const adminRouter=require('./routers/admin')


const app=express()
const port=process.env.PORT || 3000


app.post('/users')


//parse the JSON into object
app.use(express.json())
app.use(userRouter)
app.use(driverRouter)
app.use(adminRouter)

app.listen(port ,() =>{
    console.log('Server is up on port', + port);
})