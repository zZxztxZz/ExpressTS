import { describe,expect,test } from "@jest/globals";
import axios from 'axios';
import { PARMS_ERROR, BOOK_ADD_WITH_SAME_ID, BOOK_ID_NOT_IN_LIST } from "../../utils/Code";
describe("Integration Book Test",()=>{
    const BASE_URL="http://localhost:3000/books/"
    const Book_ID="1"
    const Book_Name="test"


    test("Find all book when empty list",async()=>{
        await axios.get(BASE_URL+"bookAll")
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual([])
        })
    })

    test("Find book with wrong id",async()=>{
        await axios.get(BASE_URL+`book/${Book_ID}`)
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(BOOK_ID_NOT_IN_LIST)
        })
    })

    test("Add book with wrong params",async()=>{
        await axios.post(BASE_URL+"bookAdd",{
            "bookId":Book_ID,
            "bookName":Book_Name
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(PARMS_ERROR)
        })
    })

    test("Add book",async()=>{
        await axios.post(BASE_URL+"bookAdd",{
            "id":Book_ID,
            "bookName":Book_Name
        })
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
        })
    })

    test("Add book with same id",async()=>{
        await axios.post(BASE_URL+"bookAdd",{
            "id":Book_ID,
            "bookName":Book_Name
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(BOOK_ADD_WITH_SAME_ID)
        })
    })

    test("Find book by id",async()=>{
        await axios.get(BASE_URL+`book/${Book_ID}`)
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual({
                "id":Book_ID,
                "bookName":Book_Name
            })
        })
    })

    test("Find all book",async()=>{
        await axios.get(BASE_URL+"bookAll")
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual([
                {
                    "id":Book_ID,
                    "bookName":Book_Name
                }
            ])
        })
    })
})