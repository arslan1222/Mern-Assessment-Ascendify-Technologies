import mongoose from "mongoose";

const MONGO_DB = 'mongodb://127.0.0.1:27017/taskassessment';

async function connectDB(){

    try {
        const cenncetion = await mongoose.connect(MONGO_DB);
        if(cenncetion){
        console.log("DB connected successfully!");
    }   
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


export default connectDB;