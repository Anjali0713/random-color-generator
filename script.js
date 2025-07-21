let gameseq=[];
let userSeq=[];
let highScore =  localStorage.getItem("highScore") ||0;
let btn=["red","blue","purple","green"];

let gameStarted=false;
let level=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
  if(gameStarted == false){
    console.log("game is started");
    gameStarted=true;

    levelUp();
  }
})

function gameflash(btn){
btn.classList.add("flash");
setTimeout(function(){
  btn.classList.remove("flash");
},250);
}

function userflash(btn){
btn.classList.add("userflash");
setTimeout(function(){
  btn.classList.remove("userflash");
},250);
}

function levelUp(){
userSeq=[];
level++;

h2.innerText=`level ${level}`;
let randIdx=Math.floor(Math.random()*btn.length);
let randColor=btn[randIdx];
let randbtn=document.querySelector(`.${randColor}`);
gameseq.push(randColor);
console.log(gameseq);
gameflash(randbtn);
}

function checkans(idx){
if(gameseq[idx] === userSeq[idx]){
  if(gameseq.length == userSeq.length){
  setTimeout(levelUp,1000);
  }
}else{
 h2.innerHTML = `Game over! Your score was <b>${level}</b><br>Highest score: <b>${highScore}</b><br>Press any key to restart`;
  document.querySelector("body").style.backgroundColor="red";
  setTimeout(function(){
  document.querySelector("body").style.backgroundColor="white";  
  },150);
  reset();
}
}
function btnpress(){
  let btn=this;
  userflash(btn);

  let usercolor= btn.getAttribute("id");
  userSeq.push(usercolor);

  checkans(userSeq.length-1)
}

let btns = document.querySelectorAll(".btn");
  for (let btn of btns) {
    btn.addEventListener("click", btnpress);
  }

function reset(){

  if(level > highScore){
    highScore = level;
    localStorage.setItem("highScore", highScore);
  }
  gameStarted=false;
  level=0;
  gameseq=[];
  userSeq=[];
}