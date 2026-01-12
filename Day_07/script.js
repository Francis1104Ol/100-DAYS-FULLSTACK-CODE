/************************************
 * PART 1: VARIABLES & CONDITIONALS
 ************************************/

let userName = "Student";
let userScore = 75;

if (userScore >= 50) {
    console.log(userName + " has passed the test.");
} else {
    console.log(userName + " has failed the test.");
}


/************************************
 * PART 2: CUSTOM FUNCTIONS
 ************************************/

function greetUser(name) {
    return "Welcome, " + name + "!";
}

function calculateTotal(score1, score2) {
    return score1 + score2;
}

console.log(greetUser(userName));
console.log("Total Score:", calculateTotal(40, 35));


/************************************
 * PART 3: LOOPS
 ************************************/

for (let i = 1; i <= 5; i++) {
    console.log("For Loop Count:", i);
}

let count = 1;
while (count <= 3) {
    console.log("While Loop Count:", count);
    count++;
}


/************************************
 * PART 4: DOM INTERACTIONS & EVENTS
 ************************************/

// DOM Selection
const title = document.getElementById("main-title");
const description = document.querySelector(".description");
const changeTextBtn = document.getElementById("changeTextBtn");
const showListBtn = document.getElementById("showListBtn");
const numberList = document.getElementById("numberList");

// DOM Interaction 1: Change heading text
changeTextBtn.addEventListener("click", function () {
    title.textContent = "Text Updated Using JavaScript!";
});

// DOM Interaction 2: Create list items dynamically
showListBtn.addEventListener("click", function () {
    numberList.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        let li = document.createElement("li");
        li.textContent = "Number " + i;
        numberList.appendChild(li);
    }
});

// DOM Interaction 3: Mouse hover event
title.addEventListener("mouseover", function () {
    title.style.color = "blue";
});

// DOM Interaction 4: Mouse out event
title.addEventListener("mouseout", function () {
    title.style.color = "black";
});

// DOM Interaction 5: Double-click event
description.addEventListener("dblclick", function () {
    description.textContent = "You double-clicked this paragraph!";
});

// DOM Interaction 6: Toggle visibility
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "Toggle Description";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", function () {
    if (description.style.display === "none") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
});

// DOM Interaction 7: Keyboard event
document.addEventListener("keydown", function (event) {
    console.log("Key pressed:", event.key);
});

// DOM Interaction 8: Change background color on click
document.body.addEventListener("click", function () {
    document.body.style.backgroundColor = "#f4f4f4";
});
