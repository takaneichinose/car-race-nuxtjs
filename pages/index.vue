<template>
	<div class="screen"
	     v-bind:style="{
				 '--width': screen.width + 'px',
				 '--height': screen.height + 'px'
			 }">
		<transition-group tag="div" name="fade">
			<div class="screen-content"
			     v-bind:class="'screen-' + screen.name"
			     v-bind:key="enums.Screen.Loading"
					 v-if="screen.active === enums.Screen.Loading">
				<div class="loading-bar"
						 v-bind:style="'--loading-progress: ' + loadingProgress + '%'">
				</div>
				<div class="text text-loading">
					<div v-for="(c, i) in 'LOADING'.split('')"
							 v-bind:key="i"
							 v-bind:class="'char-x4-' + c"></div>
				</div>
			</div>
			<div class="screen-content"
			     v-bind:class="'screen-' + screen.name"
			     v-bind:key="enums.Screen.Front"
					 v-if="screen.active === enums.Screen.Front">
				<div class="press-space"></div>
			</div>
			<div class="screen-content"
			     v-bind:class="'screen-' + screen.name"
			     v-bind:key="enums.Screen.Instructions"
					 v-if="screen.active === enums.Screen.Instructions">
				<div class="press-space"></div>
			</div>
			<div class="screen-content"
			     v-bind:class="'screen-' + screen.name"
			     v-bind:key="enums.Screen.Game"
					 v-if="screen.active === enums.Screen.Game">
				<div class="car car-player"
				     v-bind:style="{
							 '--width': car.width + 'px',
							 '--height': car.height + 'px',
							 '--top': car.top + 'px',
							 '--left': car.left + 'px'
						 }"></div>
				<div class="stop-light"
				     v-bind:style="{
							 '--width': stopLight.width + 'px',
							 '--height': stopLight.height + 'px'
						 }"
						 v-on:animationend="stoplightAnimationEnd"></div>
			</div>
		</transition-group>
	</div>
</template>

<script>
import * as Constants from "../classes/constants";
import * as Enums from "../classes/enums";
import * as Methods from "../classes/methods";

export default {
	data() {
		return {
			enums: Enums,
			assetsCount: 0,
			assetsLoaded: 0,
			loadingProgress: 0,
			screen: {
				active: null,
				name: null,
				width: Constants.SCREEN_WIDTH,
				height: Constants.SCREEN_HEIGHT
			},
			car: {
				width: Constants.CAR_WIDTH,
				height: Constants.CAR_HEIGHT,
				top: Constants.CAR_TOP,
				left: 0
			},
			stopLight: {
				width: Constants.STOP_LIGHT_WIDTH,
				height: Constants.STOP_LIGHT_HEIGHT
			}
		}
	},
	methods: {
		preload() {
			let self = this;
			let assets = Constants.ASSETS;

			self.assetsCount = assets.length;

			setTimeout(() => {
				for (let i = 0; i < self.assetsCount; i++) {
					let img = new Image();
	
					img.src = assets[i];
					img.onload = function(evt) {
						self.loadingProcess();
					}
				}
			}, Constants.PRELOAD_WAITTIME);
		},
		loadingProcess() {
			let self = this;

			self.assetsLoaded++;

			self.loadingProgress = self.assetsLoaded / self.assetsCount * 100;

			if (self.loadingProgress >= 100) {
				// HACK: To make 100% loaded available to see
				setTimeout(function() {
					self.setActive(Enums.Screen.Front);
				}, 1);
			}
		},
		setActive(active) {
			this.screen.active = active;
			this.screen.name = Enums.Screen[active];
		},
		initialize() {
			if (this.screen.active === null) {
				this.setActive(Enums.Screen.Loading);
			}
			else {
				this.setActive(Enums.Screen.Front);
			}

			this.car.left = (Constants.SCREEN_WIDTH / 2) - (Constants.CAR_WIDTH / 2);
		},
		frontEvent(key) {
			if (key === Enums.Keys.Space) {
				this.setActive(Enums.Screen.Instructions);
			}
		},
		instructionsEvent(key) {
			if (key === Enums.Keys.Space) {
				this.setActive(Enums.Screen.Game);
			}
		},
		events(key) {
			switch (this.screen.active) {
				case Enums.Screen.Front:
					this.frontEvent(key);
					
					break;
				case Enums.Screen.Instructions:
					this.instructionsEvent(key);

					break;
			}
		},
		stoplightAnimationEnd(evt) {
			console.log(evt);
			// TODO: Start game loop here. Method is in methods.ts
		}
	},
	mounted() {
		let self = this;

		self.preload();
		self.initialize();

		window.addEventListener("keydown", function(evt) {
			self.events(evt.keyCode);
		});
	}
}
</script>

<style lang="scss">
	@import "/assets/char-map.scss";
	@import "/assets/common.scss";
	@import "/assets/keyframes.scss";
	@import "/assets/screen-Loading.scss";
	@import "/assets/screen-Front.scss";
	@import "/assets/screen-Instructions.scss";
	@import "/assets/screen-Game.scss";
</style>
