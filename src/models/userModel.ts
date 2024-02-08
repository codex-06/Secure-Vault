import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required : true,
    },
    email:{
        type: String,
        unique: true,
        required : true,
    },

    password:{
        type: String,
        required : true,
    },

    verified_status:{
        type: Boolean,
        default: false
    },

    verify_token:{
        type: String,
    }
}, { timestamps: true })


const User = mongoose.models.User || mongoose.model("User", UserSchema);


export default User;