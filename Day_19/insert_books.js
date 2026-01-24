const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/" // 
const client = new MongoClient(uri);

async function insertBooks() {
  try {
    await client.connect();

    const db = client.db("plp_bookstore");
    const booksCollection = db.collection("books");

    const books = [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Programming",
        published_year: 2008,
        price: 45,
        in_stock: true,
        pages: 464,
        publisher: "Prentice Hall"
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        genre: "Programming",
        published_year: 1999,
        price: 50,
        in_stock: true,
        pages: 352,
        publisher: "Addison-Wesley"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        published_year: 2018,
        price: 30,
        in_stock: true,
        pages: 320,
        publisher: "Avery"
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Productivity",
        published_year: 2016,
        price: 35,
        in_stock: false,
        pages: 304,
        publisher: "Grand Central Publishing"
      },
      {
        title: "You Don’t Know JS",
        author: "Kyle Simpson",
        genre: "Programming",
        published_year: 2015,
        price: 40,
        in_stock: true,
        pages: 278,
        publisher: "O'Reilly Media"
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        published_year: 1988,
        price: 20,
        in_stock: true,
        pages: 208,
        publisher: "HarperOne"
      },
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Psychology",
        published_year: 2011,
        price: 38,
        in_stock: false,
        pages: 512,
        publisher: "Farrar, Straus and Giroux"
      },
      {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        genre: "Finance",
        published_year: 1997,
        price: 25,
        in_stock: true,
        pages: 336,
        publisher: "Plata Publishing"
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        genre: "Programming",
        published_year: 2018,
        price: 42,
        in_stock: true,
        pages: 472,
        publisher: "No Starch Press"
      },
      {
        title: "The Power of Habit",
        author: "Charles Duhigg",
        genre: "Self-Help",
        published_year: 2012,
        price: 28,
        in_stock: true,
        pages: 371,
        publisher: "Random House"
      }
    ];

    const result = await booksCollection.insertMany(books);
    console.log(`${result.insertedCount} books inserted successfully.`);
  } catch (error) {
    console.error("Error inserting books:", error);
  } finally {
    await client.close();
  }
}

insertBooks();
