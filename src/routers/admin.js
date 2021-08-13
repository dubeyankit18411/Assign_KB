const express=require('express')
const Order=require('../model/order')
const router=new express.Router()

//get the orders according to status of order
router.get('/orders',async (req,res) =>{
    try{ 
       const order=await Order.find({OrderStatus:req.query.status})

       if(!order){
        return res.status(404).send()
    }
    res.send(order)
    }catch(e){
        res.status(404).send()
    }
 })


//assign the delivery person to particular customer by its id
router.patch('/assignOrder/:id',async (req,res) =>{
    try{
        const order=await Order.findOne({CusId:req.params.id})
        
       if(!order){
           return res.status(404).send()
       }
       order.DelPerId=req.body.DelPerId
    
       await order.save()
       res.send(order)
    }catch(e){
       res.status(400).send(e)
    }
})

 module.exports=router