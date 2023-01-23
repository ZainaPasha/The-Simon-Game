// Variables
var numOfClicks = 0;

var condition = 0;

var level = 0;

var numOfKeyDowns = 0;

var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var randomChooseColour;

// Functions
function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  return randomNumber;

}

function playSound(name){
  var sound = new Audio("sounds/"+ name +".mp3");
  sound.play();
}

function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  }, 100);

}

function computerSequence(){

    $("#level-title").text("Level "+(level+=1));
    randomChooseColour = buttonColours[nextSequence()];
    setTimeout(function(){
    $("#"+randomChooseColour).fadeOut().fadeIn();
    playSound(randomChooseColour);
    gamePattern.push(randomChooseColour);
  }, 500);

}

function checkSequence(){

    for(let i=0; i<userClickedPattern.length; i++){

      if(gamePattern[i].toString() === userClickedPattern[i].toString()){
        if (i===(gamePattern.length)-1){
          return condition = 1;
        }

      }

      else{
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("GAME OVER !!!. PRESS ANY KEY TO RESTART.");
      setTimeout(function (){
        $("body").removeClass("game-over");
      }, 200);
        if (i===(userClickedPattern.length)-1){

          startOver();
          return condition = 0;

        }
      }
    }
}
 function startOver(){
   numOfKeyDowns = 0;
   gamePattern = [];
   condition = 0;
   level = 0;
 }

//// Event Listeners /////

// Start Game
$(document).on("keydown", function(event){

  if (numOfKeyDowns === 0){
    numOfKeyDowns+=1;
    userClickedPattern = [];
    numOfClicks = 0;
    computerSequence();
  }

console.log(numOfKeyDowns);
});


// User's sequence
$(".btn").on("click", function(event){
  numOfClicks+=1;
 // Creates a sequence of the ids for the button pressed
var userChosenColour = event.target.id;
// console.log(event.target.id);
userClickedPattern.push(userChosenColour);
console.log(userClickedPattern);
playSound(userChosenColour);
animatePress(userChosenColour);
checkSequence();
if (numOfClicks===gamePattern.length && condition===1){
  numOfClicks = 0;
  userClickedPattern = [];
  computerSequence();

}
});
