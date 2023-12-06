export class Book{
    id:string;
    bookName:string
    constructor(id:string,bookName:string){
        this.id=id;
        this.bookName=bookName;
    }
    getId():string{
        return this.id;
    }
    getbookName():string{
        return this.bookName;
    }
    setId(id:string):void{
        this.id=id
    }
    setbookName(bookName:string):void{
        this.bookName=bookName
    }
}