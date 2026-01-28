require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const { ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("CMS Backend is running");
});

// GET all posts
app.get("/posts", async (req, res) => {
  const db = await connectDB();
  const posts = await db.collection("posts").find().toArray();
  res.json(posts);
});

// CREATE a post
app.post("/posts", async (req, res) => {
  const db = await connectDB();
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: new Date()
  };

  const result = await db.collection("posts").insertOne(newPost);
  res.status(201).json(result);
});

// UPDATE a post
app.put("/posts/:id", async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;

  await db.collection("posts").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: req.body.title,
        content: req.body.content
      }
    }
  );

  res.json({ message: "Post updated" });
});

// DELETE a post
app.delete("/posts/:id", async (req, res) => {
  const db = await connectDB();
  const id = req.params.id;

  await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Post deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
