import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        if (process.env.MONGO_HOST) {
            const connect: typeof mongoose = await mongoose.connect(process.env.MONGO_HOST);
            console.log(`MongoDB Connected: ${connect.connection.host}`);
        }
        else {
            console.log("No mongo connection");
            process.exit(1);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}