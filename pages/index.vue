<template>
  <div class="screen"
       v-bind:style="{
         '--width': screen.width + 'px',
         '--height': screen.height + 'px'
       }">
    <audio v-for="(audio, i) in audios"
           v-bind:src="audio"
           v-bind:key="i"
           v-bind:ref="
             'audio-' +
             audio.substring(
               audio.lastIndexOf('/') + 1,
               audio.lastIndexOf('.')
             )">
    </audio>
    <transition-group tag="div" name="fade">
      <div class="screen-content screen-Loading"
           v-bind:key="screen.enum.Loading"
           v-if="screen.active === screen.enum.Loading">
        <div class="loading-bar"
             v-bind:style="'--loading-progress: ' + loadingProgress + '%'">
        </div>
        <div class="text text-loading">
          <div v-for="(c, i) in 'LOADING'.split('')"
               v-bind:key="i"
               v-bind:class="'char-x4-' + c"></div>
        </div>
      </div>
      <div class="screen-content screen-Front"
           v-bind:class="'screen-' + screen.name"
           v-bind:key="screen.enum.Front"
           v-if="screen.active === screen.enum.Front">
        <div class="press-space"></div>
      </div>
      <div class="screen-content screen-Instructions"
           v-bind:key="screen.enum.Instructions"
           v-if="screen.active === screen.enum.Instructions">
        <div class="press-space"></div>
      </div>
      <div class="screen-content screen-Game"
           v-bind:style="{
             '--y': (distanceTraveled % screen.height) + 'px'
           }"
           v-bind:key="screen.enum.Game"
           v-if="screen.active === screen.enum.Game">
        <div class="car car-computer"
             v-for="(computer, index) in computer.cars"
             v-bind:key="index"
             v-bind:style="{
               '--width': computer.width + 'px',
               '--height': computer.height + 'px',
               '--top': computer.top + 'px',
               '--left': computer.left + 'px',
               '--rotate': computer.rotate + 'deg'
             }"></div>
        <div class="car car-player"
             v-bind:class="{'car-crash': car.crashed}"
             v-bind:style="{
               '--width': car.width + 'px',
               '--height': car.height + 'px',
               '--top': car.top + 'px',
               '--left': car.left + 'px',
               '--rotate': car.rotate + 'deg',
               '--crash-width': crash.width + 'px',
               '--crash-height': crash.height + 'px',
             }"></div>
        <div class="score-board"
             v-bind:style="{
               '--width': scoreBoard.width + 'px',
               '--height': scoreBoard.height + 'px',
             }">
          <div class="text text-score">
            <div v-for="(c, i) in Math.floor(distanceTraveled * scoreFactor).toString().split('')"
                v-bind:key="i"
                v-bind:class="'char-x2-' + c"></div>
            <div class="char-x2-M"></div>
          </div>
        </div>
        <div class="stop-light"
             v-bind:style="{
               '--width': stopLight.width + 'px',
               '--height': stopLight.height + 'px'
             }"
             v-on:animationend="stoplightAnimationEnd"></div>
      </div>
      <div class="screen-content screen-GameOver"
           v-bind:key="screen.enum.GameOver"
           v-if="screen.active === screen.enum.GameOver">
        <div class="text text-gameover" style="--top: 220px;">
          <div v-for="(c, i) in 'YOU'.split('')"
               v-bind:key="'score-7-' + i"
               v-bind:class="'char-border-x2-' + c"></div>
          <div class="spacer-border-x2"></div>
          <div v-for="(c, i) in 'COLLIDED'.split('')"
               v-bind:key="'score-6-' + i"
               v-bind:class="'char-border-x2-' + c"></div>
          <div class="spacer-border-x2"></div>
          <div v-for="(c, i) in 'WITH'.split('')"
               v-bind:key="'score-5-' + i"
               v-bind:class="'char-border-x2-' + c"></div>
        </div>
        <div class="text text-gameover" style="--top: 250px;">
          <div v-for="(c, i) in 'OTHER'.split('')"
               v-bind:key="'score-4-' + i"
               v-bind:class="'char-border-x2-' + c"></div>
          <div class="spacer-border-x2"></div>
          <div v-for="(c, i) in 'VEHICLE'.split('')"
               v-bind:key="'score-3-' + i"
               v-bind:class="'char-border-x2-' + c"></div>
          <div class="spacer-border-x2"></div>
        </div>
        <div class="text text-gameover" style="--top: 280px;">
          <div v-for="(c, i) in 'DISTANCE'.split('')"
               v-bind:key="'score-2-' + i"
               v-bind:class="'char-border-x2-' + c"></div>
          <div class="spacer-border-x2"></div>
          <div v-for="(c, i) in Math.floor(distanceTraveled * scoreFactor).toString().split('')"
               v-bind:key="'score-1-' + i"
               v-bind:class="'char-border-x2-' + c"></div>
          <div class="char-border-x2-M"></div>
        </div>
        <div class="press-space"></div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
"use strict";

import Vue, { PropOptions } from "vue";
import * as Constants from "../classes/constants";
import * as Enums from "../classes/enums";
import * as Interfaces from "../classes/interfaces";
import * as Methods from "../classes/methods";

export default Vue.extend({
  data(): Interfaces.CarRaceData {
    return {
      assetsCount: 0 as number,
      assetsLoaded: 0 as number,
      loadingProgress: 0 as number,
      screen: {
        active: Enums.Screen.Loading,
        name: "",
        width: Constants.SCREEN_WIDTH,
        height: Constants.SCREEN_HEIGHT,
        enum: Enums.Screen
      } as Interfaces.CarRaceScreen,
      car: {
        width: Constants.CAR_WIDTH,
        height: Constants.CAR_HEIGHT,
        top: Constants.CAR_TOP,
        left: 0,
        rotate: 0,
        crashed: false,
        overtake: false
      } as Interfaces.CarRaceCar,
      computer: {
        cars: new Array<Interfaces.CarRaceCar>()
      } as Interfaces.CarRaceComputer,
      stopLight: {
        width: Constants.STOP_LIGHT_WIDTH,
        height: Constants.STOP_LIGHT_HEIGHT
      } as Interfaces.CarRaceStopLight,
      scoreBoard: {
        width: Constants.SCORE_BOARD_WIDTH,
        height: Constants.SCORE_BOARD_HEIGHT
      } as Interfaces.CarRaceScoreBoard,
      crash: {
        width: Constants.CAR_CRASH_WIDTH,
        height: Constants.CAR_CRASH_HEIGHT
      } as Interfaces.CarRaceCrash,
      audios: new Array<String>(),
      distanceTraveled: 0,
      scoreFactor: Constants.SCORE_FACTOR
    } as Interfaces.CarRaceData
  },
  methods: {
    stoplightAnimationEnd(evt: AnimationEvent): void {
      Methods.beginGame(this);
    }
  },
  mounted() {
    Methods.preload(this);
  }
});
</script>

<style lang="scss">
  @import "/assets/char-map.scss";
  @import "/assets/common.scss";
  @import "/assets/keyframes.scss";
  @import "/assets/screen-Loading.scss";
  @import "/assets/screen-Front.scss";
  @import "/assets/screen-Instructions.scss";
  @import "/assets/screen-Game.scss";
  @import "/assets/screen-GameOver.scss";
</style>
