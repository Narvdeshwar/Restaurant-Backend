require("dotenv").config({ path: [".env"] });

import express from "express";
import db_connect from "./config/dbconnect";
const app = express();
const PORT = process.env.PORT;
import authRouter from "@/routes/auth.routes";
import { errorHandler } from "@/middlewares/errorHandler";
import restaurantRoute from "@/routes/restaurant.routes";
import menuRoutes from "@/routes/menu.routes";
import cookieParser from "cookie-parser";
import logger from "@/utils/logger";
import orderRoute from "@/routes/order.routes";

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", restaurantRoute)
app.use("/", menuRoutes)
app.use("/", orderRoute);

app.use(errorHandler);

// this will call the function automatically as it is IFEE function
(async () => {
  const isConnected = await db_connect();
  if (!isConnected) {
    process.exit(1);
  }
  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
})();
