import express, { Request, Response} from 'express';
import { getProduct, getProducts } from '../controllers/products';
 const Router = express.Router();

 Router.get('/', getProducts)


Router.get('/:id', getProduct)

 export default Router;