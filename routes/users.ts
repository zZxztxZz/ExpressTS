import express from 'express';
import {userController} from '../controller/userController'
const router = express.Router();

/* GET users listing. */
router.get('/userAll',userController.listAll)

router.post('/userAdd',userController.register)

router.get('/user/:id',userController.selectUserById);

export default router
