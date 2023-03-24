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
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function unlockAudioPlayback() {
    var unlockAudio = new Audio();
    unlockAudio.play();
}

function startGame() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}

$(document).on("keypress touchstart", function (e) {
    if (e.type === "touchstart" && e.target !== document.body) {
        unlockAudioPlayback();
        return;
    }
    startGame();
});

function startOver() {
    if (level > highscore) {
        highscore = level;
        $("#highscore").text("Highscore: " + highscore);
    }
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}


function handleButtonClick(userChosenColor) {
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}

function buttonClickHandler(e) {
    e.preventDefault();
    if (e.type === "touchstart" && !started) {
        return;
    }
    var userChosenColor = $(this).attr("id");
    handleButtonClick(userChosenColor);
}

bindButtonClickHandler();


function bindButtonClickHandler() {
    $(".btn").off("click touchstart");
    $(".btn").on("click touchstart", buttonClickHandler);
}


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