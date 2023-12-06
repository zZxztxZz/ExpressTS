import { Book } from "../commonClasses/Book";
import { BOOK_ADD_WITH_SAME_ID, BOOK_ID_NOT_IN_LIST } from "../utils/Code";
import { Message } from "../utils/Message";

export class BookService{
    private static instance:BookService;
    bookList:Array<Book>;

    constructor(){
        this.bookList=new Array<Book>();
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new BookService();
        }
        return this.instance;
    }

    addBook(bookAdd:Book):Message{
        for(var book of this.bookList){
            if(book.getId()===bookAdd.getId()){
                return Message.fail(BOOK_ADD_WITH_SAME_ID);
            }
        }
        this.bookList.push(bookAdd);
        return Message.success();
    }

    selectAll():Message{
        return Message.success(this.bookList)
    }

    selectBookById(bookId:string):Message{
        for(var book of this.bookList){
            if(book.getId()===bookId){
                return Message.success(book)
            }
        }
        return Message.fail(BOOK_ID_NOT_IN_LIST)
    }
}