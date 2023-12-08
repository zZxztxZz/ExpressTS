import { describe,expect,test } from "@jest/globals";
import { recordController } from "../../controller/recordController";
import { BookService } from "../../service/BookService";
import { RecordService } from "../../service/RecordService";
import { UserService } from "../../service/UserService";
import { Record } from "../../commonClasses/Record";
import httpMocks from 'node-mocks-http'
import { User } from "../../commonClasses/User";
import { Message } from "../../utils/Message";
import { Book } from "../../commonClasses/Book";
import { BOOK_ID_NOT_IN_LIST, BOOK_IS_NOT_AVAILIABLE, PARMS_ERROR, USER_ID_NOT_IN_LIST } from "../../utils/Code";
describe("RecordController Test",()=>{
    const BASE_URL = "http://localhost:3000/records/"
    const User_Id="1";
    const User_Name="userTest";
    const Book_Id = "1";
    const Book_Name="bookTest";

    test("ListAll test",()=>{
        var recordService = RecordService.getInstance();
        jest.spyOn(recordService,"findAllRecord").mockImplementation(()=>{
            var result = new Array<Record>();
            result.push(new Record(User_Id,Book_Id));
            return result
        })
        var userService=UserService.getInstance();
        var bookService=BookService.getInstance();
        jest.spyOn(userService,"selectUserById").mockImplementation((userId)=>{
            return Message.success(new User(userId,User_Name)) ;
        })
        jest.spyOn(bookService,"selectBookById").mockImplementation((bookId)=>{
            return Message.success(new Book(bookId,Book_Name));
        })
        const req = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'recordAll'
        })

        const res = httpMocks.createResponse();
        
        recordController.listAll(req,res);

        expect(res._getData().status).toBe(0);
    })

    test("findUserAndBookByRecord Test",()=>{
        var userService=UserService.getInstance();
        var bookService=BookService.getInstance();
        jest.spyOn(userService,"selectUserById").mockImplementation((userId)=>{
            return Message.success(new User(userId,User_Name)) ;
        })
        jest.spyOn(bookService,"selectBookById").mockImplementation((bookId)=>{
            return Message.success(new Book(bookId,Book_Name));
        })

        var result = recordController.findUserAndBookByRecord(new Record(User_Id,Book_Id));

        expect(result.bookName).toBe(Book_Name);
        expect(result.userName).toBe(User_Name);
    })


    
    test("findRecordByUserId Test",()=>{
        var recordService = RecordService.getInstance();
        jest.spyOn(recordService,"findRecordByUserId").mockImplementation((User_Id)=>{
            var result = new Array<Record>();
            result.push(new Record(User_Id,Book_Id));
            return result
        })
        var userService=UserService.getInstance();
        var bookService=BookService.getInstance();
        jest.spyOn(userService,"selectUserById").mockImplementation((userId)=>{
            return Message.success(new User(userId,User_Name)) ;
        })
        jest.spyOn(bookService,"selectBookById").mockImplementation((bookId)=>{
            return Message.success(new Book(bookId,Book_Name));
        })

        //正常情况
        var req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'userRecord',
            body:{
                "userId":User_Id
            }
        })

        var res = httpMocks.createResponse();
        recordController.findRecordByUserId(req,res);
        expect(res._getData().status).toBe(0);

        //输入错误
        var req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'userRecord',
            body:{
                "userId":""
            }
        })

        var res = httpMocks.createResponse();
        recordController.findRecordByUserId(req,res);
        expect(res.statusCode).toBe(400);
        expect(res._getData().status).toBe(1);
        expect(res._getData().message).toBe(PARMS_ERROR);

        //用户id不存在
        jest.spyOn(userService,"selectUserById").mockImplementation((userId)=>{
            return Message.fail(USER_ID_NOT_IN_LIST,userId);
        })
        var req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'userRecord',
            body:{
                "userId":2
            }
        })

        var res = httpMocks.createResponse();
        recordController.findRecordByUserId(req,res);
        expect(res.statusCode).toBe(400);
        expect(res._getData().status).toBe(1);
        expect(res._getData().message).toBe(USER_ID_NOT_IN_LIST);
    })

    test("addRecord Test",()=>{
        //输入错误
        var req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'userRecord',
            body:{
                
            }
        })

        var res = httpMocks.createResponse();
        recordController.addRecord(req,res);
        expect(res.statusCode).toBe(400);
        expect(res._getData().status).toBe(1);
        expect(res._getData().message).toBe(PARMS_ERROR);

        var req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'userRecord',
            body:{
                "userId":User_Id
            }
        })

        var res = httpMocks.createResponse();
        recordController.addRecord(req,res);
        expect(res.statusCode).toBe(400);
        expect(res._getData().status).toBe(1);
        expect(res._getData().message).toBe(PARMS_ERROR);

        //用户id不存在
        var userService = UserService.getInstance()
        jest.spyOn(userService,"selectUserById").mockImplementation((userId)=>{
            return Message.fail(USER_ID_NOT_IN_LIST,userId);
        })
        var req = httpMocks.createRequest({
            method:'POST',
            body:{
                "userId":2,
                "bookId":2
            }
        })

        var res = httpMocks.createResponse();
        recordController.addRecord(req,res);
        expect(res.statusCode).toBe(400);
        expect(res._getData().status).toBe(1);
        expect(res._getData().message).toBe(USER_ID_NOT_IN_LIST);

        //书本id不存在
        jest.spyOn(userService,"selectUserById").mockImplementation((userId)=>{
            return Message.success(new User(userId,User_Name)) ;
        })
        var bookService = BookService.getInstance()
        jest.spyOn(bookService,"selectBookById").mockImplementation((bookId)=>{
            return Message.fail(BOOK_ID_NOT_IN_LIST,bookId);
        })
        var req = httpMocks.createRequest({
            method:'POST',
            body:{
                "userId":2,
                "bookId":2
            }
        })

        var res = httpMocks.createResponse();
        recordController.addRecord(req,res);
        expect(res.statusCode).toBe(400);
        expect(res._getData().status).toBe(1);
        expect(res._getData().message).toBe(BOOK_ID_NOT_IN_LIST);

        //书本不可借
        jest.spyOn(bookService,"selectBookById").mockImplementation((bookId)=>{
            return Message.success(new Book(bookId,Book_Name));
        })
        var recordService = RecordService.getInstance();
        jest.spyOn(recordService,"isBookAvailable").mockImplementation((bookId)=>{
            return false;
        })
        var req = httpMocks.createRequest({
            method:'POST',
            body:{
                "userId":User_Id,
                "bookId":Book_Id
            }
        })

        var res = httpMocks.createResponse();
        recordController.addRecord(req,res);
        expect(res.statusCode).toBe(400);
        expect(res._getData().status).toBe(1);
        expect(res._getData().message).toBe(BOOK_IS_NOT_AVAILIABLE);


        //正常情况
        jest.spyOn(recordService,"isBookAvailable").mockImplementation((bookId)=>{
            return true;
        })
        var res = httpMocks.createResponse();
        recordController.addRecord(req,res);
        expect(res.statusCode).toBe(200);
        expect(res._getData().status).toBe(0);
    })
})
