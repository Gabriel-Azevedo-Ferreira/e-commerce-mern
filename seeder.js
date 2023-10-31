import mongoose from "mongoose";
import connectDB from "./backend/config/db.js";
import dotenv from "dotenv";
import Order from "./backend/models/orderModel.js";
import User from "./backend/models/userModel.js";
import Product from "./backend/models/productModel.js";
import users from "./backend/data/users.js";
import products from "./backend/data/products.js";
dotenv.config();

connectDB();
const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const usersCreated = await User.insertMany(users);
    const adminId = usersCreated[0]._id;

    await Product.insertMany(
      products.map((product) => ({ ...product, user: adminId }))
    );
    console.log("Sample data inserted");
    process.exit();
  } catch (error) {
    console.log("Sample data insert ERROR");
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Sample data deleted");
    process.exit();
  } catch (error) {
    console.log("Sample data deletion ERROR");
    process.exit(1);
  }
};

if (process.argv[2] === "-d") deleteData();
if (process.argv[2] === "-i") importData();
