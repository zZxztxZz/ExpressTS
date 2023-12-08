import { describe,expect,test } from "@jest/globals";
import { UserService } from "../../service/UserService";
import { User } from "../../commonClasses/User";
import { USER_ADD_WITH_SAME_ID } from "../../utils/Code";
describe("UserService Test",()=>{
    var service:UserService;
    const First_User_Id = "1";
    const First_User_Name = "haha";
    const Second_User_Id = "2";
    const Second_User_Name = "wuwu";



    beforeAll(()=>{
        console.log("初始化Servce");
        service=UserService.getInstance();
    })


    //测试添加用户的返回是否成功
    test(`Add id:${First_User_Id} name:${First_User_Name}`,()=>{
        var message = service.addUser(new User(First_User_Id,First_User_Name));
        expect(message.getStatus()).toBe(0);
    })

    //测试添加的用户信息是否正确
    test(`Find user by Id:${First_User_Id}`,()=>{
        var message = service.selectUserById(First_User_Id);
        expect(message.getStatus()).toBe(0);
        expect(message.getData().getId()).toBe(First_User_Id);
        expect(message.getData().getName()).toBe(First_User_Name);
    })

    //测试添加重复id是否检测
    test(`Add id:${First_User_Id} again`,()=>{
        var message = service.addUser(new User(First_User_Id,Second_User_Name));
        expect(message.getStatus()).toBe(1);
        expect(message.getMessage()).toBe(USER_ADD_WITH_SAME_ID);
    })

    //测试添加不同id的用户
    test(`Add id:${Second_User_Id} name:${Second_User_Name}`,()=>{
        var message = service.addUser(new User(Second_User_Id,Second_User_Name));
        expect(message.getStatus()).toBe(0);
    })

    //测试查询所有用户
    test("Find all user",()=>{
        var message = service.selectAll();
        expect(message.getStatus()).toBe(0);
        var data = message.getData();
        expect(data.length).toBe(2);
        expect(data[0].getId()).toBe(First_User_Id);
        expect(data[0].getName()).toBe(First_User_Name);
        expect(data[1].getId()).toBe(Second_User_Id);
        expect(data[1].getName()).toBe(Second_User_Name);
    })

})