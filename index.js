// Simon game
const buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let checkSuccess = 1;

$(document).keydown(nextSequence);

function nextSequence() {
    $(document).off('keydown');

    const levelTitle = "level " + level;
    $("#level-title").text(levelTitle);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    const classOfColour = "." + randomChosenColour;

    $(classOfColour).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

    gamePattern.push(randomChosenColour);
}

function checkAnswer (currentLevel) {
    console.log(gamePattern);
    console.log(userClickedPattern);
    for (let i = 0; i < currentLevel; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            checkSuccess = 0;
        }
    }

    if (currentLevel === level + 1 && checkSuccess === 1) {
        level++;
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }

    if (checkSuccess === 0) {
        gameOver();
    }
}

function gameOver() {
    gamePattern = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);  

    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    checkSuccess = 1;

    $(document).keydown(nextSequence);
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function() {
        $(currentColor).removeClass("pressed");
    }, 100);    
}

function playsound(currentSound) {
    const srcOfMusic = "sounds/" + currentSound+ ".mp3";
    const buttonMusic = new Audio(srcOfMusic);
    buttonMusic.play();
}

$(".btn").click(function () {
    $(this).fadeIn(100).fadeOut(100).fadeIn(100);
    for (let i = 0; i < 4; i++) {
        if ( $(this).hasClass(buttonColours[i]) ) {
            playsound(buttonColours[i]);

            userClickedPattern.push(this.id);

            checkAnswer(userClickedPattern.length);
        }
    }
});

