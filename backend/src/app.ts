import express, {Request, Response} from 'express';
import connectDB from './database/connection';
import dotenv from 'dotenv';
import data from './data/products';

dotenv.config();

connectDB();
const app = express();

app.get('/',(req: Request, res: Response)=>{
    res.send('API is running...')
})

app.get('/products',(req: Request, res: Response)=>{
    res.json(data)
})


app.get('/product/:id', (req: Request, res: Response)=>{
    let value = data.find(item=> item._id === req.params.id);
    res.json(value);
})
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`))