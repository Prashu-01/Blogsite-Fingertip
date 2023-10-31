import mongoose from "mongoose";

const Connection=async (user,pass)=>{
    const url=`mongodb://${user}:${pass}@ac-bo0zohc-shard-00-00.hphhfit.mongodb.net:27017,ac-bo0zohc-shard-00-01.hphhfit.mongodb.net:27017,ac-bo0zohc-shard-00-02.hphhfit.mongodb.net:27017/?ssl=true&replicaSet=atlas-r1oljn-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
        await mongoose.connect(url,{useNewURLParser: true});
        console.log('connected successfully');
    }catch(error){
        console.log('failed to connect reason:',error);
    }
}
export default Connection;