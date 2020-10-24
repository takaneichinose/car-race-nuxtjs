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
	rotate: number
}

export interface CarRaceStopLight {
	width: number,
	height: number
}

export interface CarRaceData {
	assetsCount: number,
	assetsLoaded: number,
	loadingProgress: number,
	screen: CarRaceScreen,
	car: CarRaceCar,
	stopLight: CarRaceStopLight,
	distanceTraveled: number
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
	stopLight: CarRaceStopLight,
	distanceTraveled: number,
	stoplightAnimationEnd: void
}

export interface ActiveKeys {
	left: boolean,
	right: boolean
}
