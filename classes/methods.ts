"use strict";

import * as Constants from "../classes/constants";
import * as Enums from "../classes/enums";
import * as Interfaces from "../classes/interfaces";

let lastAcceleratedTime: number = 0;
let lastIncreasedDistance: number = 0;
let lastSpawnedTime: number = 0;
let lastDriveSoundUpdate: number = 0;
let velocity: number = Constants.INITIAL_SPEED;
let computerVelocity: number = Constants.COMPUTER_INITIAL_SPEED;
let spawnTime: number = Constants.INITIAL_SPAWN_TIME;
let activeKeys: Interfaces.ActiveKeys = {
  left: false,
  right: false
};
let animationFrame: number;
let audioTracks: Interfaces.AudioTracks;

export function preload(vueObj: Interfaces.CarRaceData): void {
  let assets = Constants.ASSETS;

  vueObj.assetsCount = assets.length;

  audioTracks = {
    accelerate: new Audio(),
    crashed: new Audio(),
    drive: new Audio(),
    overtake: new Audio(),
    select: new Audio(),
    start: new Audio()
  };

  for (let i = 0; i < vueObj.assetsCount; i++) {
    let asset: string = assets[i];
    let assetName: string = asset.substring(asset.lastIndexOf("/") + 1);

    if (asset.indexOf("~/assets/images") >= 0) {
      let elm: HTMLImageElement = new Image();

      elm.src = require(`~/assets/images/${assetName}`);
      elm.onload = function(evt) {
        vueObj.images.push(assetName);

        loadingProcess(vueObj);
      }
    }
    else if (asset.indexOf("~/assets/audios") >= 0) {
      let elm: HTMLAudioElement = new Audio(require(`~/assets/audios/${assetName}`));
      
      elm.oncanplaythrough = function(evt) {
        vueObj.audios.push(assetName);
        
        loadingProcess(vueObj);
      }
    }
  }
}

export function initialize(vueObj: Interfaces.CarRaceData): void {
  if (vueObj.screen.active === null) {
    setActive(vueObj, Enums.Screen.Loading);
  }
  else {
    setActive(vueObj, Enums.Screen.Front);
  }

  velocity = Constants.INITIAL_SPEED

  vueObj.car.left = (Constants.SCREEN_WIDTH / 2) - (Constants.CAR_WIDTH / 2);
  vueObj.car.rotate = 0;
  vueObj.car.crashed = false;
  vueObj.computer.cars = new Array<Interfaces.CarRaceCar>();
  vueObj.distanceTraveled = 0;
}

export function events(vueObj: Interfaces.CarRaceData, key: Enums.Keys, mode: Enums.KeyMode): void {
  switch (vueObj.screen.active) {
    case Enums.Screen.Front:
      frontEvent(vueObj, key, mode);
      return;
    case Enums.Screen.Instructions:
      instructionsEvent(vueObj, key, mode);
      return;
    case Enums.Screen.Game:
      gameEvent(key, mode);
      return;
    case Enums.Screen.GameOver:
      gameOverEvent(vueObj, key, mode);
      return;
  }
}

export function beginGame(vueObj: Interfaces.CarRaceData): void {
  lastAcceleratedTime = performance.now();
  lastIncreasedDistance = performance.now();
  lastSpawnedTime = performance.now();
  lastDriveSoundUpdate = performance.now();

  velocity = Constants.INITIAL_SPEED;
  computerVelocity = Constants.COMPUTER_INITIAL_SPEED;
  spawnTime = Constants.INITIAL_SPAWN_TIME;

  audioTracks.accelerate.play();
  
  carDriveAudio(vueObj);

  gameLoop(vueObj);
}

function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

