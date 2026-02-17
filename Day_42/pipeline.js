//limit the number of documents from the input set and passes the remaining document to the next stage i.e the number of document to skip 
db.employees.aggregate([
    {$project:{_id:0, firstname:1, birthDate:{$toDate:"$dob"}}},
    {$sort:{birthDate:1}},
    {$skip:10},
    {$limit:10}// only fetch the 10 employees
])
//writing pipeline result into a collection using $out
db.employees.aggregate([
    {$project:{_id:0, firstname:1, birthDate:{$toDate:"$dob"}}},
    {$sort:{birthDate:1}},
    {$skip:10},
    {$limit:10},
    {$out:"olderpeople"} // this create a new collection and put the result in it 
])
//geoNear stage is use to queary geoSpatial data
db.places.aggregate([
    {$geoNear:{
        near:{type:"point", coordinates:[ 7.48596, 9.03684]},
        maxDistance:300,
        distanceField:"distance"
    }}
])

//$lookup stageis use to perform left outer join to another collection in the same database
db.users.aggregate([
    {$lookup:{
        from:'orders',
        localField:'_id',
        foreignField:'user_id',
        as: 'user_orders'
    }},
    {$unwind:"$user_orders"},
    {$lookup:{
        from:'products',
        localField:'user_orders.product_id',
        foreignField: '_id',
        as:'product_details'
    }},
    {$unwind:'$product_details'},
    {$project:{
        _id:0, 
        name:1,
        email:1,
        order_id:"$user_orders._id",
        order_date: "$ud=ser_orders.order_date",
        product_name:"$product_details.name",
        product_price:"$product_details.price"
    }}
])

//$count stage is use to count the number of documents that pass through the aggregation pipeline up to that stage 

db.employees.aggregate([
    {$count:'total_employees'}
])
//for number of male employees
db.employees.aggregate([
    {$match:{gender:'male'}},
    {$count:'total_employees'}
])

//to group based on country 
db.employees.aggregate([
    {$group:{_id:{country:'$address.country'}}},
    {$count:'total_employees'}
])

//adding fields using addFields stage add new fields to document or overide or modify existing documents
db.students.insertMany([
    {name:'Alice', score:85, total:150},
    {name:'Bob', score:72, total:200}
])

db.students.aggregate([
    {$addFields:{status:'active'}}
])

db.students.aggregate([
    {$addFields:{
        percentage:{$multiply:[{$divide:["$score", "$total"]},100]}
    }},
])

db.students.aggregate([
    {$addFields:{
        score:{$add:["$score", 5]}
    }}
])
//working with integers
db.test.insertOne({name:'John', age:NumberInt(22)})
//minimum and maximum value int 32 can store -2147483648 to 2147483648
db.test.insertOne({name:'John', age:NumberInt(2147483648)})
//minimum and maximum value int 64 can store
db.test.insertOne({name:'John', age:NumberLong(22)})

//math operations
db.test.insertOne({name:'John', age:NumberInt(10)})
db.test.updateOne({}, {$inc: {age:5}})
//to store as an integer 
db.test.insertOne({name:'John', age:NumberInt(10)})
db.test.updateOne({}, {$inc: {age:NumberInt(5)}})
//same works for numberlong
db.test.insertOne({name:'Joy', age:NumberLong('12345678999810')})
db.test.updateOne({}, {$inc: {amount:NumberLong('-5')}})
//working with floating numbers
db.test.insertOne({num1:0.1, num2:0.3})
db.test.aggregate([{
    $project:{
        result:
        {$subtract: ['$num1', '$num2']}
}}])


db.test.insertOne({num1:NumberDecimal('0.1'), num2:NumberDecimal('0.3')})
db.test.aggregate([{
    $project:{
        result:
        {$subtract: ['$num1', '$num2']}
}}])
