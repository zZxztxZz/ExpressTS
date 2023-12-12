@startuml
entity "User" as user {
  + id : string
  + name : string
}

entity "Book" as book {
  + id : string
  + bookName : string
}

entity "Record" as record{
  + userId : string
  + bookId : string
  + startTime : string
  + endTime :  string
  + finished : boolean
}

user ||--o{ record : has
book ||--o{ record : has

@enduml