function loadingProcess(vueObj: Interfaces.CarRaceData): void {
  vueObj.assetsLoaded++;

  vueObj.loadingProgress = vueObj.assetsLoaded / vueObj.assetsCount * 100;

  if (vueObj.loadingProgress >= 100) {
    // HACK: To be able to see "100% loaded status"
    setTimeout(function() {
      initialize(vueObj);

      setActive(vueObj, Enums.Screen.Front);

      window.addEventListener("keydown", function(evt: KeyboardEvent) {
        events(vueObj, evt.keyCode, Enums.KeyMode.Down);
      });
  
      window.addEventListener("keyup", function(evt: KeyboardEvent) {
        events(vueObj, evt.keyCode, Enums.KeyMode.Up);
      });

      for (let audio of vueObj.audios) {
        let audioName: string = audio.substring(
          audio.lastIndexOf('/') + 1,
          audio.lastIndexOf('.')
        );
  
        if (
          audioName === "accelerate" ||
          audioName === "crashed" ||
          audioName === "drive" ||
          audioName === "overtake" ||
          audioName === "select" ||
          audioName === "start"
        ) {
          audioTracks[audioName] = vueObj.$refs["audio-" + audioName][0];
        }

        if (audioName === "crashed") {
          audioTracks.crashed.addEventListener("ended", function() {
            setActive(vueObj, Enums.Screen.GameOver);
          });
        }
      }
    }, 1);
  }
}

function setActive(vueObj: Interfaces.CarRaceData, active: Enums.Screen): void {
  vueObj.screen.active = active;
  vueObj.screen.name = Enums.Screen[active];
}

function frontEvent(vueObj: Interfaces.CarRaceData, key: Enums.Keys, mode: Enums.KeyMode): void {
  if (key === Enums.Keys.Space && mode === Enums.KeyMode.Down) {
    audioTracks.select.currentTime = 0;
    audioTracks.select.play();

    setActive(vueObj, Enums.Screen.Instructions);
  }
}

function instructionsEvent(vueObj: Interfaces.CarRaceData, key: Enums.Keys, mode: Enums.KeyMode): void {
  if (key === Enums.Keys.Space && mode === Enums.KeyMode.Down) {
    audioTracks.select.currentTime = 0;
    audioTracks.select.play();

    setActive(vueObj, Enums.Screen.Game);

    audioTracks.start.play();
  }
}

function gameEvent(key: Enums.Keys, mode: Enums.KeyMode): void {
  let active: boolean = true;

  if (mode === Enums.KeyMode.Up) {
    active = false;
  }

  switch (key) {
    case Enums.Keys.Left:
      activeKeys.left = active;

      return;
    case Enums.Keys.Right:
      activeKeys.right = active;

      return;
  }
}

function gameLoop(vueObj: Interfaces.CarRaceData): void {
  animationFrame = window.requestAnimationFrame(() => gameLoop(vueObj));

  update(vueObj);
  updateAudio();

  // Supposed to be, I have rendering logic here.
  // But rendering is already done by Vue template,
  // so I removed it.
}

function moveDirection(vueObj: Interfaces.CarRaceData): void {
  if (
    // If left arrow key is pressed
    activeKeys.left === true &&
    // If the left position of car is greater than the left gutter
    vueObj.car.left - Constants.MOVE_SPEED >= Constants.COLLISION_LEFT
  ) {
    vueObj.car.left -= Constants.MOVE_SPEED;
  }

  if (
    // If right arrow key is pressed
    activeKeys.right === true &&
    // If the left position (+width) of car is greated than the right gutter
    vueObj.car.left + Constants.MOVE_SPEED <= Constants.COLLISION_RIGHT
  ) {
    vueObj.car.left += Constants.MOVE_SPEED;
  }

  if (
    (activeKeys.left === true && activeKeys.right === true) ||
    (activeKeys.left === false && activeKeys.right === false)
  ) {
    vueObj.car.rotate = 0;
  }
  else if (activeKeys.left === true) {
    vueObj.car.rotate = -Constants.TURN_ANGLE;
  }
  else if (activeKeys.right === true) {
    vueObj.car.rotate = Constants.TURN_ANGLE;
  }
}

function update(vueObj: Interfaces.CarRaceData): void {
  accelerate(vueObj);
  moveDirection(vueObj);
  spawnComputerCar(vueObj);
  moveComputerCar(vueObj);
}

