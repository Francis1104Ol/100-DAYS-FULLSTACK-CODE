const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

let collection;

async function startServer() {
  await client.connect();
  const db = client.db("carApp");
  collection = db.collection("carSelections");
  console.log("MongoDB connected");
}

startServer();

app.post("/api/cars", async (req, res) => {
  const { name, email, brand, features } = req.body;

  if (!name || !email || !brand) {
    return res.status(400).json({ message: "Missing fields" });
  }

  await collection.insertOne({
    name,
    email,
    brand,
    features,
    createdAt: new Date()
  });

  res.json({ message: "Data saved successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
