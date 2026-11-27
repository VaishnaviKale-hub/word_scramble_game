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

  let shuffledWords = [];
  let currentIndex = 0;

  const game = {
    word: getRandomWord(words, { shuffledWords, currentIndex }),
    userInput: "",
    result: null,
    attempts: 0,
  };


  game.scrambledWord = scrambleTheWord(game.word);

  return { screen, words, game, shuffledWords, currentIndex };
};

const shuffleWords = function (words, shuffledWords) {

  shuffledWords = [...words];

  for (let i = shuffledWords.length - 1; i > 0; i--) {

    const randomPos = Math.floor(Math.random() * (i + 1));

    [shuffledWords[i], shuffledWords[randomPos]] =
      [shuffledWords[randomPos], shuffledWords[i]];
  }
  return shuffledWords;

};

const getRandomWord = function (words, { shuffledWords, currentIndex }) {

  if (currentIndex >= shuffledWords.length) {
    shuffledWords = shuffleWords(words, shuffledWords);
    currentIndex = 0;
  }

  return shuffledWords[currentIndex++].toUpperCase();
};

const scrambleTheWord = function (word) {
  const letters = word.split("");

  for (let i = letters.length - 1; i > 0; i--) {
    const randomPos = Math.floor(Math.random() * (i + 1));

    [letters[i], letters[randomPos]] = [letters[randomPos], letters[i]];
  }

  const scrambledWord = "".concat(...letters);

  return scrambledWord != word ? scrambledWord : scrambleTheWord(word);

};

const isAnswerCorrect = function (game) {
  const { word, userInput } = game;
  return word === userInput.toUpperCase();
};

const resetAnswer = function (game) {
  game.result = null;
  game.userInput = "";
};

const readUserInput = function (game) {
  let char = r.GetCharPressed();

  while (char !== 0) {
    game.userInput += String.fromCharCode(char);
    char = r.GetCharPressed();
  }
};

const handleEnter = function (game) {
  if (!game.result) {

    if (game.userInput.length > 0) {
      game.attempts++;
    }
  }
  game.result = isAnswerCorrect(game);
};

const shouldMoveToNextWord = function (game) {
  return r.IsKeyPressed(r.KEY_RIGHT) && game.result === true;
};

const moveToNextWord = function (game, words) {
  game.word = getRandomWord(words);
  game.scrambledWord = scrambleTheWord(game.word);
  game.attempts = 0;
  resetAnswer(game);
};

const handleKeyboardInput = function (game, words) {
  if (r.IsKeyPressed(r.KEY_ENTER)) {
    handleEnter(game);
    return;
  }

  if (shouldMoveToNextWord(game)) {
    moveToNextWord(game, words);
    return;
  }

  if (r.IsKeyPressed(r.KEY_BACKSPACE)) {
    game.userInput = game.userInput.slice(0, -1);
    return;
  }

  if (r.IsKeyPressed(r.KEY_SPACE)) {
    resetAnswer(game);
    return;
  }

  if (game.result !== true) {
    readUserInput(game);
  }
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

