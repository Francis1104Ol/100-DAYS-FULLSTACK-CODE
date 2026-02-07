//eveluation operators in mongoDB
//$mod : returns the remainder of a division operation
db.collection.find({ field: { $mod: [ divisor, remainder ] } })
db.products.find({ price: { $mod: [ 7, 2 ] } })
//$regex : performs regular expression pattern matching
db.collection.find({ field: { $regex: /pattern/ } })
db.products.find({ name: { $regex: /apple/i } }) // the 'i' flag makes the search case-insensitive
db.products.find({ name: { $regex: /apple/i$} }) //$ matches the end of the string
//$epr : evaluates a JavaScript expression and returns the documents that match the expression 
db.collection.find({ $expr: { $gt: [ "$field1", "$field2" ] } })
db.products.find({
     $expr: {
     $gt: [
        { $subtract: ["$price", "$discount"]}, 
        100]
     }
})

//so i want to create new collection called employees and insert some documents into it
db.employees.insertMany([
  {
    name: "Jordan Blake",
    age: 28,
    skills: [
      { name: "JavaScript", level: "Intermediate" },
      { name: "MongoDB", level: "Beginner" }
    ],
    hobbies: ["Gaming", "Reading"]
  },
  {
    name: "Ava Mitchell",
    age: 32,
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" }
    ],
    hobbies: ["Cooking", "Traveling"]
  },
  {
    name: "Noah Carter",
    age: 25,
    skills: [
      { name: "Python", level: "Intermediate" },
      { name: "SQL", level: "Advanced" }
    ],
    hobbies: ["Photography", "Cycling"]
  }
])

//to access the skills you need to access the name property of the skills array
db.employees.find({ "skills.name": "JavaScript" }) // this will return the document of Jordan Blake
db.employees.find({ "skills.name": "React" }) // this will return the document of Ava Mitchell
db.employees.find({ "skills.name": "Python" }) // this will return the document of Noah Carter
//size operator to find documents where the skills array has a specific number of elements
//wants to filter employees whose size of hobbies array is 3
db.employees.find({ hobbies: { $size: 3 } }) // this will return an empty array because none of the documents have 3 hobbies
//wants to filter employees whose size of hobbies array is 2
db.employees.find({ hobbies: { $size: 2 } }) // this will return all the documents because all of them have 2 hobbies


//$all : matches if all elements of an array satisfy the specified condition
//wants to filter employees who have both "Gaming" and "Reading" as hobbies withouth caring about the order of the hobbies
db.employees.find({ hobbies: { $all: ["Gaming", "Reading"] } }) // 
//will add new employee with hobbies "Reading" and "Gaming" to test the $all operator
db.employees.insertOne({
  name: "Emily Davis",
    age: 30,
    skills: [
      { name: "Java", level: "Intermediate"},
      { name: "Spring", level: "Beginner" }
    ],
    hobbies: ["Reading", "Gaming"]
})  

db.employees.insertOne({
  name: "Emily Davido",
    age: 30,
    skills: [
      { name: "Java", level: 2},
      { name: "Spring", level: 4}
    ],
    hobbies: ["Reading", "Gaming"]
}) 

//$elemMatch : matches documents that contain an array field with at least one element that matches all the specified query criteria
//wants to filter employees who have at least one skill with name "JavaScript" and level "Intermediate"
db.employees.find({ skills: { $elemMatch: { name: "JavaScript", level: "Intermediate" } } })
db.employees.find(
    {$and: [
        {"skills.name": "java"},
        {"skills.level": {$gte: 3}}
      ]
    }
  )



  db.employees.insertOne({
  name: "Bamboy David",
    age: 30,
    skills: [
      { name: "Java", level: 3},
      { name: "Spring", level: 4}
    ],
    hobbies: ["Reading", "Gaming"]
}) 



db.employees.find({ skills: { $elemMatch: { name: "JavaScript", level: "Intermediate" } } })

//going back to cursor using next and forEach method and sort

//pagination i.e skip and limit
