import { Request,Response } from "express";
import { UserService } from "../service/UserService";
import { User } from "../commonClasses/User";
import { Message } from "../utils/Message";
import { PARMS_ERROR } from "../utils/Code";

class UserController{

    service = new UserService();

    //注册
    register = async(req:Request,res:Response)=>{
        var userId = req.body.id;
        var userName = req.body.name;
        if(userId===undefined||userName===undefined){
            return res.status(400).send(Message.fail(PARMS_ERROR));
        }

        var message = this.service.addUser(new User(userId,userName));
        res.status(message.getStatus()===0?200:400).send(message);
    }

    //查看全部
    listAll = async(req:Request,res:Response)=>{
        var message = this.service.selectAll();
        res.status(message.getStatus()===0?200:400).send(message);
    }

    //通过id查找
    selectUserById = async(req:Request,res:Response)=>{
        var userId = req.params.id
        var message = this.service.selectUserById(userId)
        res.status(message.getStatus()===0?200:400).send(message);
    }
}

export const userController = new UserController();