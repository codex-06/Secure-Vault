import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbconfig";
import User from "@/models/userModel";
import crypto from "crypto"
import Vault from "@/models/vaultModel"
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST(request: NextRequest) {    
    try {
        const reqbody = await request.json();
        const {username, email, password} = reqbody;
        console.log(reqbody);

        const profile  = await User.findOne({email});

        if(profile){
            console.log("user already exists")
            return NextResponse.json({
                error: "User already exists"
            }, { status : 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password,salt);

        const newProfile = new User({
            username : username,
            email : email,
            password : hashedpassword,
        })

        const vaultSalt = await bcryptjs.genSalt();
        const iv = await crypto.randomBytes(16);
        
        const  newVault =  new Vault({
            user: newProfile._id,
            salt : vaultSalt,
            iv : iv
        })
        
        const savedProfile = await newProfile.save();
        const savedVault = await newVault.save();
        return NextResponse.json({
            message:"User Signed up successfully",
            success: true,
            user : savedProfile,
            vault : savedVault
        })

        
    } catch (error : any) {
        console.log(error.message)
        return NextResponse.json({
            error : error.message
        },{status:400})
    }
}
