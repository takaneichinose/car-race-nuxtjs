"use strict";

export const SCREEN_WIDTH: number = 320;
export const SCREEN_HEIGHT: number = 480;

export const CAR_WIDTH: number = 40;
export const CAR_HEIGHT: number = 88;
export const CAR_TOP: number = 360;

export const STOP_LIGHT_WIDTH: number = 100;
export const STOP_LIGHT_HEIGHT: number = 176;

export const SCORE_BOARD_WIDTH: number = 320;
export const SCORE_BOARD_HEIGHT: number = 22;

export const INITIAL_SPEED: number = 10;
export const TOP_SPEED: number = 30;
export const ACCELERATION_TIME: number = 5000;
export const ACCELERATION: number = 3;
export const INCREASE_DISTANCE_TIME: number = 25;

export const MOVE_SPEED: number = 3;
export const COLLISION_LEFT: number = 86;
export const COLLISION_RIGHT: number = 194;
export const TURN_ANGLE: number = 20;

export const INITIAL_SPAWN_TIME: number = 5000;
export const SPAWN_TIME_REDUCE: number = 125;
export const SPAWN_TIME_LIMIT: number = 625;
export const CAR_LANE_1: number = 90;
export const CAR_LANE_2: number = 140;
export const CAR_LANE_3: number = 190;

export const COMPUTER_INCREASE_DISTANCE: number = 50;
export const COMPUTER_INITIAL_SPEED: number = 2;
export const COMPUTER_ACCELERATION: number = 1;

export const CAR_CRASH_WIDTH: number = 88;
export const CAR_CRASH_HEIGHT: number = 88;

export const CAR_DRIVE_AUDIO_REFRESH: number = 1200;

export const SCORE_FACTOR: number = 0.075;

export const ASSETS: Array<string> = [
  "~/assets/images/car-race-background.png",
  "~/assets/images/car-race-character-map.png",
  "~/assets/images/car-race-character-map-template-x1.png",
  "~/assets/images/car-race-character-map-template-x2.png",
  "~/assets/images/car-race-character-map-template-x4.png",
  "~/assets/images/car-race-computer.png",
  "~/assets/images/car-race-front-background.png",
  "~/assets/images/car-race-front-design.png",
  "~/assets/images/car-race-front-title.png",
  "~/assets/images/car-race-instructions.png",
  "~/assets/images/car-race-loading-text.png",
  "~/assets/images/car-race-player.png",
  "~/assets/images/car-race-press-space.png",
  "~/assets/images/car-race-stop-light-1.png",
  "~/assets/images/car-race-stop-light-2.png",
  "~/assets/images/car-race-stop-light-3.png",
  "~/assets/images/car-race-stop-light-4.png",
  "~/assets/images/car-race-crash.png",
  "~/assets/images/car-race-score-board.png",
  "~/assets/images/car-race-press-space-dark.png",
  "~/assets/audios/accelerate.wav",
  "~/assets/audios/crashed.wav",
  "~/assets/audios/drive.wav",
  "~/assets/audios/overtake.wav",
  "~/assets/audios/start.wav",
  "~/assets/audios/select.wav"
];
