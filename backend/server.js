import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();

// Check environment variables
console.log('🔍 Environment Configuration Check:');
console.log('  DB:', process.env.DB ? '✅ Set' : '❌ Missing');
console.log('  PORT:', process.env.PORT || '5000 (default)');
console.log('  JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('  EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
console.log('  EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');

// Connect to Database
connectDB();

const app = express();

app.use(cors({
  origin: '*', // Allow all origins explicitly
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});
app.use(express.json());


//Import Routes
import authRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

app.use('/api/admin/products', productRoutes);


// use Routes

app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);




const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

