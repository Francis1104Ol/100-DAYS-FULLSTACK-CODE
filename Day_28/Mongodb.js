// types of relationships in mongodb

// 1. One-to-One Relationship
// In a one-to-one relationship, each document in a collection is linked to one and only one document in another collection. This can be implemented using references or embedding documents.   
// Example using embedding:
const userSchema = {
    id: "1234",
    name: "Shola",
    profile: {
        age: 30,
        bio: "Software Developer"
    }
};
// Example using references:
const userSchemaRef = {
    name: "Shola",
    profileId: "1234"
};  
const profileSchema = {
    age: 30,
    bio: "Software Developer"
};
// 2. One-to-Many Relationship
// In a one-to-many relationship, a single document in one collection is linked to multiple documents in another collection. This can also be implemented using embedding or references.
// Example using embedding:
const authorSchema = {
    name: "John Doe",
    books: [
        { title: "End of road", pages: 200 },
        { title: "new dawn", pages: 150 }
    ]
};
// Example using references:
const authorSchemaRef = {
    name: "John Doe",
    bookIds: ["b1", "b2"]
};  
const bookSchema = {   
    title: "Book 1",
    pages: 200
};  
// 3. Many-to-Many Relationship
// In a many-to-many relationship, multiple documents in one collection can be linked to multiple documents in another collection. This is typically implemented using references.
// Example using references: 
const studentSchema = {
    name: "Alice",
    courseIds: ["c1", "c2"]
};  
const courseSchema = {
    title: "Math 101",
    studentIds: ["s1", "s2"]
};  
// In this example, a student can enroll in multiple courses, and each course can have multiple students enrolled.  
// These are the three primary types of relationships in MongoDB, each serving different use cases depending on the data model and application requirements.

//types of referencing in mongodb

// 1. child referencing
// In child referencing, a document contains references to multiple child documents in another collection. This is commonly used in one-to-many relationships.
const parentSchema = {
    name: "Parent 1",
    childIds: ["child1", "child2", "child3"]
};  
const childSchema = {
    name: "Child 1",
    parentId: "parent1"
};  
// 2. Parent Referencing
// In parent referencing, a document contains a reference to its parent document in another collection. This is often used in many-to-one relationships.    
const childSchemaParentRef = {
    name: "Child 1",
    parentId: "parent1" 
};  
const parentSchemaParentRef = {
    name: "Parent 1"    
};
// 3. two-way referencing
// In two-way referencing, documents in both collections contain references to each other. This is useful in many-to-many relationships.
const studentSchemaTwoWay = {
    name: "Student 1",
    courseIds: ["course1", "course2"]
};  
const courseSchemaTwoWay = {
    title: "Course 1",
    studentIds: ["student1", "student2"]
};  
// In this example, each student document references multiple course documents, and each course document references multiple student documents.  
// These referencing techniques help establish relationships between documents in MongoDB, allowing for efficient data retrieval and management.    

db.students.insertOne({
  _id: ObjectId(),
  name: "Alice",
  courseIds: []
})
//many to many
db.courses.insertMany([
  { _id: ObjectId(), title: "Math 101", studentIds: [] },
  { _id: ObjectId(), title: "Physics 101", studentIds: [] }
])

db.students.updateOne(
  { name: "Alice" },
  { $set: { courseIds: [ObjectId("6980d96999664c642b628ca9"), ObjectId("6980d96999664c642b628caa")] } }
)

db.courses.updateOne(
  { title: "Math 101" },
  { $push: { studentIds: ObjectId("6980d96999664c642b628caa") } }
)
