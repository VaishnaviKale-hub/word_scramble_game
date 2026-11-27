
const sketch = require("./sketch");

const loop = function (world) {
  while (sketch.running()) {
    sketch.update(world.game, world.words, world.shuffle);
    sketch.draw(world);
  }
};
const main = function () {
  const world = sketch.setup();
  loop(world);
  sketch.teardown();
};
main();