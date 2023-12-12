``` plantuml
@startuml
record -> recordController:获取全部记录请求
recordController -> RecordService:获取全部记录
RecordService -> recordController:全部记录
loop 每条记录
    group 联查
        recordController -> UserService:用户ID
        UserService -> recordController:用户信息
        recordController -> BookService:书本ID
        BookService -> recordController:书本信息
    end
end
recordController -> record:请求成功：全部记录信息

@enduml
```