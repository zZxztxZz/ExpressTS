import { formatTime } from "../utils/formatTime";

export class Record{
    userId:string;
    bookId:string;
    startTime:string;
    endTime:string;
    finished:boolean;
    constructor(userId:string,bookId:string,startTime:string=formatTime.getTime()){
        this.userId=userId;
        this.bookId=bookId;
        this.startTime=startTime;
        this.endTime="";
        this.finished=false;
    }

    finishReading():void{
        this.finished=true;
        this.endTime=formatTime.getTime();
    }
    
    getUserId():string{
        return this.userId;
    }

    getBookId():string{
        return this.bookId;
    }

    available():boolean{
        return this.finished;
    }

}