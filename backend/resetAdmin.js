import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const resetAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@example.com';
        const adminPassword = 'adminpassword123';

        // Check if admin exists and delete
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Found existing admin user. Deleting...');
            await User.deleteOne({ email: adminEmail });
            console.log('Existing admin user deleted.');
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        console.log('Creating new admin user...');
        const adminUser = await User.create({
            name: 'Admin User',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            isVerified: true
        });

        console.log('Admin user created successfully!');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('Role:', adminUser.role);
        console.log('Verified:', adminUser.isVerified);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

resetAdmin();
