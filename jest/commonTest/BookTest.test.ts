import { describe,expect,test } from "@jest/globals";
import { Book } from "../../commonClasses/Book";

describe("BookClass Test",()=>{
    const id="1",name="test";
    var book = new Book(id,name);
    test("Set test",()=>{
        const cid="2",cname="test2";
        book.setId(cid);
        book.setbookName(cname);

        expect(book.getId()).toBe(cid);
        expect(book.getbookName()).toBe(cname);
    })
})