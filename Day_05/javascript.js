//Operators: Performing Actions 
let a = 10, b = 5;
console.log(a + b); // 15
console.log(a - b); // 5
console.log(a * b); // 50
console.log(a / b); // 2
console.log(a % b); // 0 (remainder)
// Assignment operators
let x = 10;

// Add and assign
x += 5; // x = 15

// Multiply and assign
x *= 2; // x = 30
//Comparison Operators
 let c = 5;
 let d = "5";

// Loose equality
console.log(c == d); // true

// Strict equality
console.log(c === d); // false

// Greater than
console.log(10 > 5); // true
 
// logical operators
let isAdult = true;
let hasID = false;

// Logical AND
console.log(isAdult && hasID); // false

// Logical OR
console.log(isAdult || hasID); // true

// Logical NOT
console.log(!isAdult); // false

//String Operators
let greeting = "Hello";
greeting += ", World!";
console.log(greeting); // Hello, World!
//type operators
console.log(typeof "Hello"); // string
console.log([] instanceof Array); // true
// Nullish Coalescing Operator (??)
let name = null;
let defaultName = name ?? "Guest";
console.log(defaultName); // Guest

//TYPES OF FUNCTIONS DECLARATION

//Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Eddy")); // Hello, Eddy!

//function expression 
const add = function(a, b) {
  return a + b;
};

console.log(add(3, 4)); // 7
//Arrow Function
const multiply = (a, b) => a * b; console.log(multiply(2, 3)); // 6
//Single Parameter Arrow Function
const square = x => x * x; console.log(square(5)); // 25
//No Parameter Arrow Function
const getCurrentTime = () => new Date().toLocaleTimeString(); console.log(getCurrentTime()); // Current time
//Multiple Parameters Arrow Function
const divide = (a, b) => a / b; console.log(divide(10, 2)); // 5
//Parameters and Arguments
function introduce(firstName, lastName) {
    return `My name is ${firstName} ${lastName}.`;
    }
    console.log(introduce("John", "Doe")); // My name is John Doe.
//Default Parameters
function greetUser(name = "Guest") {  
    return `Welcome, ${name}!`;
}
console.log(greetUser()); // Welcome, Guest!
//return statement
function add(a, b) {
    return a + b;
}
console.log(add(4, 5)); // 20

//SCOPES OF VARIABLE
let globarVar = "This is a global variable"
function checkScope() {
    let localVar = "This is a local variable";
    console.log(globarVar);
    console.log(localVar);
}
checkScope();
// console.log(localVar); // Error: localVar is not defined


//Annonymous Function
 setTimeout(function() {
console.log("This is an anonymous function executed after 2 seconds");
}, 2000);
// Immediately Invoked Function Expressions (IIFE)
(function() {
    console.log("This is an IIFE");
})();