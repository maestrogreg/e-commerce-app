import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/user';
import products from './data/products';
import userModel from './models/user';
import productModel from './models/product';
import orderModel from './models/order';
import connectDB from './database/connection';

dotenv.config();

connectDB();

const importValues = async () => {
    try {
        await userModel.deleteMany();
        await productModel.deleteMany();
        await orderModel.deleteMany();

        const savedUsers = await userModel.insertMany(users);

        const admin = savedUsers[0]._id;     
        const totalProducts = products.map(product =>{
            return { ...product, user: admin}
        });
        await productModel.insertMany(totalProducts);
        console.log('data imported') 
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

const clearCollections = async () => {
    try {
        await userModel.deleteMany();
        await productModel.deleteMany();
        await orderModel.deleteMany();

        
        console.log('collections cleared!');
        process.exit(); 
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    clearCollections();
}else{
    importValues();
};
