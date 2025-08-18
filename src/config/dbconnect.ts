import mongoose from "mongoose";

const MONGO_DB = process.env.MONGO_DB as string;
const db_connect = async () => {
  try {
    const connected = await mongoose.connect(MONGO_DB);
    if (connected.connection) return true;
  } catch (error: unknown) {
    if (error instanceof mongoose.Error)
      console.log("Unable to connect with Database", error.message);
    return false;
  }
};

export default db_connect;
