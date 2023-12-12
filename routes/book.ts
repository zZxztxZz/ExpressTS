import express from 'express';
import { bookController } from '../controller/bookController'
import swaggerJSDoc from 'swagger-jsdoc';
const router = express.Router();

/* GET users listing. */

/**
 * @swagger
 * /books/bookAll:
 *   get:
 *     summary: 获取所有书本信息
 *     tags: [Book]
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
 *                       bookName:
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
 *                       bookName: "海底两万里"
 *                     - id: "b1"
 *                       bookName: "C语言从入门到入土"
 *                   time: "2023-12-12 13:52:50"
 *               无数据时:
 *                 value:
 *                   status: 0
 *                   message: "Success!"
 *                   data: []
 *                   time: "2023-12-12 14:23:27"
 */
router.get('/bookAll', bookController.listAll)


/**
 * @swagger
 * /books/bookAdd:
 *   post:
 *     summary: 添加新书本
 *     tags: [Book]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               bookName:
 *                 type: string
 *           example:
 *             id: "b1"
 *             bookName: "死灵之书"
 *     responses:
 *       200:
 *         description: 成功添加书本
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
 *         description: 添加书本失败
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
 *                   message: "Can't add same Id during adding book"
 *                   time: "2023-12-12 14:35:22"
 *               参数错误:
 *                 value:
 *                   status: 1
 *                   message: "Wrong params"
 *                   time: "2023-12-12 14:35:31"
 */

router.post('/bookAdd', bookController.addBook)


/**
 * @swagger
 * /books/book/{id}:
 *   get:
 *     summary: 获取指定id的书本信息
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 书本id参数
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
 *                     bookName:
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
 *         description: 找不到该ID的书
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
 *                   message: "Can't find the book by id"
 *                   time: "2023-12-12 14:30:32"
 */
router.get('/book/:id', bookController.selectBookById);

export default router
