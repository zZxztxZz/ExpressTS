``` plantuml
@startuml

users -> userController:查询全部用户请求
userController -> UserService:查询全部
UserService -> userList:获取全部
userList->UserService:全部用户信息
UserService -> userController:获取成功：全部用户信息
userController ->users:获取成功：全部用户信息

@enduml
```