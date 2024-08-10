import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  // mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('Mongo already connected');
    return;
  }
  try {
    const { connection} = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'Dreamwedding',
    });
    isConnected = true;
    console.log('MongoDB connected');
    // console.log(connection)
  } catch (error:any) {
    console.log("Not Connected")
    console.log(error.errmsg);
  }
};
