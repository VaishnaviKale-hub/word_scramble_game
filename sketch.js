const r = require("raylib");

const setup = function () {
  const screen = {
    width: 800,
    height: 500,
    fps: 50,
    background: {
      r: 0,
      g: 170,
      b: 80,
      a: 255,
    },
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(screen.width, screen.height, "Word Scramble Game");
  r.SetTargetFPS(screen.fps);

  const words = ["jump", "super", "salty", "cat", "random"];

  const game = {
    word: getTheWord(words),
    userInput: "",
    result: null,
  };

  game.scrambledWord = scrambleTheWord(game.word);

  return { screen, game };
};


const getTheWord = function (words) {
  const index = Math.floor(Math.random() * words.length);
  return words[index].toLowerCase();
};

const scrambleTheWord = function (word) {
  const letters = word.split("");

  for (let i = letters.length - 1; i > 0; i--) {
    const posA = Math.floor(Math.random() * (i + 1));
    let temp;

    temp = letters[posA];
    letters[posA] = letters[i];
    letters[i] = temp;
  }

  return letters.join("");
};

const isInputCorrect = function (game) {
  const { word, userInput } = game;
  return word === userInput.toLowerCase();
};

const reset = function (game) {
  game.result = null;
  game.userInput = "";
};

const takeUserInput = function (game) {

  if (r.IsKeyPressed(r.KEY_BACKSPACE)) {
    game.userInput = game.userInput.slice(0, -1);
    return;
  }
  if (r.IsKeyPressed(r.KEY_SPACE)) {
    reset(game);
    return;
  }

  let char = r.GetCharPressed();

  while (char !== 0) {
    game.userInput += String.fromCharCode(char);
    char = r.GetCharPressed();
  }

};

const update = function (game) {

  if (r.IsKeyPressed(r.KEY_ENTER)) {
    game.result = isInputCorrect(game);
    return;
  }

  if (game.result !== true) {
    takeUserInput(game);
  }

};

const displayResult = function (result) {
  if (result) {
    r.DrawText("CORRECT!", 345, 300, 25, r.WHITE);
  }
  else {
    r.DrawText("Wrong! Try Again", 315, 300, 25, r.RED);
  }
};

const draw = function (world) {
  const { game: { scrambledWord, userInput, result } } = world;

  r.BeginDrawing();

  r.ClearBackground({
    r: 0,
    g: 170,
    b: 50,
    a: 255,
  });

  // Title
  r.DrawText("Word Scramble Game", 240, 45, 40, r.WHITE);

  // Title underline
  r.DrawLine(280, 95, 520, 95, r.WHITE);

  // Scrambled word
  r.DrawText(scrambledWord.toUpperCase(), 350, 135, 30, r.WHITE);

  // User input
  r.DrawRectangle(265, 185, 270, 45, r.WHITE);
  r.DrawText(userInput, 275, 197, 20, r.BLACK);

  // Result
  r.DrawText("Result:", 360, 260, 25, r.WHITE);

  if (result !== null) {
    displayResult(result);
  }

  // Controls
  r.DrawText("Controls", 360, 345, 18, r.WHITE);
  r.DrawText("BACKSPACE  -  Delete character", 290, 370, 15, r.WHITE);
  r.DrawText("ENTER      -  Check answer", 290, 390, 15, r.WHITE);
  r.DrawText("SPACE      -  Retry same word", 290, 410, 15, r.WHITE);

  r.EndDrawing();
};
const running = function () {
  return !r.WindowShouldClose();
};
const teardown = function () {
  r.CloseWindow();
};

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};