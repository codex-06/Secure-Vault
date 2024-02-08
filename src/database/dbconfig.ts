import mongoose from "mongoose";



export async function dbConnect(){
    try {
        mongoose.connect(process.env.MONGO_URI);
        mongoose.connection.on("connected",()=>{
            console.log("mongodb connected successfully")
        })
        mongoose.connection.on("error", (e)=>{
            console.log(" error while trying to connect to db")
            console.log(e.message)
            process.exit(1);
        })
    } catch (error) {
        console.log(object)
        console.log(error.message);
    }
}