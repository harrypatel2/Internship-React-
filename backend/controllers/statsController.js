import Product from '../models/Product.js';
import User from '../models/User.js';

export const getStats = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();

        res.status(200).json({
            products: productCount,
            users: userCount
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Server error fetching stats" });
    }
};
