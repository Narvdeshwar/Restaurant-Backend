const express = require("express");
const connect_db = require("./config/db_connect");

require("dotenv").config(); // helps to load all the env config

const app = express();
(async () => {
  try {
    const connected = await connect_db();
    if (!connected) process.exit(1);

    app.listen(process.env.PORT || 8080, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Unable to connect with DB");
  }
})();
