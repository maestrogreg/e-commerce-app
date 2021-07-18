import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import userModel from '../models/user';

interface User{
    username: string,
    id: string
}

const authMiddleWare = expressAsyncHandler(async(req:Request, res:Response, next:NextFunction) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as User;
            req.user = await userModel.findById(decodedToken.id as string).select('-password');
            next();
        }catch(error){
            return res.status(400).json({status: 'error', message:'Not Autorized'});
        }
    }
    if(!token){
        return res.status(400).json({status: 'error', message:'Not Authorized'});
    }
    next();
});
export default authMiddleWare;