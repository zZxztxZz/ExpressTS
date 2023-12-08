import { describe,expect,test } from "@jest/globals";
import { Message, Status } from "../../utils/Message";
describe("Message Test",()=>{
    test("Message constructor test",()=>{
        var message = new Message(Status.OK);
        expect(message.getMessage()).toBe("");
    })

    test("Create condition  message",()=>{
        var message = Message.condition();
        var messageWithM = Message.condition("test");
        
        expect(message.getStatus()).toBe(3);
        expect(message.getMessage()).toBe("something happened");

        expect(messageWithM.getMessage()).toBe("test");
    })
})