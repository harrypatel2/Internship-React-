import Order from "../models/Order.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentResult,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    } else {
        try {
            console.log('Creating order for user:', req.user._id);
            console.log('Order data:', { orderItems, shippingAddress, paymentMethod, totalPrice });

            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                totalPrice,
                paymentResult,
            });

            const createdOrder = await order.save();
            console.log('Order created successfully:', createdOrder._id);

            // Send Invoice Email
            try {
                const invoiceHtml = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Order Confirmation</h2>
                        <p>Hi ${req.user.name},</p>
                        <p>Thank you for your order! Here are your order details:</p>
                        <p><strong>Order ID:</strong> ${createdOrder._id}</p>
                        
                        <h3>Items Ordered:</h3>
                        <ul style="list-style-type: none; padding: 0;">
                            ${createdOrder.orderItems.map(item => `
                                <li style="border-bottom: 1px solid #eee; padding: 10px 0;">
                                    <strong>${item.name}</strong> x ${item.quantity} - ₹${item.price}
                                </li>
                            `).join('')}
                        </ul>

                        <div style="margin-top: 20px; border-top: 2px solid #333; padding-top: 10px;">
                            <p><strong>Total Price:</strong> ₹${createdOrder.totalPrice}</p>
                            <p><strong>Payment Method:</strong> ${createdOrder.paymentMethod}</p>
                        </div>

                        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px;">
                            <h3>Shipping Address:</h3>
                            <p>${createdOrder.shippingAddress.address}, ${createdOrder.shippingAddress.city}, ${createdOrder.shippingAddress.postalCode}, ${createdOrder.shippingAddress.country}</p>
                        </div>
                        
                        <p style="margin-top: 30px; font-size: 12px; color: #777;">If you have any questions, please contact our support.</p>
                    </div>
                `;

                await sendEmail({
                    email: req.user.email,
                    subject: `Order Confirmation - Order #${createdOrder._id}`,
                    message: invoiceHtml
                });
                console.log('Invoice email sent successfully');
            } catch (emailError) {
                console.error('Error sending invoice email:', emailError);
                // Don't fail the request if email fails, just log it
            }

            res.status(201).json(createdOrder);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save(); // Fixed typo here
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
};
