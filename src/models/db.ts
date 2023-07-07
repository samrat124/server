const mongoose=require("mongoose");
const env=require('dotenv').config()

export const ConnectDataBase=async()=>{

    let result=await mongoose.connect(process.env.DB_CONNECTION_URL);

    return result;

} 

 