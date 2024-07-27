import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config";




const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "next14restapi",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (err: any) {
    console.log("Error: ", err);
    throw new Error("Error: ", err);
  }
};

export default connect;