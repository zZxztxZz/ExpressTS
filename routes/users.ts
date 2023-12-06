import express from 'express';
import {userController} from '../controller/userController'
const router = express.Router();

/* GET users listing. */
router.get('/userAll',userController.listAll)

export default router
