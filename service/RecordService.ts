import { Record } from "../commonClasses/Record"
export class RecordService{
    recordList:Array<Record>;
    private static instance:RecordService;

    constructor(){
        this.recordList = new Array<Record>();
    }

    public static getInstance():RecordService{
        if(!this.instance){
            this.instance = new RecordService();
        }
        return this.instance
    }

    addRecord(userId:string,bookId:string){
        this.recordList.push(new Record(userId,bookId));
    }

    isBookAvailable(bookId:string):boolean{
        for(var record of this.recordList){
            if(record.getBookId()===bookId && !record.available())return false;
        }
        return true;
    }

    findRecordByBookId(bookId:string):Array<Record>{
        var result = new Array<Record>();
        for(var record of this.recordList){
            if(record.getBookId()===bookId)result.push(record);
        }
        return result;
    }

    findRecordByUserId(userId:string):Array<Record>{
        var result = new Array<Record>();
        for(var record of this.recordList){
            if(record.getUserId()===userId)result.push(record);
        }
        return result;
    }

    findAllRecord():Array<Record>{
        return this.recordList;
    }
}