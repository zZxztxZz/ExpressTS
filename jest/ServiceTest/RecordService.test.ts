import { describe,expect,test } from "@jest/globals";
import { RecordService } from "../../service/RecordService";

describe("RecordService Test",()=>{
    const User_Id="1";
    const User_Name="userTest";
    const Book_Id = "1";
    const Book_Name="bookTest";

    var recordService = RecordService.getInstance();
    
    test("Add record",()=>{
        recordService.addRecord(User_Id,Book_Id);
        expect(recordService.findAllRecord()[0].getUserId()).toBe(User_Id);
        expect(recordService.findRecordByUserId(User_Id)[0].getBookId()).toBe(Book_Id);
        expect(recordService.findRecordByBookId(Book_Id)[0].getUserId()).toBe(User_Id);
    })

    test("isBookAvailable Test",()=>{
        //记录里没有该书id时可用
        recordService.deleteAllRecord();
        expect(recordService.isBookAvailable(Book_Id)).toBeTruthy();

        //记录里有该书记录但还书后可用
        recordService.addRecord(User_Id,Book_Id);
        recordService.finishReading(User_Id,Book_Id);
        expect(recordService.isBookAvailable(Book_Id)).toBeTruthy();

        //记录里有该书且未归还
        recordService.addRecord(User_Id,Book_Id);
        expect(recordService.isBookAvailable(Book_Id)).toBeFalsy();

    })
})