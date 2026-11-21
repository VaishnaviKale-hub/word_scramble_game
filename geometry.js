const getRandom = function (min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
};

module.exports = {
  getRandom,
};