import express from 'express';
import {bookController} from '../controller/bookController'
const router = express.Router();

/* GET users listing. */
router.get('/bookAll',bookController.listAll)

router.post('/bookAdd',bookController.addBook)

router.get('/book/:id',bookController.selectBookById);

export default router
