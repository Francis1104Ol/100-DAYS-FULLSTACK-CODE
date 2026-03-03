//4 important phases: each phase of an event loop has it own call back queues
const fs = require('fs')
// To avoid blocking the main thread in Node.js, you need to understand one core principle:

// Node.js runs JavaScript on a single-threaded event loop.
// If you execute CPU-heavy or synchronous operations, you block the event loop — and your entire application stops responding.
//1 :Do NOT Use Synchronous APIs in Production
//2: Do NOT Perform CPU-Intensive Calculations on the Main Thread
//3:Do NOT Block with Large JSON Operations
//4:Do NOT Use Blocking Loops Inside Request Handlers
console.log('Program has started ') // top level executed in the main thread
//stored in 1st phase 
// setTimeout(() =>{
//     console.log('Timer callback executed ')
// }, 0);
//stored in 2nd phase they are not going to finish immediately
fs.readFile('./files/input.txt', ()=>{
    console.log('File read complete');
    setTimeout(() =>{
    console.log('Timer callback executed ')
}, 0);
setImmediate(()=>{
    console.log('Set immediate excuted')
});
process.nextTick(() =>{
    console.log('process.nextTick callback executed')
})
})
//stored in the 3rd phase of the event loop
// setImmediate(()=>{
//     console.log('Set immediate excuted')
// });

console.log('Program has completed ')

//micro task queue or proccess.nexttick queue 

//Intro to express JS : is a free open source web application frame work for NODE JS