import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMidleware.js";
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use("/api/product", productRouter);
app.use(notFound);
app.use(errorHandler);
//
app.get("/", (req, res) => {
  res.send("Running your app");
});

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
