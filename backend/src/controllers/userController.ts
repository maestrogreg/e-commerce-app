import { Request, Response } from 'express';
import userModel from '../models/user';
import bcrypt from 'bcryptjs';
import loginSchema from '../middlewares/loginValidator';
import asyncHandler from 'express-async-handler';
import tokenGenerator from '../utils/generateToken';
import { regValidator } from '../middlewares/registrationSchema';

export const userLogin = async(req:Request, res:Response) =>{
    try{
        const validate = loginSchema.validate(req.body);
        if(validate.error){
            return res.status(400).send(validate.error.details[0].message);
        }
        const { email, password } = req.body;
        let user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({error:'User not found'});
        }
        console.log(user);
        const result = await bcrypt.compare(password, user.password);
        if(result === false){
            return res.status(400).json({error:'Enter correct email and password'});
        }
        res.status(200).json({
            status: 'ok',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: tokenGenerator(user._id)
            }
            
        })
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

export const userReg = asyncHandler(async(req: Request, res: Response) => {
    const validateInput = regValidator(req.body);
    if(validateInput.error){
        return res.status(400).send(validateInput.error.details[0].message);
    }
    const { name, email, password } = req.body;
    const userExist = await userModel.findOne({email});
    if(userExist){
        return res.status(400).json({status: "error", message:"user already exists"});
    }
    const user = await userModel.create({
        name,
        email,
        password
    });
    if (user) {
        res.status(201).json({
            status: 'ok',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: tokenGenerator(user._id)
            }
        })
    } else {
        res.status(400).json({status: 'error', message: 'unable to create user'});
    }
})

export const getUserProfile = (req:Request, res:Response)=>{
    res.send('success');
}