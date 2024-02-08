import { NextRequest, NextResponse } from "next/server";
import Vault from "@/models/vaultModel";
import jwt from "jsonwebtoken"
import { dbConnect } from "@/database/dbconfig";

dbConnect();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token").value;
        const tokendata = await jwt.verify(token, process.env.SECRET_KEY)
        console.log(tokendata)
        const uservault = await Vault.findOne({user :tokendata.id})
        if(! uservault){
            console.log(" vault not found")
            return NextResponse.json({
                error : " vault not found"
            } ,{status : 404})
        }
        else{
            return NextResponse.json(
                uservault
            )
        }
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            error : error.message
        },{status : 400})
    }
}

export async function PUT(request : NextRequest){
    try {
        const token = request.cookies.get("token").value;
        const tokendata = await jwt.verify(token, process.env.SECRET_KEY)
        console.log(tokendata)
        const uservault = await Vault.findOne({user :tokendata.id})
        if(! uservault){
            console.log("vault not found")
            return NextResponse.json({
                error : "vault not found"
            } ,{status : 404})
        }
        else{
            console.log(uservault);
            const {encryptedData} = await request.json();
            console.log(encryptedData)
            uservault.vaultContent = encryptedData
            await uservault.save();
            return NextResponse.json({
                message : "vault updated",
                success : true
            })
        }
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            error : error.message
        },{status : 400})
    }
    
}