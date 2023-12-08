import { describe,expect,test } from "@jest/globals";
import { BOOK_ADD_WITH_SAME_ID, BOOK_ID_NOT_IN_LIST, PARMS_ERROR } from "../../utils/Code";
import httpMocks from 'node-mocks-http'
import { bookController } from "../../controller/bookController";
import { BookService } from "../../service/BookService";
import { Message } from "../../utils/Message";

describe("BookController Test",()=>{
    const BASE_URL = "http://localhost:3000/books/"
    const First_Book_Id = "1";
    const First_Book_Name = "haha";
    const Second_Book_Id = "2";
    const Second_Book_Name = "wuwu";

    //空的时候测试获取所有书本
    test("Test book list all when list empty",()=>{
        const request = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'listAll'
        })

        const response = httpMocks.createResponse();
        
        bookController.listAll(request,response);

        expect(response.statusCode).toBe(200)
        expect(response._getData().data).toEqual([]);

        
    })

    //空的时候测试根据ID查询书本
    test("Test find book by id when list empty",()=>{
        const req = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'book/1'
        })

        const res = httpMocks.createResponse();
        
        bookController.selectBookById(req,res);

        //服务器应该返回无法找到该书本
        expect(res.statusCode).toBe(400)
        expect(res._getData().status).toBe(1)
        expect(res._getData().message).toBe(BOOK_ID_NOT_IN_LIST)

        
    })

    //测试添加书本时错误参数
    test("Test add book with wrong params",()=>{
        const req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'bookAdd',
            data:{
                "id":First_Book_Id,
                "name":First_Book_Name
            }
        })
        const res = httpMocks.createResponse();
        bookController.addBook(req,res);

        //服务器返回参数错误
        expect(res.statusCode).toBe(400)
        expect(res._getData().status).toBe(1)
        expect(res._getData().message).toBe(PARMS_ERROR)

    })

    //测试添加书本
    test("Test add book",()=>{
        const req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'bookAdd',
            body:{
                "id":First_Book_Id,
                "bookName":First_Book_Name
            }
        })
        const res = httpMocks.createResponse();
        bookController.addBook(req,res);

        expect(res.statusCode).toBe(200)
        expect(res._getData().status).toBe(0)

    })

    //通过ID查询刚刚添加的书本
    test("Test find book by id",()=>{
        jest.mock("../../service/BookService");
        var service = BookService.getInstance();
        jest.spyOn(service,"selectBookById").mockImplementation((bookId):Message=>{
            if(bookId==First_Book_Id){
                return Message.success([{
                    "id":First_Book_Id,
                    "bookName":First_Book_Name
                }])
            }
            else if(bookId==Second_Book_Id){
                return Message.success([{
                    "id":Second_Book_Id,
                    "bookName":Second_Book_Name
                }])
            }
            return Message.fail(BOOK_ID_NOT_IN_LIST)
        })

        const req = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'book/',
            params:{
                "id":First_Book_Id
            }
        })

        const res = httpMocks.createResponse();
        
        bookController.selectBookById(req,res);

        expect(res.statusCode).toBe(200)
        expect(res._getData().status).toBe(0)
        expect(res._getData().data).toEqual([{
            "id":First_Book_Id,
            "bookName":First_Book_Name
        }])
        
    })

    //重复注册的情况
    test("Add book with same id",()=>{
        const req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'bookAdd',
            body:{
                "id":First_Book_Id,
                "bookName":First_Book_Name
            }
        })
        const res = httpMocks.createResponse();
        //添加第一次
        bookController.addBook(req,res);

        //添加第二次
        bookController.addBook(req,res);
        expect(res.statusCode).toBe(400)
        expect(res._getData().status).toBe(1)
        expect(res._getData().message).toBe(BOOK_ADD_WITH_SAME_ID)
    })
    
    //查看全部列表出错的情况
    test("Error when list all",()=>{
        jest.mock("../../service/BookService");
        var service = BookService.getInstance();
        jest.spyOn(service,"selectAll").mockImplementation(():Message=>{
            return Message.fail()
        })

        const request = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'listAll'
        })

        const response = httpMocks.createResponse();
        
        bookController.listAll(request,response);

        expect(response.statusCode).toBe(400)
    })
})