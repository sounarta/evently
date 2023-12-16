import mongoose from "mongoose";

let isConnected: boolean = false;

export async function ConnectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB URL is MISSING");

  if (isConnected){
    return console.log("MongoDb already Connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'Evently',
    });

    isConnected = true;

    return console.log("MONGODB Connected");
  } catch (error) {
    console.log("MONGODB failed", error);
  }
}
