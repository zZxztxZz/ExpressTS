import { describe,expect,test } from "@jest/globals";
import { USER_ADD_WITH_SAME_ID, USER_ID_NOT_IN_LIST, PARMS_ERROR } from "../../utils/Code";
import httpMocks from 'node-mocks-http'
import { userController } from "../../controller/userController";
import { UserService } from "../../service/UserService";
import { Message } from "../../utils/Message";

describe("UserController Test",()=>{
    const BASE_URL = "http://localhost:3000/users/"
    const First_User_Id = "1";
    const First_User_Name = "haha";
    const Second_User_Id = "2";
    const Second_User_Name = "wuwu";

    //空的时候测试获取所有用户
    test("Test user list all when list empty",()=>{
        const request = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'listAll'
        })

        const response = httpMocks.createResponse();
        
        userController.listAll(request,response);

        expect(response.statusCode).toBe(200)
        expect(response._getData().data).toEqual([]);

        
    })

    //空的时候测试根据ID查询用户
    test("Test find user by id when list empty",()=>{
        const req = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'user/1'
        })

        const res = httpMocks.createResponse();
        
        userController.selectUserById(req,res);

        //服务器应该返回无法找到该用户
        expect(res.statusCode).toBe(400)
        expect(res._getData().status).toBe(1)
        expect(res._getData().message).toBe(USER_ID_NOT_IN_LIST)

        
    })

    //测试添加用户时错误参数
    test("Test add user with wrong params",()=>{
        const req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'userAdd',
            data:{
                "id":First_User_Id
        ,
                "name":First_User_Name
            }
        })
        const res = httpMocks.createResponse();
        userController.register(req,res);

        //服务器返回参数错误
        expect(res.statusCode).toBe(400)
        expect(res._getData().status).toBe(1)
        expect(res._getData().message).toBe(PARMS_ERROR)

    })

    //测试添加用户
    test("Test add user",()=>{
        const req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'userAdd',
            body:{
                "id":First_User_Id
        ,
                "name":First_User_Name
            }
        })
        const res = httpMocks.createResponse();
        userController.register(req,res);

        expect(res.statusCode).toBe(200)
        expect(res._getData().status).toBe(0)

    })

    //通过ID查询刚刚添加的用户
    test("Test find book by id",()=>{
        jest.mock("../../service/UserService");
        var service = UserService.getInstance();
        jest.spyOn(service,"selectUserById").mockImplementation((userId):Message=>{
            if(userId==First_User_Id
        ){
                return Message.success([{
                    "id":First_User_Id
            ,
                    "name":First_User_Name
                }])
            }
            else if(userId==Second_User_Id){
                return Message.success([{
                    "id":Second_User_Id,
                    "name":Second_User_Name
                }])
            }
            return Message.fail(USER_ID_NOT_IN_LIST)
        })

        const req = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'book/',
            params:{
                "id":First_User_Id
        
            }
        })

        const res = httpMocks.createResponse();
        
        userController.selectUserById(req,res);

        expect(res.statusCode).toBe(200)
        expect(res._getData().status).toBe(0)
        expect(res._getData().data).toEqual([{
            "id":First_User_Id
    ,
            "name":First_User_Name
        }])
        
    })

    //重复注册的情况
    test("Add book with same id",()=>{
        const req = httpMocks.createRequest({
            method:'POST',
            url:BASE_URL+'bookAdd',
            body:{
                "id":First_User_Id
        ,
                "name":First_User_Name
            }
        })
        const res = httpMocks.createResponse();
        //添加第一次
        userController.register(req,res);

        //添加第二次
        userController.register(req,res);
        expect(res.statusCode).toBe(400)
        expect(res._getData().status).toBe(1)
        expect(res._getData().message).toBe(USER_ADD_WITH_SAME_ID)
    })
    
    //查看全部列表出错的情况
    test("Error when list all",()=>{
        jest.mock("../../service/UserService");
        var service = UserService.getInstance();
        jest.spyOn(service,"selectAll").mockImplementation(():Message=>{
            return Message.fail()
        })

        const request = httpMocks.createRequest({
            method:'GET',
            url:BASE_URL+'listAll'
        })

        const response = httpMocks.createResponse();
        
        userController.listAll(request,response);

        expect(response.statusCode).toBe(400)
    })
})