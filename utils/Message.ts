import { formatTime } from "./formatTime";

export class Message{
    status:Status
    message:string;
    data:any;
    time:string;



    constructor(status:Status,message:string="",data:any=undefined){
        this.status=status;
        this.message=message;
        this.data=data;
        this.time=formatTime.getTime()
    }
    getStatus():Status{
        return this.status;
    }

    getMessage():string{
        return this.message;
    }

    getData():any{
        return this.data;
    }

    static success(data:any=undefined):Message{
        return new Message(Status.OK,"Success!",data);
    }

    static fail(message:string="Something went wrong",data:any=undefined):Message{
        return new Message(Status.Error,message,data)
    }

    static condition(message:string="something happened",data:any=undefined):Message{
        return new Message(Status.CONDITION,message,data);
    }


}

export enum Status{
        OK,Error,WARNING,CONDITION
}