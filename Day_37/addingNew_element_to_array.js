//adding new element to an array field if a document
db.employees.updateOne(
    {name:'Wren suvily'},
    {$push:{skills:{name:'designer', level:4}}}
)
//we can also push duplicate data
//pushing multiple document 
db.employees.updateOne(
    {name:'Wren suvily'},
    {$push:{skills:{
        $each: [
            {name:'Backend', level: 5}, 
            {name: 'Frontend', level:7}],
        $sort:{level:1},

    }}}
)
//if you don't want to add duplicatedata use addToSet you can only insert one document at a time 
db.employees.updateOne(
    {name:"Wren Suvily"},
    {$addToSet:{skills:{name:'designer',level: 4}}}
)
//deleting/ removing element from an array
db.employees.updateOne(
    {name:"Wren suvily"},
    {$pull:{skills:{name:"designer"}}}
)

//using pop to remove 1 element at a time 
db.employees.updateOne(
    {name:"Wren suvily"},
    {$pop:{skills: 1}}
)

//Deleting in mongoDB using deleteOne or deleteMany
db.employees.deleteMany(
    {skills:{$exists:false}}
)

db.employees.deleteMany(
    {_id: ObjectId('69873e45e50fcacf6e628ca0')}
)

// you can specify write concern
db.employees.deleteMany(
    {skills:{$exists:false}},
    {writeConcern:{w:1, j:true, wtimeout:5000}}) // you can't specify write concern in READ operation but you can use it in create,update,and delete

//you can delete all the document in a collection useing 
db.employees.deleteMany([])


//understanding index

db.users.createIndex(
    {Age: 1}
)
//to drop an index
db.users.dropIndex(
    {Age:1}
)
//to get the list of the index there's a default index on the _id field
db.users.getIndexes()

//creating a compound interest i.e creating index on two or more field

db.users.createIndex(
    {Age: 1, Gender:1}
)

db.users.explain().find({Age:{$gte:40}, Gender:"Male"})

//using Index for sorting
 db.users.explain().find({Age:{$gte:40}}).sort({Gender:1}) 
 //creating a unique index i.e index on _id
 db.users.createIndex({Email:1}, {unique:true})

 db.users.insertOne({
  _id: ObjectId('698c99fc109adbd44d21b516'),
  Name: 'Sophia Garcia',
  Age: 43,
  Gender: 'Non-binary',
  Email: 'sophia.garcia.097f8f84@example.com',
  Location: {
    Street: '6030 High St',
    Country: 'Australia',
    City: 'Berlin',
    Pin: 698468
  },
  Hobbies: [ 'gardening', 'traveling', 'gaming', 'writing' ],
  OtherFields: {
    Occupation: 'Artist',
    MaritalStatus: 'Single',
    Preferences: { FavoriteColor: 'Purple', MusicGenre: 'Blues' }
  }
})// this will throw an error because i'm using same email which i already made email unique
//partial Index

db.users.createIndex(
    {age:1},
    {partialFilterExpression:{age:{$gte:30}}}
)
//or
db.users.createIndex(
    {Age:1},
    {partialFilterExpression:{Gender:"Male"}}
)

db.users.createIndex(
    {Email:1},
    {unique:true,partialFilterExpression:{Email:{$exists:true}}}
)

db.users.insertOne({
  _id: ObjectId('698c99fc109adbd44d21b516'),
  Name: 'Sophia Garcia 3',
  Age: 43,
  Gender: 'Non-binary',
  Email: 'sophia1.garcia.097f8f84@example.com',
  Location: {
    Street: '6030 High St',
    Country: 'Australia',
    City: 'Berlin',
    Pin: 698468
  },
  Hobbies: [ 'gardening', 'traveling', 'gaming', 'writing' ],
  OtherFields: {
    Occupation: 'Artist',
    MaritalStatus: 'Single',
    Preferences: { FavoriteColor: 'Purple', MusicGenre: 'Blues' }
  }
})

//Time to live
