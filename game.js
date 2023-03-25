const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let highscore = 0;

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Restart in 3 seconds");
        setTimeout(function () {
            $("body").removeClass("game-over");
            $("h1").text("Level " + level);
            startOver();
        }, 1000);
    }
}


function startGame() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}

function startOver() {
    if (level > highscore) {
        highscore = level;
        $("#highscore").text("Highscore: " + highscore);
    }
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;

    $("#level-title").text("Game Over, Touch the Screen or Press Any Key to Restart");
}

$(document).on("keypress touchstart", function (e) {
    if (!started) {
        e.preventDefault();
        startGame();
    } else if (e.type === "touchstart" && $("#level-title").text() === "Game Over, Touch the Screen or Press Any Key to Restart") {
        e.preventDefault();
        setTimeout(function () {
            startGame();
        }, 2000);
}
});

$(".btn").on("click touchstart", function (e) {
    e.preventDefault();
    if (!started) {
        return;
    }
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

const nextSequence = function () {
    level++;
    $("#level-title").text("Level:" + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}