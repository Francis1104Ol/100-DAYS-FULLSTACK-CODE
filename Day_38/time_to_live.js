//Time to live index
db.logs.insertOne({data:"user created",createdAt:new Date()})
db.logs.createIndex({createdAt:1},{expireAfterSeconds:10}) // this will automatically delete the document after 10 seconds of its creation
db.logs.insertOne({data:"user updated",createdAt:new Date()})
//covered queries: queries that can be fully excuted using the index without looking at the document
db.users.createIndex({Age:1})
db.users.explain("executionStats").find({Age:{$gte:40}},{_id:0, Age:1})
//How Mongodb reject a plan
db.users.createIndex({Gender:1, Age:1}) //compound index

//Multi key Index note you can't add a compound index on a multiple multikey index
db.employees.createIndex({hobbies:1})

db.employees.createIndex({"skills.name":1})
db.employees.explain("executionStats").find({"skills.name":"designer"})

//Text Index: this enables efficient searching of string content in a collection. You can create a text index on one or more fields that contain string data. Once the text index is created, you can perform text searches using the $text operator in your queries.
db.articles.createIndex({title:"text", content:"text"})
db.articles.insertOne({title:"MongoDB Indexing", content:"Indexing is a powerful feature in MongoDB that allows you to optimize query performance by creating indexes on specific fields in your collections."})
db.articles.find({$text:{$search:"indexing"}})
db.articles.find({$text:{$search:"\"indexing\""}}) // this will search for the exact phrase "indexing"
db.articles.find({$text:{$search:"indexing -performance"}}) // this will search for documents that contain the word "indexing" but not the word "performance"   
//create combined text indexes
db.articles.createIndex({title:"text", content:"text"})
db.articles.find({$text:{$search:"indexing"}}, {score:{$meta:"textScore"}})
    .sort({score:{$meta:"textScore"}}) // this will sort the results based on the relevance score of the text search, with the most relevant documents appearing first
    db.articles.find({$text:{$search:"indexing"}}, {score:{$meta:"textScore"}})
    .sort({score:{$meta:"textScore"}})
//dropping a text index
db.articles.dropIndex({title:"text", content:"text"})
 db.articles.dropIndex('title_text_content_text')
 //configuring text indexes
db.articles.createIndex(
    {title:"text", content:"text"}, 
    {default_language:"german", weight:{title:10, content:5}}) // this will set the default language for the text index to German, which can affect how the text search is performed, such as stemming and stop word removal. You can specify other languages as well, depending on your needs.
db.articles.find({$text:{$search:"indexing"}}, {$language:"german"}.sort({score:{$meta:"textScore"}}))
//creating index in background: this allows you to create an index without blocking other operations on the collection. When you create an index in the background, MongoDB will build the index in a separate thread, allowing other read and write operations to continue without interruption.
//factors to consider when creating indexes: the size of the collection, data volume, workload, the frequency of updates, and the types of queries being performed. It's important to carefully evaluate your indexing strategy to ensure that it provides the best performance for your specific use case.
db.users.createIndex({Age:1}, {background:true})
//Geospatial Index: this allows you to perform geospatial queries on your data, such as finding documents that are within a certain distance from a specific point or within a certain area. MongoDB supports two types of geospatial indexes: 2d and 2dsphere. The 2d index is used for flat, two-dimensional data, while the 2dsphere index is used for spherical data, such as geographic coordinates.
//they are location specific and they are used to optimize geospatial queries, such as finding documents that are within a certain distance from a specific point or within a certain area. Geospatial indexes can be created on fields that contain geospatial data, such as coordinates or GeoJSON objects. Once the geospatial index is created, you can perform geospatial queries using operators like $near, $geoWithin, and $geoIntersects.db.places.createIndex({location:"2dsphere"}) db.places.insertOne({name:"Central Park", location:{type:"Point", coordinates:[-73.9654, 40.7829]}}) db.places.find({location:{$near:{$geometry:{type:"Point", coordinates:[-73.9654, 40.7829]}, $maxDistance:1000}}}) // this will find all documents that are within 1000 meters of the specified point

  
db.places.insertMany(

[
    {
  name: "Ikeja City Mall",
  category: "shopping mall",
  location: {
    type: "Point",
    coordinates: [3.3491, 6.6018]
  }
},
{
  name: "National Stadium",
  category: "sports arena",
  location: {
    type: "Point",
    coordinates: [3.3763, 6.4976]
  }
},
 {
  name: "University of Abuja",
  category: "university",
  location: {
    type: "Point",
    coordinates: [7.4019, 8.9906]
  }
},
 {
  name: "Lekki Conservation Centre",
  category: "tourist attraction",
  location: {
    type: "Point",
    coordinates: [3.3986, 6.4412]
  }
},

 {
  name: "Port Harcourt Pleasure Park",
  category: "park",
  location: {
    type: "Point",
    coordinates: [7.0219, 4.8156]
  }
},
{
    name: "Murtala Muhammed International Airport",
     category: "airport",
      location: { type: "Point",
         coordinates: [3.3212, 6.5778] 
        }
     
},
{
  name:"Murg Plaza",
    category:"shopping mall",
    location:{
        type:"Point",
        coordinates:[7.48596, 9.03684] 

    }
}])
db.places.find({location:{
    $near:{
        $geometry:{
            type:"Point",
            coordinates:[7.42994, 8.9893]
        },
        
        $maxDistance:3000
    }
    }
}
) // this will not work because we did not create a geospatial index
db.places.createIndex({location:"2dsphere"})

//finding places within a certain area
const p1= [ 5.34803,7.64271] 
const p2= [ 10.05567, 10.74404] 
const p3=[13.79128, 10.17285]
const p4= [ 10.75905, 9.24157]

db.places.find(
    {location:{
        $geoWithin:{
            $geometry:{
                type:"Polygon",
                coordinates:[
                    [
                        [ 5.34803,7.64271],
                        [ 10.05567, 10.74404],
                        [13.79128, 10.17285],
                        [ 10.75905, 9.24157],
                        [ 5.34803,7.64271]
                    ]
                ]
            },
        }
    }})