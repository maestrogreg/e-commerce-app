import mongoose from 'mongoose';
import { NextFunction } from 'express';
import bcrypt from 'bcryptjs';


const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
})

user.pre('save', async function(this: any, next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const userModel = mongoose.model('user', user);

export default userModel;