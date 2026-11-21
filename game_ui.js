const r = require("raylib");

const displayResult = function (result) {
  const text = result ? "CORRECT!" : "Wrong! Try Again";
  const fontSize = 24;
  const textWidth = r.MeasureText(text, fontSize);
  const x = (800 - textWidth) / 2;
  const resultColor = result ? r.WHITE : r.RED;

  r.DrawText(text, x, 298, fontSize, resultColor);
};

const drawUI = function (game) {
  const { scrambledWord, userInput, result, attempts } = game;
  const scrambledWidth = r.MeasureText(scrambledWord, 30);
  const scrambledX = (800 - scrambledWidth) / 2;
  const inputWidth = r.MeasureText(userInput, 20);
  const inputX = Math.max(250, (800 - inputWidth) / 2);

  // Header
  r.DrawText("WORD SCRAMBLE", 267, 35, 32, r.WHITE);
  r.DrawLine(280, 78, 520, 78, r.YELLOW);

  // Instruction
  r.DrawText("Unscramble the word!", 300, 105, 18, r.WHITE);

  //Attempts
  r.DrawText(`Attempts: ${attempts}`, 345, 330, 18, r.WHITE);

  // Scrambled word
  r.DrawRectangle(250, 135, 300, 55, r.DARKGREEN);
  r.DrawRectangleLines(250, 135, 300, 55, r.YELLOW);
  r.DrawText(scrambledWord, scrambledX, 148, 30, r.WHITE);

  // Answer
  r.DrawText("Your Answer", 330, 210, 18, r.WHITE);

  r.DrawRectangle(235, 235, 330, 45, r.WHITE);
  r.DrawRectangleLines(235, 235, 330, 45, r.YELLOW);
  r.DrawText(userInput, inputX, 247, 20, r.BLACK);

  // Result
  if (result !== null) {
    displayResult(result);
  }

  // Controls
  r.DrawRectangle(150, 365, 500, 105, r.DARKGREEN);
  r.DrawRectangleLines(150, 365, 500, 105, r.YELLOW);

  r.DrawText("CONTROLS", 350, 378, 18, r.YELLOW);

  r.DrawText("BACKSPACE", 190, 418, 13, r.BLACK);
  r.DrawText("ENTER", 360, 418, 13, r.BLACK);
  r.DrawText("SPACE", 507, 418, 13, r.BLACK);

  r.DrawText("Delete", 215, 445, 12, r.WHITE);
  r.DrawText("Check", 370, 445, 12, r.WHITE);
  r.DrawText("Retry", 515, 445, 12, r.WHITE);
};

module.exports = {
  drawUI,
};