// //WORKING WITH SWITCH
// let day =1;
// switch(day){
//   case 1:
//     console.log('it is Monday')
//     break;
//   case 2:
//     console.log('it is Tuesday')
//     break;
//   case 3:
//     console.log('it is Wednesday')
//     break;
//   case 4:
//     console.log('it is Thursday')
//     break;
//   case 5:
//     console.log('it is Friday')
//     break;
//   case 6:
//     console.log('it is Saturday')
//     break;
//   case 7:
//     console.log('it is Sunday')
//   default:
//     console.log(`${day} is not a day`)
// }

//SPREAD OPERATOR  allows  an iterable such as an array to be expanded into separate elements
// let numbers= [1,2,3,4,5]
// let maximum = Math.max(...numbers)
// let minimum = Math.min(...numbers)
// console.log(maximum)

//CREATING SHALLOWCOPY
let fruits = ["apple","mango","banana","orange"]
let newFruits = [...fruits]
//REST PARAMETER bundles separate element into an array
function sum (...numbers){
  let result =0
  for(let number of numbers){
    result +=number;
  }
  return result
}

// const total = sum(1,2,3,4,5)
// console.log(`your total is $${total}`)


function getAverage(...numbers){
  let result =0
  for(let number of numbers){
    result +=number;
  }
  return result/numbers.length
}
const total = getAverage(75, 67, 74,200,100)
console.log(total)