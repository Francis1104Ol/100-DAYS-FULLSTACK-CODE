// {
//   "_id": "65d1a7c4e91b",
//   "name": "Inception",
//   "rating": 8.8,
//   "year": 2010
// }
db.movies.insertOne({
  name: "Interstellar",
  rating: 8.6,
  year: 2014
})
db.movies.insertMany([
  { name: "Inception", rating: 8.8 },
  { name: "Tenet", rating: 7.5 }
])
db.movies.find()
db.movies.find({ rating: { $gt: 8 } })
db.movies.find({}, { name: 1, rating: 1 })

db.movies.updateOne(
  { name: "Tenet" },
  { $set: { rating: 7.8 } }
)
db.movies.deleteOne({ name: "Tenet" })