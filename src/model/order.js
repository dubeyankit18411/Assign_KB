const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    items:[{
        id:{
           type:String,
           required:true
        },
        item:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    CusId:{
          type:String,
          required:true
    },
    DelPerId:{
        type:String,
        default:'0'
    },
    OrderStatus:{
        type:String,
        default:'Task Created'
    },
    PickUpLocation:{
        type:String,
        required:true
    }
})



const Order=mongoose.model('Order',userSchema)
module.exports=Order
 