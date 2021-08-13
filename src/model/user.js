const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    phone:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    cart:[{
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
            default:1
        }
    }]
})

userSchema.methods.generateAuthToken=async function() {
     const user=this
     const token=jwt.sign( {_id:user._id.toString() },'order')

     user.tokens=user.tokens.concat({ token})
     await user.save()

      return token
}



userSchema.statics.findByCredentials= async (phone,password) =>{
    const user = await User.findOne({ phone })
    // console.log(user)

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)
     
   
    if(!isMatch){
        throw new Error('Unable to login')
    }
    // console.log(user)
    return user
}


//Hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

const User=mongoose.model('User',userSchema)

module.exports=User
 