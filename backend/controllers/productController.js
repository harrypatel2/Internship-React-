import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    const product = await Product.create({
        ...req.body,
        createdBy: req.user._id,
    })
    res.status(201).json(product);
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
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
