import { describe,expect,test } from "@jest/globals";
import { BookService } from "../service/BookService";
import { Book } from "../commonClasses/Book";
import { BOOK_ADD_WITH_SAME_ID } from "../utils/Code";
describe("BookService Test",()=>{
    var service:BookService;
    const First_Book_Id = "1";
    const First_Book_Name = "haha";
    const Second_Book_Id = "2";
    const Second_Book_Name = "wuwu";



    beforeAll(()=>{
        console.log("初始化Servce");
        service=BookService.getInstance();
    })


    //测试添加书本的返回是否成功
    test(`Add id:${First_Book_Id} bookName:${First_Book_Name}`,()=>{
        var message = service.addBook(new Book(First_Book_Id,First_Book_Name));
        console.log(message);
        expect(message.getStatus()).toBe(0);
    })

    //测试添加的书本信息是否正确
    test(`Find book by Id:${First_Book_Id}`,()=>{
        var message = service.selectBookById(First_Book_Id);
        console.log(message);
        expect(message.getStatus()).toBe(0);
        expect(message.getData().getId()).toBe(First_Book_Id);
        expect(message.getData().getbookName()).toBe(First_Book_Name);
    })

    //测试添加重复id是否检测
    test(`Add id:${First_Book_Id} again`,()=>{
        var message = service.addBook(new Book(First_Book_Id,Second_Book_Name));
        console.log(message);
        expect(message.getStatus()).toBe(1);
        expect(message.getMessage()).toBe(BOOK_ADD_WITH_SAME_ID);
    })

    //测试添加不同id的书
    test(`Add id:${Second_Book_Id} bookName:${Second_Book_Name}`,()=>{
        var message = service.addBook(new Book(Second_Book_Id,Second_Book_Name));
        console.log(message);
        expect(message.getStatus()).toBe(0);
    })

    //测试查询所有书本
    test("Find all book",()=>{
        var message = service.selectAll();
        console.log(message);
        expect(message.getStatus()).toBe(0);
        var data = message.getData();
        expect(data.length).toBe(2);
        expect(data[0].getId()).toBe(First_Book_Id);
        expect(data[0].getbookName()).toBe(First_Book_Name);
        expect(data[1].getId()).toBe(Second_Book_Id);
        expect(data[1].getbookName()).toBe(Second_Book_Name);
    })

})