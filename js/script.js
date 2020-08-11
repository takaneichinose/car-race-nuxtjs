"use strict";

//---------- CONSTANTS

// Key code map
const Keys = {
  Enter: 13,
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

//---------- EVENTS

window.addEventListener("keydown", function(evt) {
  console.log(evt.keyCode);
});
