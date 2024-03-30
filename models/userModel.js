// getting-started.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    name: { type: String, recquired: [true, "Please enter your username ! "], unique : [true, "Please enter a unique username !"] },
    email: { type: String, recquired: [true, "Please enter your email ! "], unique : [true, "Please enter a unique email !"] },
    password: { type: String, recquired: true  },
    isVerified: { type: Boolean, default: false  },
    isAdmin: { type: Boolean, default: false  }, 

    forgotPasswordToken : string, 
    forgotPasswordTokenExpiry : date, 

    verifyToken : string, 
    verifyTokenExpiry : date 

    
    
}, {timestamps:true}); 

const User = mongoose.model.users || mongoose.model('users', userSchema);
export default User;