import express from 'express';
import Product from '../models/Product.js';
import { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, seedProducts } from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/seed', seedProducts);

router.route('/')
    .get(getAllProducts)
    .post(protect, admin, createProduct);

router.route('/:id')
    .get(getSingleProduct)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;
