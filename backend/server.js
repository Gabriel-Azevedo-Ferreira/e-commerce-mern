import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMidleware.js";

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/product", productRouter);
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Running your app");
});

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
console.log(app._router.stack);
