var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
function firstSequence() {
  var randomNumber = Math.floor(4 * Math.random());
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  playSound(randomChoosenColour);
  var buttonId = "#" + randomChoosenColour;
  $(buttonId).addClass("pressed");
  setTimeout(function () {
    $(buttonId).removeClass("pressed");
  }, 100);
}
function nextSequence() {
  firstSequence();
  level++;
  $("h1").text("Level " + level);
}
function playSound(colour) {
  var buttonId = "#" + colour;
  $(buttonId).fadeOut(100).fadeIn(100);
  var audio = new Audio("./sounds/" + colour + ".mp3");
  audio.play();
}
var x = 0;
var high = 0;
function gameOver() {
  $("h1").text("GAME OVER, PRESS ANY KEY OR TAP HERE TO RESTART");
  high = Math.max(high, level - 1);
  $(".h21").text("HIGH SCORE: LEVEL " + high);
  $(".h22").text("YOUR SCORE: LEVEL " + (level - 1));
  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $(document).on("keypress click", function () {
    startOver();
  });
}
function checkAnswer() {
  return JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern);
}
function startGame() {
  $(document).one("keypress click", function () {
    $(".h22").text("");
  });
  $(document).on("keypress click", function () {
    if (level === 0) {
      level++;
      $("h1").text("Level " + level);
      firstSequence();
    }
  });
  $(".btn").click(function () {
    var h1 = $("h1").text();
    if (h1 === "PRESS A KEY OR TAP HERE TO START") {
      return;
    }
    var Id = $(this).attr("id");
    var userChoosenColour = Id;
    userClickedPattern.push(userChoosenColour);
    var buttonId = "#" + Id;
    $(buttonId).addClass("pressed");
    setTimeout(function () {
      $(buttonId).removeClass("pressed");
    }, 100);
    playSound(Id);
    x++;
    if (gamePattern[x - 1] != userClickedPattern[x - 1]) {
      gameOver();
    }
    if (x === level) {
      if (checkAnswer()) {
        setTimeout(function () {
          x = 0;
          userClickedPattern = [];
          nextSequence();
        }, 500);
      }
    }
  });
}
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  x = 0;
  $(document).off("keypress click");
  $(".btn").off("click");
  startGame();
}
startGame();
