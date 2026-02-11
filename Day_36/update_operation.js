
// first update the employees collections
db.employees.insertMany([
  {
    name: "Sylvie Destitude",
    age: 35,
    skills: [
      { name: "developer", level: 3 },
      { name: "mongodb", level: 2 },
      { name: "ui-design", level: 1 }
    ]
  },
  {
    name: "Wren suvily",
    age: 28,
    skills: [
      { name: "developer", level: 2 },
      { name: "nodejs", level: 3 }
    ]
  },
  {
    name: "Daisy Tomsy",
    age: 40,
    skills: [
      { name: "teacher", level: 4 },
      { name: "developer", level: 1 }
    ]
  }
])


//elemMatch 
db.employees.find(
    {skills:
        {$elemMatch:
            {name:"developer", level:{$gt: 2}
        }
    }
}
)
//updating all thee element in the array 
db.employees.updateMany(
    {$and:[{age: {$gt:32}}, {skills:{$exists:true}}]},
    {$inc:{"skills.$[].level":1}}
)

//updating all matching array elements
db.employees.find({"sklls.level":{$gte:2}})


db.employees.updateMany(
  { age: { $gt: 32 }, skills: { $exists: true } },
  { $inc: { "skills.$[].level": 1 } }
)
db.employees.find({ "skills.level": { $gte: 2 } })

//) Update ONLY matching array elements using $[ ] + arrayFilters
db.employees.updateMany(
  { "skills.level": { $gte: 2 } },
  { $inc: { "skills.$[skill].level": 1 } },
  { arrayFilters: [{ "skill.level": { $gte: 2 } }] }
)
//Increase ONLY the “developer” skill level
db.employees.updateMany(
  { "skills.name": "developer" },
  { $inc: { "skills.$[skill].level": 1 } },
  { arrayFilters: [{ "skill.name": "developer" }] }
)
//Update only the FIRST matching array element
db.employees.updateOne(
  { name: "Wren", "skills.name": "developer" },
  { $set: { "skills.$.level": 10 } }
)
