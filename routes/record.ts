import express from 'express';
import {recordController} from '../controller/recordController'
const router = express.Router();

/* GET users listing. */
router.get('/recordAll',recordController.listAll)

router.post('/recordAdd',recordController.addRecord)

router.post('/userRecord',recordController.findRecordByUserId);

export default router
