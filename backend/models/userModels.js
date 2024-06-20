import mongoose from "mongoose";
 const userSchema = mongoose.Schema({
    username:{
        type : String,
        required:true,

    },
    email:{
        type : String,
        required : true ,
        unique : true,
    },
    mobile: {
        type: String,
        required : true ,
        unique: true,
      },
    password : {
        type : String,
        required : true ,
    },
    isAdmin : {
        type : Boolean,
        required : true ,
        default : false,

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
 }, {timestamps:true})

 const User = mongoose.model('User', userSchema)

 export default User;