import { describe,expect,test } from "@jest/globals";
import { User } from "../../commonClasses/User";

describe("UserClass Test",()=>{
    const id="1",name="test";
    var user = new User(id,name);
    test("Set test",()=>{
        const cid="2",cname="test2";
        user.setId(cid);
        user.setName(cname);

        expect(user.getId()).toBe(cid);
        expect(user.getName()).toBe(cname);
    })
})