const r = require("raylib");
const u = require("./game_ui");

const setup = function () {
  const screen = {
    width: 800,
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

  return { screen, game };
};

const getTheWord = function (words) {
  const index = Math.floor(Math.random() * words.length);
  return words[index].toUpperCase();
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
  return word === userInput.toUpperCase();
};

const reset = function (game) {
  game.result = null;
  game.userInput = "";
};

const takeUserInput = function (game) {
  let char = r.GetCharPressed();

  if (r.IsKeyPressed(r.KEY_BACKSPACE)) {
    game.userInput = game.userInput.slice(0, -1);
    return;
  }
  if (r.IsKeyPressed(r.KEY_SPACE)) {
    reset(game);
    return;
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
  const background = { r: 0, g: 150, b: 75, a: 255 };

  r.BeginDrawing();
  r.ClearBackground(background);
  u.drawUI(world.game);
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