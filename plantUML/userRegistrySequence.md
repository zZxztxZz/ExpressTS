``` plantuml
@startuml

users -> userController:注册请求
alt 参数错误
    userController -> users:注册失败：参数错误
else 参数获取成功
    userController -> UserService:注册请求
    loop 查询已有用户ID
        UserService -> userList
        userList -> UserService
    end
    alt 用户ID存在
        UserService -> userController:注册失败：ID已存在
        userController -> users:注册失败：ID已存在
    else 用户ID不存在
        UserService -> userList:添加用户
        UserService -> userController:注册成功
        userController -> users:注册成功
    end
end
@enduml
```