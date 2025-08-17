const mongoose = require("mongoose");
const connect_db = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB);
    console.log(`!!--Database connected successfully--!`);
    return true;
  } catch (error) {
    console.log("Unable to connect with database", error.message);
    return false;
  }
};

module.exports = connect_db;
