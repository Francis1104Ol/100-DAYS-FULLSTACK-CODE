// let fullName= "San_fran6co"
// let age = 23
// let isStudent = true

// document.getElementById('p1').textContent = `Your name is ${fullName}`
// document.getElementById('p2').textContent = `You're ${age} years old`
// document.getElementById('p3').textContent = `Enrolled: ${isStudent}`


//ARETHMETIC OPERATORS
//let students = 30
// students = students+1
// students = students-1
// students = students*2
// students = students/2
// students = students**2
// students =+1
// students =-1
// students /=2
// students **=2


//ACCEPTING USER INPUT
//  let userName;
//  userName = window.prompt('what is your username')

// document.getElementById('mySubmit').onclick= function(){
//     userName=document.getElementById('myText').value;
//     document.getElementById('myH1').textContent= `Hello ${userName}`
//     console.log(userName)
// }

//TYPE CONVERSION 
// let age = window.prompt('How old are you');
// age =Number(age)
// age+=1;

// console.log(age, typeof age);

const PI = 3.14256
let radius;
let circumference;

//radius = window.prompt('Enter the radius of the circle')
//radius = Number(radius)

// document.getElementById('mySubmit').onclick = function(){
//    radius= document.getElementById('myText').value;
//    radius = Number(radius)
//    circumference = 2*PI*radius;
//    document.getElementById('myH3').textContent = circumference +'cm';
    
// }

const decreaseBtn =document.getElementById('decreaseBtn')
const resetBtn =document.getElementById('resetBtn')
const increaseBtn =document.getElementById('increaseBtn')
const countLabel =document.getElementById('countLabel')
let count =0;

function updateDisplay() {
  countLabel.textContent = count;
  if (count > 0) {
    countLabel.style.color = "green";
  } else if (count < 0) {
    countLabel.style.color = "red";
  } else {
    countLabel.style.color = "black";
  }
}

increaseBtn.onclick = function(){
    count ++;
   updateDisplay()
};

decreaseBtn.onclick = function(){
count --;
updateDisplay()
};

resetBtn.onclick = function(){
count = 0
updateDisplay()
}
