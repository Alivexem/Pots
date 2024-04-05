let win = new Audio("win.mp3")
let resetSound = new Audio("reset.mp3")
let clickSound = new Audio("click.mp3")
let clicked_start = false
let otherWise = true
let blocks = document.querySelectorAll('.block')
blocks.forEach((block) => {
    block.style.pointerEvents = "none"
})


const scores = document.getElementById("scores")
const start = document.getElementById("start")
const message = document.getElementById("message")


let randomDigitsArray = []
start.addEventListener("click", () => {
  if (clicked_start) {
    clickSound.play()
    document.getElementById("alert").style.display = "block"
    let array = [];
    blocks.forEach((block) => {
      array.push(parseInt(block.value));
    });
    
    let pot = 0;
    let pan = 0;
    let pandigits = [];
    let potdigits = [];
    
   // console.log(randomDigitsArray);
    
    array.forEach((digit, index) => {
      if (digit === randomDigitsArray[index]) {
        //console.log(`${randomDigitsArray[index]} is same as ${digit}`);
        pot++;
        potdigits.push(digit);
      }
    });
    
    const set1 = new Set(array);
    const set2 = new Set(randomDigitsArray);
    
    set1.forEach((value) => {
      if (set2.has(value)) {
        pan++;
        pandigits.push(value);
      }
    });
    
    potdigits.forEach((valueToRemove) => {
      const index = pandigits.indexOf(valueToRemove);
      if (index !== -1) {
        pandigits.splice(index, 1);
        pan--;
      }
    });
    
    
    if(pot > 0){
        document.getElementById("potter").innerText = pot
    }
    if(pan > 0){
        document.getElementById("panner").innerText = pan 
    }
    if(pot == 0){
        document.getElementById("potter").innerText = "no"
    }
    if(pan == 0){
        document.getElementById("panner").innerText = "no"
    }
    if(pot == 4){
        win.play()
        document.getElementById("start").style.pointerEvents = "none"
        start.style.backgroundColor = "gray"
        document.getElementById("scorer").innerText++
        document.getElementById("congrats").style.display = "block"
        document.getElementById("alert").style.display = "none"
        setTimeout(() => {
            document.getElementById("congrats").style.display = "none"
        document.getElementById("alert").style.display = "block"
        },4000)
    }
  }

    
    
        
   if (otherWise) {
      clickSound.play()
      clicked_start = true    
      otherWise = false
      scores.style.display = "block"
      message.style.display = "none"
      start.innerText = "check"
      blocks.forEach((block) => {
        block.style.pointerEvents = "auto"
        block.style.backgroundColor = "snow"
        block.placeholder = "0"
    })

    const generateRandomDigits = () => {
        return Math.floor(Math.random() * 20); 
    }

    
    while (randomDigitsArray.length < 4) {
        const randomValue = generateRandomDigits();
        if (!randomDigitsArray.includes(randomValue)) {
            randomDigitsArray.push(randomValue);
        }
    }
    if(Math.min(...randomDigitsArray) > 0){
        document.getElementById("low").innerText = Math.min(...randomDigitsArray) - 1;
    }else{
        document.getElementById("low").innerText = Math.min(...randomDigitsArray);
    }
    
    
    document.getElementById("high").innerText = Math.max(...randomDigitsArray) + 3;
    
    }
    
})

let refresh = document.getElementById("refresh")
refresh.addEventListener("click", () => {
    resetSound.play()
    document.getElementById("start").style.pointerEvents = "auto"
    start.style.backgroundColor = "cyan"
    blocks.forEach((block) => {
      block.style.pointerEvents = "none"
      block.value = ""
      block.placeholder = ""
      block.style.backgroundColor = "gray"
      clicked_start = false
      otherWise = true
      document.getElementById("alert").style.display = "none"
      start.innerText = "start"
      scores.style.display = "none"
      message.style.display = "block"
      randomDigitsArray = []
      array = []
    })
})

