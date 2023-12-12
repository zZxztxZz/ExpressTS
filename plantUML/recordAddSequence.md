``` plantuml
@startuml
record -> recordController:获取用户借书记录请求
alt 参数错误
    recordController -> record:请求失败：参数错误
else 参数正确
    recordController -> UserService:用户ID
    alt 用户ID不存在
        UserService -> recordController:失败：用户ID不存在
        recordController ->record:请求失败：用户ID不存在
    else 用户ID存在
        UserService -> recordController:成功：用户信息
        recordController -> BookService:书本ID
        alt 书本ID不存在
            BookService -> recordController:失败：书本ID不存在
            recordController -> record:请求失败：书本ID不存在
        else 书本ID存在
            BookService -> recordController:成功：书本信息
            recordController -> RecordService:书本ID
            alt 书本不可用
                RecordService -> recordController:书本不可用
                recordController -> record:请求失败：书本不可用
            else 书本可用
                RecordService -> recordController:书本可用
                recordController -> RecordService:用户ID、书本ID
                recordController ->record:请求成功：添加成功
        end
    end
end
@enduml
```