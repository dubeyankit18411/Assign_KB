const express=require('express')
const Order=require('../model/order')
const router=new express.Router()

//update the order status of particular customer
router.patch('/updateStatus/:id',async (req,res) =>{
    
    try{
        const order=await Order.findOne({CusId:req.params.id})
       if(!order){
           return res.status(404).send()
       }
       order.OrderStatus=req.body.status
       await order.save()
       res.send(order)
    }catch(e){
       res.status(400).send(e)
    }
 })


 module.exports=router