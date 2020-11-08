"use strict";

import * as Enums from "./enums";

export interface CarRaceScreen {
  active: Enums.Screen,
  name: String,
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
  crashed: boolean
}

export interface CarRaceStopLight {
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
  crash: CarRaceCrash,
  distanceTraveled: number,
  audios: Array<String>,
  $refs: any
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
  crash: CarRaceCrash,
  distanceTraveled: number,
  audios: Array<String>,
  $refs: any,
  stoplightAnimationEnd: void
}

export interface ActiveKeys {
  left: boolean,
  right: boolean
}
