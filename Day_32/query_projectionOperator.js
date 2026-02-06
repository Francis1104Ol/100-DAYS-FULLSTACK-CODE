//COMAPRISON OPERATORS
//$eq equal to 
db.products.find({price: {$eq: 100}})
//$ne not equal to
db.products.find({price: {$ne: 100}})
//$lt less than
db.products.find({price: {$lt: 100}})
//$lte less than or equal to
db.products.find({price: {$lte: 100}})
//$gt greater than
db.products.find({price: {$gt: 100}})
//$gte greater than or equal to
db.products.find({price: {$gte: 100}})
// $in
db.products.find({category: {$in: ["electronics", "clothing"]}})   

// $nin not in 
db.products.find({category: {$nin: ["electronics", "clothing"]}})
//LOGICAL OPERATORS
//$and
  db.products.find({$and:[{ratings:{$gt:4}},{price:{$gt:100}}]})
//$or
db.products.find({$or: [{category: "electronics"},
     {category: "clothing"}]})
//$not
db.products.find({price: {$not: {$gt: 100}}})
//$nor
db.products.find({$nor: [{category: "electronics"},
     {category: "clothing"}]})

//ELEMENT OPERATORS if a field exists or not and type of field
//$exists
db.products.find({discount: {$exists: true}})
//$type
db.products.find({price: {$type: "double"}})