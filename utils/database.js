import mongoose from "mongoose";

let isConnected = false;    //This will allow us to track the connection status


export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'sharePrompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log('MongoDB connected')
    }

    catch (error) {
        console.error(error)
    }
}

// 