import { USER_ADD_WITH_SAME_ID, USER_ID_NOT_IN_LIST } from "../utils/Code";
import { Message } from "../utils/Message";
import { User } from "../commonClasses/User";

export class UserService{
    userList:Array<User>;
    private static instance:UserService;

    constructor(){
        this.userList=new Array<User>();
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new UserService();
        }
        return this.instance;
    }

    addUser(userAdd:User):Message{
        for(var user of this.userList){
            if(user.getId()===userAdd.getId()){
                return Message.fail(USER_ADD_WITH_SAME_ID);
            }
        }
        this.userList.push(userAdd);
        return Message.success();
    }

    selectAll():Message{
        return Message.success(this.userList);
    }

    selectUserById(userId:string):Message{
        for(var user of this.userList){
            if(user.getId()===userId){
                return Message.success(user)
            }
        }
        return Message.fail(USER_ID_NOT_IN_LIST)
    }
}