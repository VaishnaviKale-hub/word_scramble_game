const r = require("raylib");
const u = require("./game_ui");
const w = require("./word_collection");

const setup = function () {
  const screen = {
    width: 800,
    height: 500,
    fps: 50,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(screen.width, screen.height, "Word Scramble Game");
  r.SetTargetFPS(screen.fps);

  const words = w.words;
  const game = {
    word: getRandomWord(words),
    userInput: "",
    result: null,
    attempts: 0,
  };

  game.scrambledWord = scrambleTheWord(game.word);

  return { screen, words, game };
};

const getRandomWord = function (words) {
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

const isAnswerCorrect = function (game) {
  const { word, userInput } = game;
  return word === userInput.toUpperCase();
};

const resetAnswer = function (game) {
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
    resetAnswer(game);
    return;
  }
  while (char !== 0) {
    game.userInput += String.fromCharCode(char);
    char = r.GetCharPressed();
  }
};

const handleKeyboardInput = function (game, words) {
  if (r.IsKeyPressed(r.KEY_ENTER)) {
    game.attempts++;
    game.result = isAnswerCorrect(game);
    return;
  }

  if (r.IsKeyPressed(r.KEY_RIGHT) && game.result === true) {
    moveToNextWord(game, words);
  }

  if (game.result !== true) {
    takeUserInput(game);
  }

};

const moveToNextWord = function (game, words) {
  game.word = getRandomWord(words);
  game.scrambledWord = scrambleTheWord(game.word);
  game.attempts = 0;
  resetAnswer(game);
};

const update = function (game, words) {
  handleKeyboardInput(game, words);
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