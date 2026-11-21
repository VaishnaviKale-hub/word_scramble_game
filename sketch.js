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

  const words = ["jump", "super", "salty"];

  return { screen, words };
};

const update = function (world) {
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

  return letters;
};

const draw = function (world) {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  const word = getTheWord(world.words);
  console.log(scrambleTheWord(word));

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