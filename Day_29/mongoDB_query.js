db.orders.insertMany([
  {
    orderDate: ISODate("2026-01-10T10:30:00Z"),
    customerId: ObjectId("65cfa111a1b2c3d4e5f00001"),
    status: "processing",
    items: [
      { productId: ObjectId("65cfa999a1b2c3d4e5f10001"), quantity: 2 },
      { productId: ObjectId("65cfa999a1b2c3d4e5f10002"), quantity: 1 }
    ]
  },

  {
    orderDate: ISODate("2026-01-12T14:45:00Z"),
    customerId: ObjectId("65cfa111a1b2c3d4e5f00002"),
    status: "shipped",
    items: [
      { productId: ObjectId("65cfa999a1b2c3d4e5f10003"), quantity: 1 },
      { productId: ObjectId("65cfa999a1b2c3d4e5f10001"), quantity: 3 }
    ]
  },

  {
    orderDate: ISODate("2026-01-15T09:15:00Z"),
    customerId: ObjectId("65cfa111a1b2c3d4e5f00003"),
    status: "delivered",
    items: [
      { productId: ObjectId("65cfa999a1b2c3d4e5f10002"), quantity: 1 },
      { productId: ObjectId("65cfa999a1b2c3d4e5f10003"), quantity: 2 }
    ]
  },

  {
    orderDate: ISODate("2026-01-18T16:20:00Z"),
    customerId: ObjectId("65cfa111a1b2c3d4e5f00004"),
    status: "processing",
    items: [
      { productId: ObjectId("65cfa999a1b2c3d4e5f10001"), quantity: 1 },
      { productId: ObjectId("65cfa999a1b2c3d4e5f10003"), quantity: 1 }
    ]
  },

  {
    orderDate: ISODate("2026-01-20T11:00:00Z"),
    customerId: ObjectId("65cfa111a1b2c3d4e5f00005"),
    status: "cancelled",
    items: [
      { productId: ObjectId("65cfa999a1b2c3d4e5f10002"), quantity: 2 },
      { productId: ObjectId("65cfa999a1b2c3d4e5f10001"), quantity: 1 }
    ]
  }
]);

// Query to join orders with users collection to get customer details
db.orders.aggregate({
    $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "_id",
        as: "customerDetails"
    }
})