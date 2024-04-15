import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('Mongo already connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'dreamwedding',
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
