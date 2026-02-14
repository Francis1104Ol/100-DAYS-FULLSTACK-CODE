//match stage allow you to select certain element that satisfy some specified requirements
db.employees.aggregate(
    [
        {$match: {gender:'male'}},
        {$match:{"address.country":"usa"}}
    ]
)
//Grouping document using $group is use to group documents by one or more fields and then apply aggregations to the grouped data 
db.employees.aggregate([
    {$match: {gender:"male"}},
    {$group:{_id:{country: "$address.country"}, total:{$sum:1}}},
    {$sort:{total:-1}}
])

//projecting Documents using $project stage is use to reshape and restructure documents
db.employees.aggregate([
    {$project:
        {_id:0,
            name:{$concat:["$firstname", "", "$lastname"]},
      gender:1, 
      email:1}}
])