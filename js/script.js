"use strict";

//////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////

// Sprite path
const SPRITE_PATH = "img";

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
    this.front = null;
    this.instructions = null;
    this.background = null;
    this.player = null;
    this.computer = null;
  }

  // Initialize the main page image data
  async initFront(currentTime) {
    let img = new Image();

    img.src = SPRITE_PATH + "/car-race-front.png?d=" + currentTime;
    this.front = img.cloneNode(false);
  }

  // Initialize the instructions image data
  async initInstructions(currentTime) {
    let img = new Image();

    img.src = SPRITE_PATH + "/car-race-instructions.png?d=" + currentTime;
    this.instructions = img.cloneNode(false);
  }

  // Initialize the background image data
  async initBackground(currentTime) {
    let img = new Image();

    img.src = SPRITE_PATH + "/car-race-background.png?d=" + currentTime;
    this.background = img.cloneNode(false);
  }

  // Initialize the player image data
  async initPlayer(currentTime) {
    let img = new Image();

    img.src = SPRITE_PATH + "/car-race-player.png?d=" + currentTime;
    this.player = img.cloneNode(false);
  }

  // Initialize the computer image data
  async initComputer(currentTime) {
    let img = new Image();

    img.src = SPRITE_PATH + "/car-race-computer.png?d=" + currentTime;
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
  }

  //Initialize the sprites data
  async initSprites() {
    // Sprite class
    this.sprite = new Sprite();

    // Initialize all of the sprites
    await this.sprite.initialize();
  }

  // Initialize the game data
  initialize() {
    this.background = this.sprite.front;
    this.currentTime = performance.now();
    this.lastRenderTime = this.currentTime;
    this.step = Steps.Front;
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

        break;
    }
  }

  // Render images
  render() {
    // Clear the canvas
    Drawing.clear(this.context);

    // Render the background image of the canvas
    Drawing.renderBackground(this.context, this.background);
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
    // Initialize the sprites data
    this.initSprites();

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
