import express, {Request, Response} from 'express';
import data from './data/products'

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

app.listen(5000,()=>console.log(`server running on port http://localhost:5000`))