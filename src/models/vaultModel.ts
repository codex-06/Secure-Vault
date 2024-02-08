import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    vaultContent: {
        type :String,
        default : ""
    },

    salt : {
        type : String,
        required : true

    },

    iv: {
        type: Buffer, 
        required: true
    } 

});

const Vault =mongoose.models.Vault || mongoose.model('Vault', vaultSchema);

export default Vault;
