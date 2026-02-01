db.manipulate.insertOne({
  name: "Francis",
  role: "Backend Developer",
  skills: ["MongoDB", "Node.js", "JavaScript"]
})
db.users.updateOne(
  { name: "Francis" },
  { $push: { skills: "Express.js" } }
)
db.users.find({ skills: "MongoDB" })


//embedded documents
db.manipulate.insertOne({
  name: "Taiwo",
  email: "taiwo@gmail.com",
  address: {
    street: "Main Road",
    city: "Lagos",
    country: "Nigeria"
  }
})

db.manipulate.find({ "address.city": "Lagos" })


db.manipulate.insertOne({
  customerName: "John Doe",
  items: [
    { product: "Laptop", quantity: 1, price: 1200 },
    { product: "Mouse", quantity: 2, price: 25 }
  ],
  status: "pending"
})
db.manipulate.find({ "items.product": "Laptop" })
db.manipulate.insertMany([
  {
    title: "Learning MongoDB",
    content: "Today I learned about embedded documents",
    userId: ObjectId("65abc111111111111111111")
  },
  {
    title: "Day 27 Progress",
    content: "Worked on MongoDB relationships",
    userId: ObjectId("65abc111111111111111111")
  }
])

db.manipulate.find({
  userId: ObjectId("65abc111111111111111111")
})

db.manipulate.insertOne({
  name: "Francis",
  posts: [
    { title: "MongoDB Basics", likes: 10 },
    { title: "Data Modeling", likes: 15 }
  ]
})