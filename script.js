
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// detecting the first keypress and starting the game 
$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

// click event listener
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

// function to play sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// function to animate pressed button
function  animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

// funtion to choose random colour and it to gamePattern
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


// function to check answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// function to start over
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}