"use strict";

const data = {
  fps: 25,
  speed: 25,
  speedDiff: 10,
  canvas: {
    width: 320,
    height: 480
  },
  car1: {
    width: 80,
    height: 120,
    turn: 35,
    image: base64ToImg("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAB4CAYAAAES6UVgAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+ALAQYyDYKwsygAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAABM1JREFUeNrtnLGL3EYUxn9S1sRFFpbksFFsSGmz/4APN07cHITDJLg4cOMiKQzmCsMdJEVc+B9w4+JgO4PBENyk2TJujMFdXIYUd02OYFKEDbi44EkhaU+rk1Yj7Wg1e/d98Ni7lTTz7TdvZp7ejAQncRU4AvrZL4PM34ZyBGF6kik5LfneBBalAdAD/gKIoqj0pMPDQ8Ioii5ggRBL9LLFOynR/YmBjYYzP6ZSxzpVY1t9Hi+BUVmJ80oNpvIYU151eqyePPOkSeUJoigy7t2sysWiKFodN7PR0X3VZXiQFFBl/Xnu2DOGI4AgsK85HQSDIC5roR5TgB8DYB14baN6VYukDvEahwijKFqIWb4T9IpoL8QQxziDBc70UVd+6Bx/Wg4EVmYbEtWdTediB/gH+APYbFqiacooLCiozk83yWh1Ent7GGMwe3v2DWBMbMD4RE3DYXxwOGxUoAEutzFiB6HDwgCG067notutyPDlaj6pHVh19pOtb0U0SanAlY0cnPaUMzQeet8oIXDDYXk3nM/LTS76Apg0jB932ghwb7oMcAusWduncVUmtnJuGxvHddy+ze/WIem7d8cXGhP/3wbBbB0ZIR6WEdvKXnz9Oub9+/izzSYejWKravrvW/azxv5ZOCy4jBabTiIJ/gspSHt6hF6YNK+3CPEcvay/uQrXXd3prIaClr1JPiiCIiiCItgRnN8nLmUm8SgelA+qk3ih4JrvCs7ctPvGzXsfXBR94vXGEfHa4xHxOuRL4kzW1S5I7TTMEkyIU3etKeUypfHAJbk2cy83FyG2zhKTRLXw+DH7ac5ue7s9YrncoPWIMi5JLDq13d3ZOnZ3MWXRVRYPKc98OrWDg9k6Dg6qm/sy81OzTm0wmK1jMKj2yZkCxuPY2uwcly5hJpP4M3dsK0/uBzxM/y5rrGtq08Tq0FOC0yT6Ub57e3TTFIQ2Y0+HWPc9HvzOd4K3fCd4QffFC+dm0iHFxzUSpT5E0NsEppbCRFAERVAERVAERVAERVAELbESy7Grd0+iTRXqxSIogppJpODpamI8bubp+5YCz4h9nXJy/ZoE1y17+vdu1cVF4BvgKe7Xlp8mZV88DUKdB74F9ul+0X4/4XLeZ8E+Bu7j786HvN1POHeKAfB8hUQrs+fJb1kO7t3j5/E4fmp2PG7/yVla3pY1GsVbs0YjzJUr/NKWbufW13mb3xCXtTov1Ona8pvu8ra2xm/AOVfxxDMKHijPW1sPmLOEbZV5y2yzfFYVhM6LszaBD8AdgBcv5itdddwnPHliffxOosFmXa97U9Ry29vFLdbmFmaW8G6HrG1slF7zpsgb8198QvwsgFCOPvBvURfuSzwrTMi8WDTIfH6QNrVzRSZdenhUdXZXyxFdwWJL2CPgpwD4FPhbAtYWEOCzkIKHIQRrbIXAXenQGHdD4Jp0aIxryvg6mIoFCdgdekXhiU/b4n1CkVbyQHVhCSgBz/Qk4vjeUB4oSEAJKAEloCABJaAElICCBJSAElACChJQAkrAUwvvH4iUB0pAYR6s10S0P1AeqC4sASWgIAEloO5E5IHCMT5KvPBLSdG8C5MI+KvkqI2v8l98Drxi9V8k0aa9SnSa8cA8NLHM77GaRDQLe4L/AQwSmpBDGIdrAAAAAElFTkSuQmCC"),
    position: {
      x: 120,
      y: 340
    }
  },
  car2: {
    width: 80,
    height: 120,
    distance: 320,
    image: base64ToImg("data:image/png;base64,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")
  },
  line: {
    width: 10,
    height: 50,
    distance: 100,
    pos1: 105,
    pos2: 205,
    color: "#efefef"
  },
  moves: [20, 120, 220],
  score: 1,
  grace: 10,
  increaseSpeedTime: 5000
};
var game = false;
var die = false;
var car1Move = 0;
var car1Turn = 0;
var score = 0;
var increaseSpeed = -1;
var lines = [];
var car1 = [];
var car2 = [];
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var instruction = document.querySelector("#instruction");
var scoreText = document.querySelector("#score");
var lose = document.querySelector("#lose");

