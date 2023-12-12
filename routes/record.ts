import express from 'express';
import {recordController} from '../controller/recordController'
const router = express.Router();

/* GET users listing. */

/**
 * @swagger
 * /records/recordAll:
 *   get:
 *     summary: 获取全部借书记录
 *     tags: [Record]
 *     responses:
 *       200:
 *         description: 成功返回信息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       userName:
 *                         type: string
 *                       bookId:
 *                         type: string
 *                       bookName:
 *                         type: string
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *                       finished:
 *                         type: boolean
 *                 time:
 *                   type: string
 *                   description: The time of the response
 *             examples:
 *               无记录的情况:
 *                 value:
 *                   status: 0
 *                   message: "Success!"
 *                   data: []
 *                   time: "2023-12-12 14:52:47"
 *               有记录的情况:
 *                 value:
 *                   status: 0
 *                   message: "Success!"
 *                   data:
 *                     - userId: "a1"
 *                       userName: "JOJO"
 *                       bookId: "1"
 *                       bookName: "奇妙冒险"
 *                       startTime: "2023-12-12 14:53:3"
 *                       endTime: ""
 *                       finished: false
 *                     - userId: "a2"
 *                       userName: "DIO"
 *                       bookId: "2"
 *                       bookName: "小面包"
 *                       startTime: "2023-12-12 14:53:26"
 *                       endTime: ""
 *                       finished: false
 *                   time: "2023-12-12 14:53:28"
 */
router.get('/recordAll',recordController.listAll)
/**
 * @swagger
 * /recordAdd:
 *   post:
 *     summary: 添加借书记录
 *     tags: [Record]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               bookId:
 *                 type: string
 *           example:
 *             userId: "1"
 *             bookId: "2"
 *     responses:
 *       200:
 *         description: 成功添加记录
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 time:
 *                   type: string
 *                   description: The time of the response
 *             example:
 *               status: 0
 *               message: "Success!"
 *               time: "2023-12-12 15:19:24"
 *       400:
 *         description: 添加记录失败
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 time:
 *                   type: string
 *                   description: The time of the response
 *             examples:
 *               参数错误情况:
 *                 value:
 *                   status: 1
 *                   message: "Wrong params"
 *                   time: "2023-12-12 15:18:22"
 *               用户ID不存在情况:
 *                 value:
 *                   status: 1
 *                   message: "Can't find the user by id"
 *                   time: "2023-12-12 15:18:31"
 *               书本ID不存在情况:
 *                 value:
 *                   status: 1
 *                   message: "Can't find the book by id"
 *                   time: "2023-12-12 15:18:46"
 *               书本不可用情况:
 *                 value:
 *                   status: 1
 *                   message: "This book is not availiable"
 *                   time: "2023-12-12 15:18:58"
 */

router.post('/recordAdd',recordController.addRecord)


/**
 * @swagger
 * /records/userRecord:
 *   post:
 *     summary: 查找用户的全部借书记录
 *     tags: [Record]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *           example:
 *             userId: "1"
 *     responses:
 *       200:
 *         description: 成功返回信息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       userName:
 *                         type: string
 *                       bookId:
 *                         type: string
 *                       bookName:
 *                         type: string
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *                       finished:
 *                         type: boolean
 *                 time:
 *                   type: string
 *                   description: The time of the response
 *             examples:
 *               example1:
 *                 value:
 *                   status: 0
 *                   message: "Success!"
 *                   data:
 *                     - userId: "1"
 *                       userName: "大洋游侠"
 *                       bookId: "1"
 *                       bookName: "如何制作美味蟹黄堡"
 *                       startTime: "2023-12-12 15:24:53"
 *                       endTime: ""
 *                       finished: false
 *                     - userId: "1"
 *                       userName: "大洋游侠"
 *                       bookId: "2"
 *                       bookName: "如何打败肮脏泡泡"
 *                       startTime: "2023-12-12 15:24:55"
 *                       endTime: ""
 *                       finished: false
 *                   time: "2023-12-12 15:24:58"
 *       400:
 *         description: 查找记录失败
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 time:
 *                   type: string
 *                   description: The time of the response
 *             examples:
 *               参数错误情况:
 *                 value:
 *                   status: 1
 *                   message: "Wrong params"
 *                   time: "2023-12-12 15:24:5"
 *               用户ID不存在情况:
 *                 value:
 *                   status: 1
 *                   message: "Can't find the user by id"
 *                   time: "2023-12-12 15:24:11"
 */

router.post('/userRecord',recordController.findRecordByUserId);

export default router
