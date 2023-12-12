``` plantuml
@startuml

users -> userController:查询请求
alt 参数错误
    userController -> users:查询失败：参数错误
else 参数获取成功
    userController -> UserService:用户ID
    loop 查询已有用户ID
        UserService -> userList
        userList -> UserService
    end
    alt 用户ID不存在
        UserService -> userController:查询失败：用户不存在
        userController -> users:查询失败：用户不存在
    else 用户ID存在
        userList -> UserService:用户信息
        UserService -> userController:查询成功：用户信息
        userController -> users:查询成功：用户信息
    end
end
@enduml
```