import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to db");
        
    } catch (error) {
        console.log(`error in db : ${error.message}`);
        
    }
}

export default connectDB