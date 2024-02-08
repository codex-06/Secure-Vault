import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/database/dbconfig";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST(request:NextRequest) {

    try {
        const {email , password} = await request.json();
        const user = await User.findOne({email});
        if( ! user){
            console.log("invalid email")
            return NextResponse.json({
                error:"invalid credentials"
            }, {status : 400})
        }
        const isValid = await bcryptjs.compare(password, user.password);
        if( ! isValid){
            console.log("wrong password")
            return NextResponse.json({
                error:"invalid credentials"
            }, {status : 400})
        }
        else{

            const tokenData = {
                id : user._id,
                username : user.username,
                email : user.email
            }
            const token = await jwt.sign(tokenData,process.env.SECRET_KEY);

            const response = NextResponse.json({
                message:"Log in successfull",
                sucess :true
            })
            response.cookies.set("token", token, {
                httpOnly : true
            }, {path: '/'})

            console.log("logged in " + user.username)
            return response;
        }
        
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            error: " there was an error while logging in",
        },{status : 400})
    }

}