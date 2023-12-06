import { Request,Response } from "express";
import { Book } from "../commonClasses/Book";
import { Message } from "../utils/Message";
import { PARMS_ERROR } from "../utils/Code";
import { BookService } from "../service/BookService";

class BookController{

    service = BookService.getInstance();

    //注册
    addBook = async(req:Request,res:Response)=>{
        var bookId = req.body.id;
        var bookName = req.body.bookName;
        if(bookId===undefined||bookName===undefined){
            return res.status(400).send(Message.fail(PARMS_ERROR));
        }

        var message = this.service.addBook(new Book(bookId,bookName));
        res.status(message.getStatus()===0?200:400).send(message);
    }

    //查看全部
    listAll = async(req:Request,res:Response)=>{
        var message = this.service.selectAll();
        res.status(message.getStatus()===0?200:400).send(message);
    }

    //通过id查找
    selectBookById = async(req:Request,res:Response)=>{
        var bookId = req.params.id
        var message = this.service.selectBookById(bookId)
        res.status(message.getStatus()===0?200:400).send(message);
    }
}

export const bookController = new BookController();