import express, {Request, Response, NextFunction} from 'express';
import {HttpError}  from 'http-errors';
import connectDB from './database/connection';
import dotenv from 'dotenv';
import logger from 'morgan';
import productRoutes from './routes/productsRoutes'
import userRoutes from './routes/userRoute';

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(logger('dev'));

app.get('/',(req: Request, res: Response)=>{
    res.send('API is running...')
});

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.use((error:HttpError, req:Request, res:Response, next:NextFunction)=>{
    const newError = res.statusCode === 200 ? 500  : res.statusCode;
    res.status(newError);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`))