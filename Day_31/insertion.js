//ordered insertion in mongodb
db.countries.insertMany([
    {_id: 'US', name: 'United States'},
    {_id: 'CA', name: 'Canada'},
    {_id: 'MX', name: 'Mexico'},
],)
//trying to insert this will throw an error and terminate the process
db.countries.insertMany([
    {_id: 'pak', name: 'pakistan'},
    {_id: 'CA', name: 'Canada'},
    {_id: 'MX', name: 'Mexico'},
],)
 
//will continue inserting the rest of the documents even if one fails
db.countries.insertMany([
    {_id: 'RU', name: 'Russia'},
    {_id: 'CA', name: 'Canada'},
    {_id: 'NGA', name: 'Nigeria'},
    {_id: 'EG', name: 'Egypt'},
    
], {ordered: false} // option to continue on error, which only works for insertMany
)

//write concern: define the level of acknowledgment requested from MongoDB for write operations
//w: 0 - no acknowledgment
//w: 1 - acknowledgment from primary
//w: majority - acknowledgment from majority of replica set members 
db.products.insertOne(
    {name: 'iphone 12', price: 799},
    {writeConcern: {
        w: 1
    }}
)
//this will not wait for acknowledgment and will not throw an error even if the write operation fails
db.products.insertOne(
    {name: 'iphone 12', price: 799},
    {writeConcern: {
        w: 0
    }}
)


//journal is like a to do task that the  storage engine need to perform, 
// it is used to ensure durability of write operations. When journal is enabled,
//  MongoDB writes the data to a journal file before writing it to the data files. This allows MongoDB to recover from crashes and ensure that no data is lost.
//  By default, journal is enabled in MongoDB, but it can be disabled for performance reasons. However, it is generally recommended to keep journal enabled for production environments to ensure data durability and integrity.
//useful when the server went down 
db.products.insertOne(
    {name: 'iphone 14', price: 1299},
    {writeConcern: {
        w: 0, j: true, wtimeout:1000
    }}
)

//atomicity in mogodb: means that a transaction is either fully completeed or not at all 

//importing json data to mongodb
//using mongoimport command in terminal

//how the find method works with filters
