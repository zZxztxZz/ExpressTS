export class User{
    id:string;
    name:string
    constructor(id:string,name:string){
        this.id=id;
        this.name=name;
    }
    getId():string{
        return this.id;
    }
    getName():string{
        return this.name;
    }
    setId(id:string):void{
        this.id=id
    }
    setName(name:string):void{
        this.name=name
    }
}