import { describe,expect,test } from "@jest/globals";
import axios from 'axios';
import { PARMS_ERROR, USER_ADD_WITH_SAME_ID, USER_ID_NOT_IN_LIST } from "../../utils/Code";
describe("Integration User Test",()=>{
    const BASE_URL="http://localhost:3000/users/"
    const User_Id="1"
    const User_Name="test"


    test("Find all user when empty list",async()=>{
        await axios.get(BASE_URL+"userAll")
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual([])
        })
    })

    test("Find user with wrong id",async()=>{
        await axios.get(BASE_URL+`user/${User_Id}`)
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(USER_ID_NOT_IN_LIST)
        })
    })

    test("Add user with wrong params",async()=>{
        await axios.post(BASE_URL+"userAdd",{
            "userId":User_Id,
            "userName":User_Name
        })
        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(PARMS_ERROR)
        })
    })

    test("Add user",async()=>{
        await axios.post(BASE_URL+"userAdd",{
            "id":User_Id,
            "name":User_Name
        })
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
        })
    })

    test("Add user with same id",async()=>{
        await axios.post(BASE_URL+"userAdd",{
            "id":User_Id,
            "name":User_Name
        })

        .catch((err)=>{
            expect(err.response.status).toBe(400)
            expect(err.response.data.status).toBe(1)
            expect(err.response.data.message).toBe(USER_ADD_WITH_SAME_ID)
        })
    })

    test("Find user by id",async()=>{
        await axios.get(BASE_URL+`user/${User_Id}`)
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual({
                "id":User_Id,
                "name":User_Name
            })
        })
    })

    test("Find all user",async()=>{
        await axios.get(BASE_URL+"userAll")
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.data.status).toBe(0)
            expect(res.data.data).toEqual([
                {
                    "id":User_Id,
                    "name":User_Name
                }
            ])
        })
    })
})