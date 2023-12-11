import { describe,expect,test } from "@jest/globals";
import axios from 'axios';
import { BOOK_ID_NOT_IN_LIST, BOOK_IS_NOT_AVAILIABLE, PARMS_ERROR, USER_ID_NOT_IN_LIST } from "../../utils/Code";

describe("Integration Record Test",()=>{
    const BASE_URL="http://localhost:3000/records/"
    const User_ID="a"
    const User_Name="userA"
    const Book_ID="1"
    const Book_Name="book1"
    
    test("Find all records when list empty",async()=>{
        await axios.get(BASE_URL+"recordAll")
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual([])
        })
    })

    test("Add record with wrong params",async()=>{
        await axios.post(BASE_URL+"recordAdd",{
            "name":User_Name,
            "Id":Book_ID
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(PARMS_ERROR)
        })
    })

    test("Find user record with wrong params",async()=>{
        await axios.post(BASE_URL+"userRecord",{
            "id":User_ID
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(PARMS_ERROR)
        })
    })


    test("Add record with wrong userId",async()=>{
        await axios.post(BASE_URL+"recordAdd",{
            "userId":User_ID,
            "userName":User_Name,
            "bookId":Book_ID,
            "bookName":Book_Name
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(USER_ID_NOT_IN_LIST)
        })
    })

    test("Find user record with wrong userId",async()=>{
        await axios.post(BASE_URL+"userRecord",{
            "userId":User_ID,
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(USER_ID_NOT_IN_LIST)
        })
    })


    test("Add record with wrong bookId",async()=>{
        await addUser(User_ID,User_Name)
        await axios.post(BASE_URL+"recordAdd",{
            "userId":User_ID,
            "userName":User_Name,
            "bookId":Book_ID,
            "bookName":Book_Name
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(BOOK_ID_NOT_IN_LIST)
        }) 
    })

    test("Find user record when no record",async()=>{
        await axios.post(BASE_URL+"userRecord",{
            "userId":User_ID,
        })
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual([])
        })
    })

    test("Add record",async()=>{
        await addBook(Book_ID,Book_Name)
        await axios.post(BASE_URL+"recordAdd",{
            "userId":User_ID,
            "userName":User_Name,
            "bookId":Book_ID,
            "bookName":Book_Name
        })
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
        })
    })

    test("Add record when book is not available",async()=>{
        await axios.post(BASE_URL+"recordAdd",{
            "userId":User_ID,
            "userName":User_Name,
            "bookId":Book_ID,
            "bookName":Book_Name
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(BOOK_IS_NOT_AVAILIABLE)
        }) 
    })

    test("Find user record",async()=>{
        await axios.post(BASE_URL+"userRecord",{
            "userId":User_ID,
        })
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data[0].userId).toBe(User_ID)
            expect(res.data.data[0].userName).toBe(User_Name)
            expect(res.data.data[0].bookId).toBe(Book_ID)
            expect(res.data.data[0].bookName).toBe(Book_Name)
        })
    })

    test("Find all record",async()=>{
        await axios.get(BASE_URL+"recordAll")
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data[0].userId).toBe(User_ID)
            expect(res.data.data[0].userName).toBe(User_Name)
            expect(res.data.data[0].bookId).toBe(Book_ID)
            expect(res.data.data[0].bookName).toBe(Book_Name)
        })
    })
})


async function addUser(userId:string,userName:string):Promise<void>{
    await axios.post("http://localhost:3000/users/userAdd",{
        "id":userId,
        "name":userName
    })
}

async function addBook(bookId:string,bookName:string):Promise<void>{
    await axios.post("http://localhost:3000/books/bookAdd",{
        "id":bookId,
        "bookName":bookName
    })
}