db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalSpent: {
        $sum: { $multiply: ["$price", "$quantity"] }
      }
    }
  },
  {
    $sort: { totalSpent: -1 }
  }
])

db.orders.aggregate([
  {
    $match: { category: "Electronics" }
  },
  {
    $project: {
      item: 1,
      price: 1,
      quantity: 1,
      total: { $multiply: ["$price", "$quantity"] },
      _id: 0
    }
  }
])
db.orders.createIndex({ userId: 1 })
db.orders.createIndex({ category: 1, price: -1 })
db.orders.find({ category: "Electronics" }).explain("executionStats")
{
  _id: 1,
  name: "John",
  orders: [
    { item: "Laptop", price: 1200 },
    { item: "Mouse", price: 25 }
  ]
}


// users collection
{
  _id: 1,
  name: "John"
}

// orders collection
{
  userId: 1,
  item: "Laptop",
  price: 1200
}



const pipeline = [
  {
    $group: {
      _id: "$category",
      totalSales: { $sum: "$price" }
    }
  }
];

const result = await db.collection("orders").aggregate(pipeline).toArray();
console.log(result);


db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price"],
      properties: {
        name: { bsonType: "string" },
        price: { bsonType: "number", minimum: 0 }
      }
    }
  }
})
