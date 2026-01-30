# MongoDB Advanced Notes

These notes summarize advanced MongoDB concepts explored during a focused learning session. They are intended as **reference material** and **practical examples** for future backend projects.

---

## 1. Aggregation Framework

The aggregation framework processes data through a pipeline of stages, transforming documents step by step.

### Example: Total Spending Per User

db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalSpent: {
        $sum: { $multiply: ["$price", "$quantity"] }
      }
    }
  },
  { $sort: { totalSpent: -1 } }
])


**Key operators:**

* `$group` – groups documents by a field
* `$sum` – accumulates values
* `$multiply` – computes derived values
* `$sort` – orders results

---

## 2. Filtering and Shaping Data

Aggregation can be used to filter and format output cleanly for APIs.


db.orders.aggregate([
  { $match: { category: "Electronics" } },
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


**Concepts:**

* `$match` – filters documents early
* `$project` – controls returned fields

---

## 3. Indexing and Performance

Indexes improve query performance by reducing collection scans.

### Single Field Index


db.orders.createIndex({ userId: 1 })


### Compound Index

db.orders.createIndex({ category: 1, price: -1 })


**Best practices:**

* Index fields used in filters and sorting
* Avoid unnecessary indexes

---

## 4. Query Analysis with `explain()`

Use `explain()` to understand query execution.

db.orders.find({ category: "Electronics" }).explain("executionStats")


**What to check:**

* Index usage
* Documents examined vs returned
* Execution time


## 5. Data Modeling Strategies

### Embedding

Best for small, tightly related data that is frequently accessed together.


{
  _id: 1,
  name: "John",
  orders: [
    { item: "Laptop", price: 1200 },
    { item: "Mouse", price: 25 }
  ]
}

### Referencing

Better for large or growing datasets.


// users collection
{ _id: 1, name: "John" }

// orders collection
{ userId: 1, item: "Laptop", price: 1200 }

---

## 6. MongoDB with Node.js (Native Driver)

Example aggregation using the native MongoDB driver:


const pipeline = [
  {
    $group: {
      _id: "$category",
      totalSales: { $sum: "$price" }
    }
  }
];

const result = await db
  .collection("orders")
  .aggregate(pipeline)
  .toArray();

console.log(result);

---

## 7. Schema Validation (Without Mongoose)

MongoDB supports schema validation using JSON Schema.


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

**Takeaway:** MongoDB is schema-flexible, not schema-less.

---

## 8. Key Takeaways

* Aggregation pipelines enable powerful data transformations
* Indexes are critical for performance and scalability
* Data modeling choices affect maintainability
* MongoDB supports structured validation without ODMs
