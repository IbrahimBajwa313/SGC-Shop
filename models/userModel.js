// getting-started.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, recquired: [true, "Please enter your username ! "], unique : [true, "Please enter a unique username !"] },
    email: { type: String, recquired: [true, "Please enter your email ! "], unique : [true, "Please enter a unique email !"] },
    password: { type: String, recquired: true  },
    isVerified: { type: Boolean, default: false  },
    isAdmin: { type: Boolean, default: false  }, 

    forgotPasswordToken : String, 
    forgotPasswordTokenExpiry : Date, 

    verifyToken : String, 
    verifyTokenExpiry : Date 
    
    
}, {timestamps:true})

mongoose.models = {}

export default mongoose.model("user" , UserSchema)