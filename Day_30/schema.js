//defining a schema
db.createCollection('user', {validator: {
    $jsonSchema: {
        bsonType: 'object',    
        required:['name', 'email', 'address'],
        properties: {
            name: {
                bsonType: 'string',
                description: 'must be a string and is required'
                
           } ,
           additionalProperties: false, // thsi will disallow additional fields not defined in the schema
           email: {
                bsonType: 'string',
                description: 'must be a string and is required'
           },
           address: {
            bsonType: 'object',
            description: 'must be an object and is required',
            properties: {
                street: {bsonType: 'string'},
                city: {bsonType: 'string'},
                country: {bsonType: 'string'},
            }
           },
           gender:{
            bsonType: 'string',

           }
        }
    }
}}
            
            
            )

//inserting a document and testing the schema
db.user.insertOne({
    name: 'john',
     email:'john@gmail.com',
     address: {
        street: '123 main st',
        city: 'new york',
        country: 'USA'
     },
    gender: 'male'
})

//will throw an error because name is not a string
db.user.insertOne({
    name: 123,
     email:'john@gmail.com',
     address: {
        street: '123 main st',
        city: 'new york',
        country: 'USA'
     },
    gender: 'male'
})

//will not throw an error because everything is okay

db.user.insertOne({
    name: 'John',
     email:'john@gmail.com',
     address: {
        street: '123 main st',
        city: 'Abuja',
        country: 'Nigeria'
     },
    gender: 'male'
})

//addding age to test additional field not in schema
db.user.insertOne({
    name: 'Doe',
     email:'doe@gmail.com',
     address: {
        street: '456 side st',
        city: 'Lagos',
        country: 'Nigeria'
        },
    gender: 'female',
    age: 30
})//will not throw an error because additional fields are allowed by default



//defining a schema
db.createCollection('user', {validator: {
    $jsonSchema: {
        bsonType: 'object',    
        required:['name', 'email', 'address'],
        properties: {
            name: {
                bsonType: 'string',
                description: 'must be a string and is required'
                
           } ,
           additionalProperties: false, // thsi will disallow additional fields not defined in the schema
           email: {
                bsonType: 'string',
                description: 'must be a string and is required'
           },
           address: {
            bsonType: 'object',
            description: 'must be an object and is required',
            properties: {
                street: {bsonType: 'string'},
                city: {bsonType: 'string'},
                country: {bsonType: 'string'},
            }
           },
           gender:{
            bsonType: 'string',

           }
        }
    }
}}
            
            
            )


//updating an already existing schma
db.runCommand({
    collMod: 'user',
    validator: {
    $jsonSchema: {
        bsonType: 'object',    
        required:['name', 'email', 'address'],
        properties: {
            _1d: {
                bsonType: 'objectId',
                description: 'must be an objectId and is required'
           },
            name: {
                bsonType: 'string',
                description: 'must be a string and is required'
                
           } ,
      
           email: {
                bsonType: 'string',
                description: 'must be a string and is required'
           },
           address: {
            bsonType: 'object',
            description: 'must be an object and is required',
            properties: {
                street: {bsonType: 'string'},
                city: {bsonType: 'string'},
                country: {bsonType: 'string'},
            }
           },
           gender:{
            bsonType: 'string',}

           },
                additionalProperties: false, 
        }
    }
})

//testing the updated schema by adding an additional field
db.user.insertOne({
    name: 'Alice',
     email:'alice@gmail.com',
        address: { street: '2 ogedengbe st',
            city: 'Ibadan', 
            country: 'Nigeria'
         },
    gender:'female',
    age: 25
}) //will throw an error because additional fields are not allowed anymore 

//still not going to work because you need to specify the _id explicitly
db.user.insertOne({
    name: 'Alice',
     email:'alice@gmail.com',
        address: { street: '2 ogedengbe st',
            city: 'Ibadan', 
            country: 'Nigeria'
         },
    gender:'female',
})


//after the modification 
db.runCommand({
    collMod: 'user',
    validator: {
    $jsonSchema: {
        bsonType: 'object',    
        required:['name', 'email', 'address'],
        properties: {
            _id: {
                bsonType: 'objectId',
                description: 'must be an objectId and is required'
           },
            name: {
                bsonType: 'string',
                description: 'must be a string and is required'
                
           } ,
      
           email: {
                bsonType: 'string',
                description: 'must be a string and is required'
           },
           address: {
            bsonType: 'object',
            description: 'must be an object and is required',
            properties: {
                street: {bsonType: 'string'},
                city: {bsonType: 'string'},
                country: {bsonType: 'string'},
            }
           },
           gender:{
            bsonType: 'string',}

           },
                additionalProperties: false, 
        }
    }
})

//inserting a document with _id specified
db.user.insertOne({
    name: 'Alice',
     email:'alice@gmail.com',
        address: { street: '2 ogedengbe st',
            city: 'Ibadan', 
            country: 'Nigeria'
         },
    gender:'female',
})
//will work now because _id is specified



//validation level and action
db.createCollection('user', {
    validator: {
        $jsonSchema: {

        }
    },
    validationLevel: 'moderate',
    validationAction: 'warn'
})

//validationLevel: 'strict' (default) - all inserts and updates must comply with the schema
//validationLevel: 'moderate' - only new inserts and updates that affect existing valid documents must comply with the schema

//for alreadyy created collections
db.runCommand({
    collMod: 'user', validator: {
        $jsonSchema: {}
     }, validationLevel: 'moderate',
    validationAction: 'warn'
})  




db.runCommand({
    collMod: 'user',
    validationLevel: 'strict',
    validationAction: 'warn',
}) 


//runing this will now throw an error because validation action is set to 'warn'
db.user.insertOne({
    name: 123,
     email:'john@gmail.com',
     address: {
        street: '123 main st',
        city: 'new york',
        country: 'USA'
     },
    gender: 'male'
})
//changing the validation level to error it won't insert the document
db.runCommand({
    collMod: 'user',
    validationLevel: 'strict',
    validationAction: 'error',
}) 

//runing this will now throw an error because validation action is set to 'error'
db.user.insertOne({
    name: 123,
     email:'john@gmail.com',
     address: {
        street: '123 main st',
        city: 'new york',
        country: 'USA'
     },
    gender: 'male'
})