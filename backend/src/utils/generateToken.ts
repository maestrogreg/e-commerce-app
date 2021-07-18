import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const secret = process.env.JWT_SECRET as string;
const tokenGenerator = (id: string) =>{
    return jwt.sign({ id }, secret, {
        expiresIn: '1d'
    })
}

export default tokenGenerator;