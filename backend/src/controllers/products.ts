import { Request, Response } from 'express';
import productModel from '../models/product';


export const getProducts = async(req:Request, res:Response)=>{
    try{
        const products = await productModel.find({});
        res.status(200).json(products)
    }catch(err){
        res.status(400).json({status:"ok", err: err.message});
    }
    
}

export const getProduct = async(req:Request, res:Response)=>{
    try{
        const id = req.params.id;
        const product = await productModel.findById(id);
        if(product){
            res.status(200).json(product);
        }else{
            res.status(404).json({status:"error", err: "Product not found!"});
        }

        
    }catch(error){
        res.status(400).json({status:"error", error: error.message});
    }
}