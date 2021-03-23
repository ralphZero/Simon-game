const buttonColors = ['green', 'red', 'yellow', 'blue'];
var gamePattern = [];
var userClickedPattern = [];
var isWorking = false;
var score = 0;
let index = 0;

let popUpTime = 0;
let sequenceTime = 0;


$.fn.popUp = function(milliseconds) {
    let counter = 0;
    var inter = setInterval(() => {
        if(counter < 1) {
            this.toggleClass('popup');
            counter++;
        } else {
            this.toggleClass('popup');
            clearInterval(inter);
        }
    }, milliseconds);
}

function playAudio(color) {
    let audio = new Audio('sounds/'+color+'.mp3');
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    index = 0;
    isWorking = true;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    let i = 0;
    let timer = setInterval(() => {
        if(i < gamePattern.length) {
            // $('#'+gamePattern[i]).playAudio();
            $('#'+gamePattern[i]).popUp(popUpTime);
            i++;
        }else {
            clearInterval(timer);
            isWorking = false;
        }
    }, sequenceTime);

    console.log(popUpTime, sequenceTime);
}

function checkPattern(userChosenColor) {
    isWorking = true;
    userClickedPattern.push(userChosenColor);

    console.log(`${userClickedPattern[index]} === ${gamePattern[index]}`);

    if(userClickedPattern[index] === gamePattern[index]) {
        isWorking = false;
        index += 1;
        if(userClickedPattern.length === gamePattern.length) {
            updateScore();
            nextSequence();
        }
    }else {
        gameOver();
        return;
    }
}

function startGame() {
    $('.cover').fadeOut(330);
    setTimeout(() => {

        popUpTime = 330;
        sequenceTime = 530;

        nextSequence();
    }, 330);
}

function gameOver() {

    $('.cover h1').text('Game over');
    $('.cover h4').text('Score : '+score);
    $('.cover button').text('Retry')
    $('.cover').fadeIn(130);

    gamePattern = [];
    userClickedPattern = [];
    isWorking = false;
    score = 0;
}

function updateScore() {
    score += 12;
    $('#score').text('Score : '+score);

    if(score < 120) {
        popUpTime = 330;
        sequenceTime = 530;
    }else if(score >= 120 && score <= 330) {
        popUpTime = 230;
        sequenceTime = 430;
    }else {
        popUpTime = 160;
        sequenceTime = 300;
    }
    
}

$('button').click(function(){
    startGame();
    $('#score').text('Score : '+score);
});

$('.button').on('click', function() {
    if(!isWorking) {
        let userChosenColor = $(this).attr('id');
        playAudio(userChosenColor);
        checkPattern(userChosenColor);
    }
});

$('.button').on('mouseup', function() {
    if(!isWorking) {$(this).toggleClass('popup');}
});

$('.button').on('mousedown', function() {
    if(!isWorking) {$(this).toggleClass('popup');}
});