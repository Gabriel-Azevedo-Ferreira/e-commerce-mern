import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      //which admin user added the product
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // which collection it is coming from
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [
      new mongoose.Schema(
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", // which collection it is coming from
          },
          name: { type: String, required: true },
          rating: { type: Number, required: true, default: 0 },
          comment: { type: String, required: true },
        },
        { timestamps: true }
      ),
    ],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
