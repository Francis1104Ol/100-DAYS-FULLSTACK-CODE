//Transformation of data
db.employees.aggregate([
    {$project:{
        _id:0, firstname:1, email:1,
        location:{type: "point", coordinates:[
           {$convert:{input: "$address.location.coordinates.long",to:'double',onError:0.00,onNull:0.00}},
             {$convert:{input: "$address.location.coordinates.lat",to:'double',onError:0.00,onNull:0.00}}
        ]}
    }}
])
//converting the string value f date of birth to date and time
db.employees.aggregate([
    {$project:{
        _id:0, firstname:1, email:1,
        dob: 1
        }}
])

db.users.aggregate([
    {$project:{
        _id:0, firstname:1, email:1,
        birthdate: {$convert:{input:"$dob", to: "date"}}
        }}
])
//Unwinding Arrays
db.employees.aggregate([
  { $unwind: "$skills" },
  {
    $group: {
      _id: "$address.country",
      totalSkills: { $sum: 1 }
    }
  },
  { $sort: { totalSkills: -1 } }
])



db.employees.aggregate([
  {
    $group: {
      _id: "$address.country",
      totalEmployees: { $sum: 1 }
    }
  },
  { $sort: { totalEmployees: -1 } }
])


//using Projection with array fields
db.employees.aggregate([
    {$project:{
        _id:0,
        firstname:1,
        skill: {$slice:[["$skills"], 0, 1]}


    }}
])
// to get the skills count 
db.employees.aggregate([
    {$project:{
        _id:0,
        name:1,
        skillCount: {$size:"$skills"}


    }}
])


db.employees.aggregate([
    {$project:{
        _id:0,
        name:1,
        email:1,
        skills: {$filter:{
            input:"$skills",
            as:'al',
            cond:{$gte:['$$al.level', 7]}
        }}


    }}
])

//$bucket stage 
db.employees.aggregate([
    {$project:{_id:0, firstname:1, birthYear:{$isoWeekYear:{toDate:"$dob"}}}}
])