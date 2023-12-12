import express from 'express';
import {userController} from '../controller/userController'
const router = express.Router();

/* GET users listing. */

/**
 * @swagger
 * /users/userAll:
 *   get:
 *     summary: 获取所有用户信息
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 成功返回信息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                 time:
 *                   type: string
 *                   description: The time of the response
 *             examples:
 *               有数据时:
 *                 value:
 *                   status: 0
 *                   message: "Success!"
 *                   data:
 *                     - id: "a1"
 *                       bookName: "菈妮"
 *                     - id: "b1"
 *                       bookName: "梅琳娜"
 *                   time: "2023-12-12 13:52:50"
 *               无数据时:
 *                 value:
 *                   status: 0
 *                   message: "Success!"
 *                   data: []
 *                   time: "2023-12-12 14:23:27"
 */
router.get('/userAll',userController.listAll)
/**
 * @swagger
 * /users/userAdd:
 *   post:
 *     summary: 添加新用户
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *           example:
 *             id: "c1"
 *             name: "海绵宝宝"
 *     responses:
 *       200:
 *         description: 成功添加用户
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
 *               time: "2023-12-12 14:30:59"
 *       400:
 *         description: 添加用户失败
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
 *               重复添加相同ID:
 *                 value:
 *                   status: 1
 *                   message: "Can't add same Id during adding user"
 *                   time: "2023-12-12 14:35:22"
 *               参数错误:
 *                 value:
 *                   status: 1
 *                   message: "Wrong params"
 *                   time: "2023-12-12 14:35:31"
 */

router.post('/userAdd',userController.register)
/**
 * @swagger
 * /users/user/{id}:
 *   get:
 *     summary: 获取指定id的用户信息
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 用户id参数
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 time:
 *                   type: string
 *                   description: The time of the response
 *             examples:
 *               example1:
 *                 value:
 *                   status: 0
 *                   message: "Success!"
 *                   data:
 *                     id: "1"
 *                     bookName: "被你找到拉"
 *                   time: "2023-12-12 14:31:7"
 *       400:
 *         description: 找不到该ID的用户
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
 *               example2:
 *                 value:
 *                   status: 1
 *                   message: "Can't find the user by id"
 *                   time: "2023-12-12 14:30:32"
 */
router.get('/user/:id',userController.selectUserById);

export default router
