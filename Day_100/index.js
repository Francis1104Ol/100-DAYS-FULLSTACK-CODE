//ES6 MODULES ARE EXTERNAL FILE THAT CONTAIN REUSEABLE CODE THAT CAN BEE IMPORTED INTO OTHER JAVASCRIPT FILES 
// THEY CAN CONTAIN VARIABLES, CLASSES FUNCTIONS....AND MORE 
// INTRODUCED AS PART OF THE ECMASCRIPT 2015 UPDATES...

import{PI, getArea,getCircumference,getVolume} from './mathUtil'

console.log(PI)

const circumference = getCircumference(10);
const area = getArea(10)
const volume = getVolume(10)
console.log(`${circumference.toFixed(2)}cm`)
console.log(`${area.toFixed(2)}cm^2`)
console.log(`${volume.toFixed(2)}cm^3`)


// SYNCHRONOUS AND ASYNCHRONOUS CODE 

// SYNCHRONOUS EXECUTE LINE BY LINE  I.E CODE THAT WAIT FOR OPERATION TO COMPLETE
//WHILE ASYNCHRONOUS ALLOW MULTIPLE OPERATION TO BE PERFORMED CONCURRENTLY WITHOUT WAITING. DOESN'T BLOCK THE EXECUTION FLOW AND ALLOWS PROGRAMM TO CONTINUE 
function fun1(callback){
setTimeout(()=>{console.log('first job');
callback()}, 3000)
}
// setTimeout(()=>console.log('first job'), 3000)
// console.log('sencond job')
// console.log('third job')
// console.log('fourth job')

function func2(){
    console.log('sencond job')
    console.log('third job')
    console.log('fourth job')
}
fun1(func2)



//ERROR HANDLING
//ERROR is an object that is created to represent a problem that occurs often with user input or establishing connection

//USING TRY CATCH TO HANDLES IT 

try{
    const dividend = Number(window.prompt("enter a dividend: "))
     const divisor = Number(window.prompt("enter a divisor: "))
     if(divisor== 0){
        throw new Error("you can't divide by zero!")
     }

     if(isNaN(dividend)|| isNaN(divisor)){
        throw new Error("values must be a number!")
    
     }
     const result = dividend/divisor
     console.log(result)
    }catch(err){
        console.error(err)

    }
console.log('you have reach the end')