function accelerate(vueObj: Interfaces.CarRaceData): void {
  if (performance.now() - lastIncreasedDistance > Constants.INCREASE_DISTANCE_TIME) {
    vueObj.distanceTraveled += velocity;

    lastIncreasedDistance = performance.now();

    moveComputerCar(vueObj);
  }

  if (velocity >= Constants.TOP_SPEED) {
    return;
  }

  if (performance.now() - lastAcceleratedTime > Constants.ACCELERATION_TIME) {
    velocity += Constants.ACCELERATION;
    computerVelocity += Constants.COMPUTER_ACCELERATION;

    lastAcceleratedTime = performance.now();
  }
}

function randomCarLane(): number {
  let lane = random(0, 2);

  switch (lane) {
    case 0:
      return Constants.CAR_LANE_1;
    case 1:
      return Constants.CAR_LANE_2;
    case 2:
      return Constants.CAR_LANE_3;
  }

  return 0;
}

function spawnComputerCar(vueObj: Interfaces.CarRaceData): void {
  if (performance.now() - lastSpawnedTime >= spawnTime) {
    vueObj.computer.cars.push({
      width: Constants.CAR_WIDTH,
      height: Constants.CAR_HEIGHT,
      top: -Constants.CAR_HEIGHT,
      left: randomCarLane(),
      rotate: 0,
      overtake: false
    } as Interfaces.CarRaceCar);

    lastSpawnedTime = performance.now();

    if (spawnTime - Constants.SPAWN_TIME_REDUCE > Constants.SPAWN_TIME_LIMIT) {
      spawnTime -= Constants.SPAWN_TIME_REDUCE;
    }
  }
}

function moveComputerCar(vueObj: Interfaces.CarRaceData): void {
  for (let i: number = 0; i < vueObj.computer.cars.length; i++) {
    vueObj.computer.cars[i].top += computerVelocity;

    calculateCollision(vueObj, i);

    if (vueObj.computer.cars[i].top > Constants.SCREEN_HEIGHT) {
      vueObj.computer.cars.splice(i, 1);
    }
  }
}

function calculateCollision(vueObj: Interfaces.CarRaceData, index: number): void {
  let computer = vueObj.computer.cars[index];

  if (computer.top + computer.height >= vueObj.car.top && computer.overtake === false) {
    vueObj.computer.cars[index].overtake = true;
    
    try {
      audioTracks.overtake.currentTime = 0;
    
      audioTracks.overtake.play();
    }
    catch (ex) {
      console.log("Error:", ex);
    }
  }
  
  if (
    computer.top <= vueObj.car.top + vueObj.car.height &&
    computer.top + computer.height >= vueObj.car.top &&
    computer.left <= vueObj.car.left + vueObj.car.width &&
    computer.left + computer.width >= vueObj.car.left
  ) {
    window.cancelAnimationFrame(animationFrame);

    crashAudio(vueObj);
  }
}

function carDriveAudio(vueObj: Interfaces.CarRaceData): void {
  if (audioTracks.drive.paused === true) {
    setTimeout(function() {
      try {
        audioTracks.drive.play();
      }
      catch (ex) {
        console.log("Error:", ex);
      }

      carDriveAudio(vueObj);
    }, 1980);
  }
}

function updateAudio(): void {
  if (performance.now() - lastDriveSoundUpdate >= Constants.CAR_DRIVE_AUDIO_REFRESH) {
    audioTracks.drive.currentTime = 0;
    
    lastDriveSoundUpdate = performance.now();
  }
}

function crashAudio(vueObj: Interfaces.CarRaceData): void {
  try {
    vueObj.car.crashed = true;

    audioTracks.crashed.play();
  }
  catch (ex) {
    console.log("Error:", ex);
  }

  try {
    audioTracks.drive.currentTime = 0;
    audioTracks.drive.pause();
  }
  catch (ex) {
    console.log("Error:", ex);
  }

  try {
    audioTracks.overtake.currentTime = 0;
    audioTracks.overtake.pause();
  }
  catch (ex) {
    console.log("Error:", ex);
  }
}

function gameOverEvent(vueObj: Interfaces.CarRaceData, key: Enums.Keys, mode: Enums.KeyMode): void {
  if (key === Enums.Keys.Space) {
    audioTracks.select.currentTime = 0;
    audioTracks.select.play();
  
    initialize(vueObj);
  }
}
