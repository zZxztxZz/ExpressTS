import { Request,Response } from "express";
import { BookService } from "../service/BookService";
import { RecordService } from "../service/RecordService";
import { UserService } from "../service/UserService";
import { Message } from "../utils/Message";
import { BOOK_IS_NOT_AVAILIABLE, PARMS_ERROR } from "../utils/Code";
import { Record } from "../commonClasses/Record";
import { User } from "../commonClasses/User";
import { Book } from "../commonClasses/Book";

class RecordController{

    userService = UserService.getInstance();
    recordService = RecordService.getInstance();
    bookService = BookService.getInstance();

    //借书
    addRecord = async(req:Request,res:Response)=>{
        var userId = req.body.userId;
        var bookId = req.body.bookId;
        //检测输入
        if(userId===undefined||bookId===undefined){
            return res.status(400).send(Message.fail(PARMS_ERROR));
        }

        //检测用户id是否存在
        var message = this.userService.selectUserById(userId);
        if(message.getStatus()!==0){
            return res.status(400).send(message);
        }

        //检测书本id是否存在
        var message = this.bookService.selectBookById(bookId);
        if(message.getStatus()!==0){
            return res.status(400).send(message);
        }

        //书是否可借
        if(!this.recordService.isBookAvailable(bookId)){
            return res.status(400).send(Message.fail(BOOK_IS_NOT_AVAILIABLE))
        }

        this.recordService.addRecord(userId,bookId);
        res.send(Message.success());
    }

    //查询所有记录
    listAll = async(req:Request,res:Response)=>{
        var recordList = this.recordService.findAllRecord();
        var resultData = new Array();
        for(var record of recordList){
            resultData.push(this.findUserAndBookByRecord(record))
        }
        res.send(Message.success(resultData));
    }


    //通过用户ID查询记录
    findRecordByUserId = async(req:Request,res:Response)=>{
        var userId = req.body.userId;
        //检测输入
        if(userId===undefined||userId===""){
            return res.status(400).send(Message.fail(PARMS_ERROR));
        }

        //检测用户id是否存在
        var message = this.userService.selectUserById(userId);
        if(message.getStatus()!==0){
            return res.status(400).send(message);
        }
        var recordList = this.recordService.findRecordByUserId(userId);
        var resultData = new Array();
        for(var record of recordList){
            resultData.push(this.findUserAndBookByRecord(record));
        }
        res.send(Message.success(resultData));

    }

    //联查
    findUserAndBookByRecord(record:Record){
        var user:User = UserService.getInstance().selectUserById(record.getUserId()).data;
        var book:Book = BookService.getInstance().selectBookById(record.getBookId()).data;
        return{
            "userId":record.getUserId(),
            "userName":user.getName(),
            "bookId":record.getBookId(),
            "bookName":book.getbookName(),
            "startTime":record.startTime,
            "endTime":record.endTime,
            "finished":record.finished
        }
    }
}

export const recordController = new RecordController();