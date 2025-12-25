import Mongoose from "mongoose";
const productSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
}, {
    timestamps: true,
});

const Product = Mongoose.models.Product || Mongoose.model('Product', productSchema);
export default Product; 
