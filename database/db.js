import mongoose from "mongoose";

const Connection=async (url)=>{
    try{
        await mongoose.connect(url,{useNewURLParser: true});
        console.log('connected successfully');
    }catch(error){
        console.log('failed to connect reason:',error);
    }
}
export default Connection;