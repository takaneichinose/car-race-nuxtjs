"use strict";

//////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////

// Sprite path
const SPRITE_PATH = "img/";
const SPRITE_PREFIX = "car-race-";

// One second
const ONE_SECOND = 1000;

// Frames per second
const FPS = 60;

// Key code map
const Keys = {
  Enter: 13,
  Esc: 27,
  Space: 32,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
};

// Canvas screen map
const Screen = {
  Width: 320,
  Height: 480
};

// Car (player/computer) map
const Car = {
  Width: 48,
  Height: 88
}

// Steps in showing the background image
const Steps = {
  Front: 0,
  Instructions: 1,
  Background: 2,
  GameOver: 3
}

//////////////////////////////////////////////////
// Sprite class
//////////////////////////////////////////////////

class Sprite {
  constructor() {
    this.prefix = SPRITE_PATH + SPRITE_PREFIX;
    this.front = null;
    this.instructions = null;
    this.background = null;
    this.player = null;
    this.computer = null;
    this.characterMap = null;
  }

  // Initialize the main page image data
  async initFront(currentTime) {
    let img = new Image();

    img.src = this.prefix + "front.png?d=" + currentTime;
    this.front = img.cloneNode(false);
  }

  // Initialize the instructions image data
  async initInstructions(currentTime) {
    let img = new Image();

    img.src = this.prefix + "instructions.png?d=" + currentTime;
    this.instructions = img.cloneNode(false);
  }

  // Initialize the background image data
  async initBackground(currentTime) {
    let img = new Image();

    img.src = this.prefix + "background.png?d=" + currentTime;
    this.background = img.cloneNode(false);
  }

  // Initialize the player image data
  async initPlayer(currentTime) {
    let img = new Image();

    img.src = this.prefix + "player.png?d=" + currentTime;
    this.player = img.cloneNode(false);
  }

  // Initialize the computer image data
  async initComputer(currentTime) {
    let img = new Image();

    img.src = this.prefix + "computer.png?d=" + currentTime;
    this.computer = img.cloneNode(false);
  }

  // Initialize the character map
  async initCharacterMap(currentTime) {
    let img = new Image();

    img.src = this.prefix + "character-map.png?d=" + currentTime;
    this.computer = img.cloneNode(false);
  }

  // Initialize all of the sprites
  async initialize() {
    let currentTime = (new Date()).getTime();

    await this.initFront(currentTime);
    await this.initInstructions(currentTime);
    await this.initBackground(currentTime);
    await this.initPlayer(currentTime);
    await this.initComputer(currentTime);
    await this.initCharacterMap(currentTime);
  }
}

//////////////////////////////////////////////////
// Drawing class
//////////////////////////////////////////////////

class Drawing {
  // Clear the canvas
  static clear(context) {
    context.clearRect(0, 0, Screen.Width, Screen.Height);
  }

  // Render the background image of the canvas
  static renderBackground(context, elm) {
    context.drawImage(elm, 0, 0, Screen.Width, Screen.Height);
  }

  // Render the player car
  static renderPlayer(context, elm) {
    if (elm.show === true) {
      context.drawImage(elm.img, elm.x, elm.y, Car.Width, Car.Height);
    }
  }
}

//////////////////////////////////////////////////
// CarRace class
//////////////////////////////////////////////////

class CarRace {
  constructor(elm) {
    this.canvas = document.querySelector(elm);
    this.context = this.canvas.getContext("2d");
    this.background = null;
    this.currentTime = null;
    this.lastRenderTime = null;
    this.step = Steps.Front;
    this.player = {
      img: null,
      x: null,
      y: null,
      show: false
    };
  }

  //Initialize the sprites data
  async initSprites() {
    // Sprite class
    this.sprite = new Sprite();

    // Initialize all of the sprites
    await this.sprite.initialize();
  }

  // Initialize the game data
  async initialize() {
    // Initialize the sprites data
    await this.initSprites();

    this.background = this.sprite.front;
    this.currentTime = performance.now();
    this.lastRenderTime = this.currentTime;
    this.step = Steps.Front;
    this.player = {
      img: this.sprite.player,
      x: (Screen.Width / 2) - (Car.Width / 2),
      y: Screen.Height - Car.Height - 30,
      show: false
    };
  }

  // Change shown background image
  changeSteps() {
    switch (this.step) {
      case Steps.Front:
        this.background = this.sprite.front;

        break;
      case Steps.Instructions:
        this.background = this.sprite.instructions;

        break;
      case Steps.Background:
        this.background = this.sprite.background;
        this.player.show = true;

        break;
    }
  }

  // Render images
  render() {
    // Clear the canvas
    Drawing.clear(this.context);

    // Render the background image of the canvas
    Drawing.renderBackground(this.context, this.background);

    // Render the player car
    Drawing.renderPlayer(this.context, this.player)
  }

  // Animate the objects
  animate() {
    window.requestAnimationFrame(() => this.animate());

    this.currentTime = performance.now();

    // Change shown background image
    this.changeSteps()

    // console.log(this.currentTime, this.lastRenderTime);
    if (this.currentTime - this.lastRenderTime > ONE_SECOND / FPS) {
      this.lastRenderTime = this.currentTime;

      // Render images
      this.render();
    }
  }

  // The first method to be called
  main() {
    // Initialize the game data
    this.initialize();

    // Animate the objects
    this.animate();
  }
}

//////////////////////////////////////////////////
// Main
//////////////////////////////////////////////////

let carRace = new CarRace("#canvas");

carRace.main();

//////////////////////////////////////////////////
// Events
//////////////////////////////////////////////////

window.addEventListener("keydown", function(evt) {

});

window.addEventListener("keyup", function(evt) {
  switch (evt.keyCode) {
    case Keys.Space:
      if (carRace.step < Steps.Background) {
        // If the current step is less than background

        carRace.step++;
      }

      break;
    case Keys.Left:

      break;
    case Keys.Right:

      break;
    case Keys.Esc:
      // Initialize the game data
      carRace.initialize();

      break;
  }
});
