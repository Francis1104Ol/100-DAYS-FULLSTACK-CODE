// function rollDice(){
//     const numOfDice = document.getElementById('numOfDice').value
//     const diceResult = document.getElementById('diceResult')
//     const diceImages = document.getElementById('diceImages')
//     const values =[]
//     const images =[]

//     for(let i = 0; i < numOfDice; i++){
//         const value = Math.floor(Math.random()*6) +1
//         values.push(value);

//         images.push(`<img src="./diceImages/${value}.png"
//              class="dice-image"  
//              alt="Dice:${value}"
//              onerror="this.style.border='2px solid red'"
//              />`)

//     }
//     diceResult.textContent = `dice:${values.join(', ')}`
//     diceImages.innerHTML = images.join(' ')
// }



function rollDice(){
    const numOfDice = Number(document.getElementById('numOfDice').value)
    const diceResult = document.getElementById('diceResult')
    const diceImages = document.getElementById('diceImages')

    const values = []

    let rollCount = 0
    const maxRolls = 10  // how long animation runs

    const interval = setInterval(() => {
        let tempImages = []

        for(let i = 0; i < numOfDice; i++){
            const value = Math.floor(Math.random()*6) + 1
            tempImages.push(`<img src="./diceImages/${value}.png" class="dice-image">`)
        }

        diceImages.innerHTML = tempImages.join('')

        rollCount++

        if(rollCount >= maxRolls){
            clearInterval(interval)

            // final result
            const finalImages = []

            for(let i = 0; i < numOfDice; i++){
                const value = Math.floor(Math.random()*6) + 1
                values.push(value)
                finalImages.push(`<img src="./diceImages/${value}.png" class="dice-image">`)
            }

            diceImages.innerHTML = finalImages.join('')
            diceResult.textContent = `Dice: ${values.join(', ')}`
        }

    }, 100) // speed (lower = faster)
}