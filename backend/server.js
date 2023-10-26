import express from "express";
import dotenv from "dotenv";
dotenv.config();
import products from "./data/products.js";
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Running your app");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  res.json(products.find((product) => product._id === req.params.id));
});

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
