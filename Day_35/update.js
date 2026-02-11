//Update method
db.employees.updateOne({_id: ObjectId('698730423fddaf4d7e628ca1')},
{$set:{hobbies:["Sport","Reading"]}}
)// if i run it again with the same query mongoDB won't update it because it already exist

//this update the document with a new field isDeveloper
db.employees.updateMany({"skills.name":"Java"},
    {$set: {isDeveloper:true}}
)

db.products.updateOne({_id:ObjectId('6984856f614a3f1bf2628ca0')},
{$set: {price:899, availaible: true, discount:10}}
   
)
ObjectId('6984856f614a3f1bf2628ca0')

db.products.updateOne({_id:ObjectId('6984858b614a3f1bf2628ca1')},
{$set: {price:899, availaible: true, discount:10}}
   
)

//increment operator $inc is use to increase or decrease a number field 
db.products.updateOne({_id:ObjectId('6984858b614a3f1bf2628ca1')},
{$inc:{price:100}}
)
db.products.updateOne({_id:ObjectId('6984858b614a3f1bf2628ca1')},
{$inc:{price:-200}}
)
db.products.updateOne({_id:ObjectId('6984858b614a3f1bf2628ca1')},
{$inc:{price:-200}, $set:{availaible:false}}
)

//min, max opeerator: 
//min example only works if the existing value is greater than the updated value
db.employees.updateOne({name: 'Bamboy David'},
    {$min:{age: 29}}
)

//Max example this only works if the specified value is greater than the current value
db.employees.updateOne({name: 'Bamboy David'},
    {$max:{age: 34}}
)
//mul operator :multiply
db.products.updateOne({_id:ObjectId('6984858b614a3f1bf2628ca1')},
{$mul:{discount:2}}
)

//Removing and Renaming a field in MongoDB
// removing a field using unset operator
db.employees.updateOne(
 {_id: ObjectId('69873e45e50fcacf6e628ca0')} ,
 {$unset:{age: ""}} 
)

//Rename
db.products.updateMany(
    {}, // this filter all the object
    {$rename:{discount:'totalDiscount'}}
)

//understanding Upsert this is a combine operation of insert and update 
//if a given document exist it just update but it=f it doesn't it create
 db.employees.updateOne({_id: ObjectId('69873e45e50fcacf6e628ca0')},
    {$set:{age:32}}

 )


  db.employees.updateOne(
    {name:'Josh Acheampon'},
    {$set:{age:32, hobbies:['Football', 'Singing']}},
    {upsert:true}
    
 )


 db.employees.updateMany(
    {"skills.level": {$gte:2}},
    {$set:{"skills.level.$[el].expert":true}},
    {arraFilters:[{"el.level":{$gte:6}}]}
 )