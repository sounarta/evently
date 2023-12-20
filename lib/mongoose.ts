import mongoose from "mongoose";

let isConnected: boolean = false;

export async function ConnectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB URL is MISSING");
  }

  if (isConnected) {
    console.log("MongoDb already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'Evently',
    });

    isConnected = true;

    console.log("MONGODB Connected");
  } catch (error) {
    console.error("MONGODB failed", error);
  }
}
