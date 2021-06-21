import { Router } from 'express';

import { getAllUsers, getUserById, createUser } from '../controllers/user.controller'


const router = Router();

router.get('/user', getAllUsers);

router.get('/user/:userid', getUserById);

router.post('/user', createUser);


export default router;