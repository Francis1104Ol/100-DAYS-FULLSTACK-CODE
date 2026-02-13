//storing an area
const p1= [ 5.34803,7.64271] 
const p2= [ 10.05567, 10.74404] 
const p3=[13.79128, 10.17285]
const p4= [ 10.75905, 9.24157]
const p5 = [8.67357, 7.72645]
const p6 = [9.75023, 7.88971]
const p7 = [ 8.71202, 6.71829]
const p8 = [9.76122, 6.89828 ]

db.areas.insertMany([
    {
        name: "Area1",
        location:{
            type:"Polygon",
            coordinates:[
                [p1, p2, p3, p4, p1]
            ]
    }
},
{
    name:"area 2",
    type:"Polygon",
    coordinates:[
        [p5, p6, p7, p8, p5]
    ]
}
])

db.areas.find({areas:
    {$geoIntersects:{
        $geometry:{
            type:"Point",
            coordinates:[ 8.9893,7.42994]
        }
    }}
})
// finding a places within a radius
db.places.find(
    {location:{
        $geoWithin:{
            $centerSphere:[
                [7.42994, 8.9893],
                0.3/6378.1
            ]
        }
    }}
)
//aggregation framework: allow you to perform complex data processing and analysis on your MongoDB collections. It provides a powerful way to transform and analyze data using a pipeline of stages. Each stage performs a specific operation on the data, such as filtering, grouping, sorting, or projecting fields. The aggregation framework is particularly useful for performing complex queries and data transformations that go beyond simple CRUD operations.
