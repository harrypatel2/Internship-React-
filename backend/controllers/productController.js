import Product from '../models/Product.js';

export const seedProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        const sampleProducts = [
            {
                name: "Modern Spec",
                desc: "Stylish and modern frames for everyday look.",
                price: "$120",
                img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
                category: "Eyeglasses"
            },
            {
                name: "Golden Aviator",
                desc: "Classic gold aviators that never go out of style.",
                price: "$150",
                img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
                category: "Sunglasses"
            },
            {
                name: "Reading Round",
                desc: "Minimalist round glasses perfect for reading.",
                price: "$90",
                img: "https://plus.unsplash.com/premium_photo-1675806626601-e737c024d08b?auto=format&fit=crop&q=80&w=800",
                category: "Reading"
            },
            {
                name: "Tortoise Shell",
                desc: "Elegant tortoise shell frames with premium acetate.",
                price: "$140",
                img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800",
                category: "Eyeglasses"
            }
        ];

        await Product.insertMany(sampleProducts);
        res.status(200).json({ message: "Database seeded successfully with sample products" });
    } catch (error) {
        res.status(500).json({ message: "Seed failed", error: error.message });
    }
};

export const createProduct = async (req, res) => {
    const product = await Product.create({
        ...req.body,
        createdBy: req.user._id,
    })
    res.status(201).json(product);
}

export const getAllProducts = async (req, res) => {
    try {
        console.log("Fetching all products...");
        const products = await Product.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        console.log(`Found ${products.length} products`);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('createdBy', 'name email');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne();

        res.status(200).json({ message: "Product removed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

