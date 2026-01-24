//To find all books in a specific genre
db.books.find({"Self-Help"})
//To find all books published after the year 1999
db.books.find({published_year:{$gt:1999}})
//To find books by a specific author
db.books.find({author:"Andrew Hunt"})
db.books.find({author:"Robert C. Martin"})
//To update the price of a specific book
db.books.updateOne({title:"Clean Code"},{$set:{price:48}})
db.books.updateOne({author:"Andrew Hunt"},{$set:{price:51}})
//To delete a book by its title
db.books.deleteOne({title:"Deep Work"})


// Advanced Queries
//A query to find books that are both in stock and published after 2010
db.books.find({in_stock:true,published_year:{$gt:2010}})
//A projection to return only the title, author, and price fields in your queries
db.books.find({}, {title:1, author:1, price:1, _id:0})
//Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({price:1}) // Ascending
db.books.find().sort({price:-1}) // Descending
//Limit and skip methods to implement pagination (5 books per page)
db.books.find().skip(0).limit(5) // Page 1

//An aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  {
    $group: { _id: "$genre", averagePrice: { $avg: "$price" } }
  }
])
//An aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, author: "$_id", bookCount: 1 } }
])
//A pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {  
      _id: { 
        $concat: [
          { $toString: { $subtract: [ "$published_year", { $mod: [ "$published_year", 10 ] } ] } }, 
          "s"
        ] 
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])
//To create an index on the title field for faster searches
db.books.createIndex({title:1})
//Create a compound index on author and published_year
db.books.createIndex({author:1, published_year:-1})
//Using the explain() method to demonstrate the performance improvement with your indexes
db.books.find({title:"Clean Code"}).explain("executionStats")
db.books.find({author:"Andrew Hunt", published_year:1999}).explain("executionStats")