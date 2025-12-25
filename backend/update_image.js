import Mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const updateProductImage = async () => {
    try {
        await Mongoose.connect(process.env.DB);
        console.log("Connected to database...");

        const result = await Product.findOneAndUpdate(
            { name: "Tortoise Shell Cat-Eye" },
            // Use a reliable Unsplash image of tortoise shell / cat-eye sunglasses
            { img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800" },
            { new: true }
        );

        if (result) {
            console.log("Product updated successfully:", result.name);
            console.log("New Image URL:", result.img);
        } else {
            console.log("Product not found!");
        }

        process.exit();
    } catch (error) {
        console.error("Error updating product:", error);
        process.exit(1);
    }
};

updateProductImage();
