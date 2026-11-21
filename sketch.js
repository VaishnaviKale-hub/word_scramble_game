const r = require("raylib");
const g = require("./geometry");

const setup = function () {
  const screen = {
    width: 500,
    height: 500,
    fps: 50,
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

  return { screen, words, game };
};


const getTheWord = function (words) {
  const index = Math.floor(Math.random() * words.length);
  const word = words[index].toLowerCase();

  return word;
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


const displayResult = function (game) {
  if (game.result) {
    r.DrawText("CORRECT!", 100, 300, 40, r.GREEN);
  }
  else {
    r.DrawText("Wrong! Try Again", 100, 300, 40, r.RED);
  }
};

const takeUserInput = function (game) {
  let char = r.GetCharPressed();

  if (r.IsKeyPressed(r.KEY_BACKSPACE)) {
    game.userInput = game.userInput.slice(0, game.userInput.length - 1);
  }

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

const draw = function (world) {
  const { game: { scrambledWord, userInput, result } } = world;

  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  r.DrawText(`${scrambledWord}`, 100, 100, 40, r.BLUE);
  r.DrawText(`${userInput}`, 100, 200, 40, r.BLACK);

  if (result !== null) {
    displayResult(world.game);
  }

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