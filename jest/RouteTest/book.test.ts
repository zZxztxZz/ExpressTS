import { describe,expect,test } from "@jest/globals";
import booksRouter from "../../routes/book";
import axios from 'axios';
import { BOOK_ID_NOT_IN_LIST, PARMS_ERROR } from "../../utils/Code";
describe("BookController Test",()=>{
    const BASE_URL = "http://localhost:3000/books/"
    const First_Book_Id = "1";
    const First_Book_Name = "haha";
    const Second_Book_Id = "2";
    const Second_Book_Name = "wuwu";

    //空的时候测试获取所有书本
    test("Test book list all when list empty",async ()=>{
        const response = await axios.get(
            BASE_URL+"bookAll"
        )
        expect(response.data.status).toBe(0)
        expect(response.data.data).toEqual([])
    })

    //空的时候测试根据ID查询书本
    test("Test find book by id when list empty",async()=>{
        await axios.get(
            BASE_URL+"book/1"
        )
        .then(res=>{
            //服务器应该返回无法找到该书本
            expect(res.data.status).toBe(1)
            expect(res.data.message).toBe(BOOK_ID_NOT_IN_LIST)
        })
        .catch(err=>{
            //do noting
        })
        
    })

    //测试添加书本时错误参数
    test("Test add book with wrong params",async()=>{
        await axios.post(
            BASE_URL+"bookAdd",
            {
                "id":First_Book_Id,
                "name":First_Book_Name
            }
        )
        .then(res=>{
            //服务器返回参数错误
            expect(res.data.status).toBe(1)
            expect(res.data.message).toBe(PARMS_ERROR)
        })
        .catch(err=>{
            //do nothing
        })
    })

    //测试添加书本
    test("Test add book",async()=>{
        await axios.post(
            BASE_URL+"bookAdd",
            {
                "id":First_Book_Id,
                "bookName":First_Book_Name
            }
        )
        .then(res=>{
            expect(res.data.status).toBe(0)
        })
    })

    //通过ID查询刚刚添加的书本
    test("Test find book by id",async()=>{
        await axios.get(
            BASE_URL+`book/${First_Book_Id}`
        )
        .then(res=>{
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual({
                "id":First_Book_Id,
                "bookName":First_Book_Name
            })
        })
        .catch(err=>{
            //do noting
        })
        
    })
    
})