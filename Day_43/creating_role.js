//Roles in MongoDB 
//Authentication is the process of verifying the identity of the user 
//it provide data protection

const { use } = require("react")

//to enable you use mongod -auth or in the configuration file
db.createUser({
    user: "admin",
    pwd: "admin",
    roles: [    "userAdminAnyDatabase",
        ]})
//userAdminAnyDatabase: allows the user to create and manage users on any database. This role is typically assigned to administrative users who need to manage user accounts across multiple databases.
//dbAdminAnyDatabase: allows the user to perform administrative tasks on any database, such as creating and dropping databases, managing indexes, and viewing database statistics. This role is typically assigned to users who need to perform administrative tasks across multiple databases.
//readWriteAnyDatabase: allows the user to read and write data on any database. This role is typically assigned to users who need to access and modify data across multiple databases.
//dbOwner: allows the user to have full control over a specific database, including the ability to create and manage collections, indexes, and users within that database. This role is typically assigned to users who need full control over a specific database. 
//readWrite: allows the user to read and write data on a specific database. This role is typically assigned to users who need to access and modify data within a specific database. 
//read: allows the user to read data on a specific database. This role is typically assigned to users who need to access data within a specific database but do not need to modify it.  
db.auth('admin', 'admin')

//assigning user to database
db.logout()
db.auth('admin', 'admin')
//use mydb
db.createUser({ 
    user: "John2",
    pwd: "John123",
    roles: [
        { role: "readWrite", db: "dataModelling" }
    ]
})
    db.auth('John2', 'John123')

db.employees.find()


db.createUser({ 
    user: "Mark",
    pwd: "John123",
    roles: [
        { role: "readWrite", db: "dataModelling" }
    ]
})
    db.auth('John2', 'John123')

db.employees.find()

//updating user role
db.updateUser("John2", {
    roles: [
        { role: "readWrite", db: "dataModelling" },
        { role: "dbAdmin", db: "school" }
    ]
})//updating overide the previous role
db.getUser("John2") //to get the users previleges
//creating custom role
//use test
db.createRole({
    role: "ReadWriteAndDelete",
    privileges: [{
        resource: { db: "dataModelling", collection: "" },
        actions: ["find", "insert", "update", "delete"]
    }],
    roles: ["ReadWriteNoDelete"] //inheriting from the existing role    

})

//create user 
db.createUser({
    user: "Alice",
    pwd: "Alice123",
    roles: [
        { role: "ReadWriteAndDelete"}
    ]
})