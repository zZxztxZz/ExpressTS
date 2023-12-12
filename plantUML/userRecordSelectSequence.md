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
        recordController -> recordService:用户ID
        recordService -> recordController:该用户借书记录
        loop 每条记录
            group 联查
                recordController -> UserService:用户ID
                UserService -> recordController:用户信息
                recordController -> BookService:书本ID
                BookService -> recordController:书本信息
            end
        end
    end
recordController -> record:请求成功：用户全部记录信息
end


@enduml
```