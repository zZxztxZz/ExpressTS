import { Request,Response } from "express";

class UserController{
    //注册
    register = async(req:Request,res:Response)=>{
        res.send("Hello")
    }

    //查看
    listAll = async(req:Request,res:Response)=>{
        res.send("Hello")
    }
}

export const userController = new UserController();