const r = require("raylib");
const g = require("./geometry");

const setup = function () {
  const screen = {
    width: 500,
    height: 500,
    fps: 3,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(screen.width, screen.height, "Word Scramble Game");
  r.SetTargetFPS(screen.fps);

  const words = ["jump", "super", "salty", "cat", "random"];
  const game = {
    word: getTheWord(words),
    userInput: "",
  };
  game.scrambledWord = scrambleTheWord(game.word);

  return { screen, words, game };
};

const update = function (world) {
};

const getTheWord = function (words) {
  const index = Math.floor(Math.random() * words.length);
  const word = words[index].toUpperCase();

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

const takeUserInput = function (game) {
  const char = r.GetKeyPressed();

  if (r.IsKeyPressed(r.KEY_ENTER)) return;

  if (char >= r.KEY_A && char <= r.KEY_Z) {
    game.userInput += String.fromCharCode(char);
  }


};

const draw = function (world) {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  takeUserInput(world.game);
  r.DrawText(`${world.game.userInput}`, 100, 100, 40, r.BLACK);

  // const key = r.GetKeyPressed();
  // console.log(String.fromCharCode(key));
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