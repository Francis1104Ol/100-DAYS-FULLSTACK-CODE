//projections operators in mongoDB
db.products.find({},
    { name: 1, email: 1 }
)

db.products.find(
  {},
  { _id: 0, name: 1, email: 1 }
)

db.products.find(
  {},
  { password: 0 }
)

db.products.find(
  { category: "electronics" },
  { name: 1, price: 1, _id: 0 }
)

db.users.find(
  {},
  { name: 1, "address.city": 1, _id: 0 }
)


db.users.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      city: "$address.city"
    }
  }
])
//projection in mongoDB is simply telling mongoDB the set of result you want it to return 
db.products.find({category: "laptop"}, {name:1, price:1, "category.$":1})

//$elemMatch
db.product.find({category:"electronics"},
  {
    name:1,
    price: 1,
    _id: 0,
    category:{$elemMatch:{$eq:laptop}}
  }
)

//$slice operatoruse to select specific range of element from an array
db.products.find({},{
  name:1, price:1,
  category:{$slice:[1, 1]}
}
)