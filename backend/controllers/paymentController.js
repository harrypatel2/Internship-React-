import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
const createPaymentOrder = async (req, res) => {
    const { amount, currency = 'INR', receipt } = req.body;

    try {
        // Verify keys
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error('Razorpay keys missing in .env');
            return res.status(500).json({ message: "Server configuration error: Razorpay keys missing" });
        }

        // Initialize Razorpay instance lazily
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Amount in paisa (e.g. 500 INR = 50000 paisa)
        const amountInPaisa = Math.round(parseFloat(amount) * 100);

        const options = {
            amount: amountInPaisa,
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        };

        console.log('Creating Razorpay order with options:', options);

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Razorpay Error:", error);
        // Handle specific Razorpay errors
        const errorMessage = error.error?.description || error.message || "Something went wrong with payment creation";
        res.status(500).json({ message: errorMessage });
    }
};

export { createPaymentOrder };
