import {Request, Response, Router} from 'express';
import { userLogin, getUserProfile, userReg } from '../controllers/userController';
import authMiddleWare from '../middlewares/authMiddleware'

const router = Router();

router.post('/register', userReg);
router.post('/login', userLogin);
router.get('/profile',authMiddleWare, getUserProfile);

export default router;

