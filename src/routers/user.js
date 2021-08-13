const express=require('express')
const User=require('../model/user')
const Order=require('../model/order')
const auth=require('../middleware/auth')
const router=new express.Router()

//signup using phone and password
router.post('/signup',async (req,res) =>{
    const user=new User(req.body)
   try{
     await user.save()
     res.status(201).send(user)
   }catch(e){
       res.status(400).send(e)
   }
 })

 //login using phone,password and get a jwt token
 router.post('/login', async (req,res) => {
     try{
        const user =await  User.findByCredentials(req.body.phone,req.body.password)
        const token=await  user.generateAuthToken()
        res.send({user,token})
     }catch(e){
          res.status(400).send()
     }
 })

 //add the items to their respective cart
 router.post('/addToCart',auth, async (req,res) => {
    try{
       const user = req.user
    // to check product is existing in cart
       const existingProductIndex = user.cart.findIndex(p => p.id == req.body.id); 
       // exist in cart already
        if (existingProductIndex >= 0) { 
            const exsitingProduct = user.cart[existingProductIndex];
            exsitingProduct.quantity += req.body.quantity;
        } 
        //not exist
        else { 
            req.user.cart=req.user.cart.concat(req.body)
        }
       req.user.save()
       res.send(req.user.cart)
    }catch(e){
         res.status(400).send()
    }
})


//place the order
router.post('/order',auth, async (req,res) => {
    const user=req.user
    
    const order=new Order({
        items:user.cart,
        CusId:user.id,
        PickUpLocation:'123'
    })
    user.cart=[]
   // console.log(order)
    // console.log(order.PickUpLocation)
    try{
        await order.save()
        await user.save()
        res.status(201).send(order)
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router