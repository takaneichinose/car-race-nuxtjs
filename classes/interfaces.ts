"use strict";

import * as Enums from "./enums";

export interface CarRaceScreen {
  active: Enums.Screen,
  name: string,
  width: number,
  height: number,
  enum: any
}

export interface CarRaceCar {
  width: number,
  height: number,
  top: number,
  left: number,
  rotate: number,
  crashed: boolean,
  overtake: boolean
}

export interface CarRaceStopLight {
  width: number,
  height: number
}

export interface CarRaceScoreBoard {
  width: number,
  height: number
}

export interface CarRaceComputer {
  cars: Array<CarRaceCar>
}

export interface CarRaceCrash {
  width: number,
  height: number
}

export interface CarRaceData {
  assetsCount: number,
  assetsLoaded: number,
  loadingProgress: number,
  screen: CarRaceScreen,
  car: CarRaceCar,
  computer: CarRaceComputer,
  stopLight: CarRaceStopLight,
  scoreBoard: CarRaceScoreBoard,
  crash: CarRaceCrash,
  distanceTraveled: number,
  images: Array<string>,
  audios: Array<string>,
  $refs: any,
  scoreFactor: number
}

export interface CarRaceMethods {
  stoplightAnimationEnd: void
}

export interface CarRace {
  assetsCount: number,
  assetsLoaded: number,
  loadingProgress: number,
  screen: CarRaceScreen,
  car: CarRaceCar,
  computer: CarRaceComputer,
  stopLight: CarRaceStopLight,
  scoreBoard: CarRaceScoreBoard,
  crash: CarRaceCrash,
  distanceTraveled: number,
  images: Array<string>,
  audios: Array<string>,
  $refs: any,
  scoreFactor: number,
  stoplightAnimationEnd: void
}

export interface ActiveKeys {
  left: boolean,
  right: boolean
}

export interface AudioTracks {
  accelerate: HTMLAudioElement,
  crashed: HTMLAudioElement,
  drive: HTMLAudioElement,
  overtake: HTMLAudioElement,
  select: HTMLAudioElement,
  start: HTMLAudioElement
}