window.addEventListener("keydown", function(evt) {
  evt.preventDefault();

  if (!game) {
    if (evt.keyCode === 13 || evt.keyCode === 32) {
      game = true;
      instruction.style.display = "none";
      lose.style.display = "none";

      initialize();
    }
  }

  if (car1Move <= 0 && car1Turn <= 0) {
    if (evt.keyCode === 37) {
      if (car1[0] === data.moves[1]) {
        car1Move = data.moves[0];
        car1Turn = 1;
      }
      else if (car1[0] === data.moves[2]) {
        car1Move = data.moves[1];
        car1Turn = 1;
      }
    }
    else if (evt.keyCode === 39) {
      if (car1[0] === data.moves[0]) {
        car1Move = data.moves[1];
        car1Turn = 2;
      }
      else if (car1[0] === data.moves[1]) {
        car1Move = data.moves[2];
        car1Turn = 2;
      }
    }
  }
});

function base64ToImg(value) {
  var img = new Image();
  img.src = value;
  return img;
}

function clearCanvas() {
  context.clearRect(0, 0, data.canvas.width, data.canvas.height);
}

function initLines() {
  var y = data.canvas.height - data.line.height;

  while (y >= 0) {
    lines.push([
      [data.line.pos1, y, data.line.width, data.line.height],
      [data.line.pos2, y, data.line.width, data.line.height]
    ]);

    y -= data.line.distance;
  }
}

function initCar1() {
  car1 = [data.car1.position.x, data.car1.position.y, data.car1.width, data.car1.height];
}

function initCar2() {
  for (var i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
    var random = data.moves[Math.floor(Math.random() * 3)];

    if (car2.length > 0) {
      if (random === car2[car2.length - 1][1]) {
        i--;
      }
      else {
        car2.push([random, data.car2.height * -1]);
      }
    }
    else {
      car2.push([random, data.car2.height * -1]);
    }
  }
}

function drawLines() {
  var remove = false;

  context.fillStyle = data.line.color;

  for (var i = 0; i < lines.length; i++) {
    context.fillRect(lines[i][0][0], lines[i][0][1], lines[i][0][2], lines[i][0][3]);
    context.fillRect(lines[i][1][0], lines[i][1][1], lines[i][1][2], lines[i][1][3]);

    if (lines[i][0][1] > data.canvas.height) {
      remove = i;
    }
    else {
      lines[i][0][1] += data.speed + data.speedDiff + increaseSpeed;
      lines[i][1][1] += data.speed + data.speedDiff + increaseSpeed;
    }
  }

  if (lines[lines.length - 1][0][1] > data.line.distance - data.line.height) {
    lines.push([
      [data.line.pos1, (data.line.height * -1), data.line.width, data.line.height],
      [data.line.pos2, (data.line.height * -1), data.line.width, data.line.height]
    ]);
  }

  if (remove) {
    lines.splice(remove, 1);
  }
}

function drawCar1() {
  if (car1Move > 0 && car1Turn > 0) {
    if (car1Turn === 1) {
      if (car1[0] > car1Move) {
        car1[0] -= data.car1.turn;
      }
      else {
        car1[0] = car1Move;
        car1Move = 0;
        car1Turn = 0;
      }
    }
    else if (car1Turn === 2) {
      if (car1[0] < car1Move) {
        car1[0] += data.car1.turn;
      }
      else {
        car1[0] = car1Move;
        car1Move = 0;
        car1Turn = 0;
      }
    }
  }
  context.drawImage(data.car1.image, car1[0], car1[1], car1[2], car1[3]);
}

function drawCar2() {
  var remove = false;

  for (var i = 0; i < car2.length; i++) {
    if (car2[i][1] > data.canvas.height) {
      remove = i;
    }
    else {
      car2[i][1] += data.speed - data.speedDiff + increaseSpeed;
    }
    context.drawImage(data.car2.image, car2[i][0], car2[i][1], data.car2.width, data.car2.height);
  }

  if (car2[car2.length - 1][1] > data.car2.distance) {
    initCar2();
  }

  if (remove) {
    car2.splice(remove, 1);
  }
}

function collision() {
  for (var i = 0; i < car2.length; i++) {
    if (
      car1[0] + data.grace <= car2[i][0] + data.car2.width
      && car1[0] + data.car1.width - data.grace >= car2[i][0]
      && car1[1] + data.grace <= car2[i][1] + data.car2.height
      && car1[1] + data.car2.height - data.grace >= car2[i][1]
    ) {
      die = true;
      game = false;
      instruction.style.display = "block";
      lose.style.display = "block";
    }
  }
}

function incrementScore() {
  score += data.score;

  scoreText.innerHTML = score;
}

function render(callback) {
  setTimeout(function() {
    requestAnimationFrame(render);

    if ((Math.round(performance.now() / 100) * 100) % data.increaseSpeedTime === 0) {
      increaseSpeed++;
    }

    if (!die && game) {
      clearCanvas();
      drawLines();
      drawCar1();
      drawCar2();
      collision();
      incrementScore();
    }
  }, 1000 / data.fps);
}

function initialize() {
  die = false;
  score = 0;
  car1Move = 0;
  car1Turn = 0;
  increaseSpeed = -1;
  lines = [];
  car1 = [];
  car2 = [];

  initLines();
  initCar1();
  initCar2();
  clearCanvas();
}

render();
