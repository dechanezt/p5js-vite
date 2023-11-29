import "../css/style.css";
import { sketch } from "p5js-wrapper";

let vid;
let isPlaying = false;
var w = 1920 / 3;
var h = 1080 / 3;
let currentState = -1;
let doubleTouch = 0;
let doubleTouchThreshold = 0;

let img;
sketch.preload = function () {
  img = loadImage("/assets/calibration.jpg");
};

//--------Setup--------
sketch.setup = function () {
  canvas = createCanvas(windowWidth, windowHeight);
  vid = createVideo(["assets/all.mp4"], vidLoad);
  // background(255, 255, 255);

  vid.hide();
};

sketch.touchMoved = function () {
  if (currentState === 0) {
    console.log("wesh");
    w = (map(touches[0].x, 0, windowWidth, 0.5, 2) * 1920) / 3;
    h = (map(touches[0].x, 0, windowWidth, 0.5, 2) * 1080) / 3;
  }
};
sketch.touchStarted = function () {
  doubleTouch++;
};

//--------Draw--------
sketch.draw = function () {
  image(vid, windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h);

  if (doubleTouch > 0) {
    doubleTouchThreshold++;
    if (doubleTouchThreshold > 20 || currentState > 0) {
      doubleTouchThreshold = 0;
      doubleTouch = 0;
    }
  }
  switch (currentState) {
    case 0:
      canvas = createCanvas(windowWidth, windowHeight);
      background(255, 255, 255);
      text(doubleTouch, 50, 50);
      rect(windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h);
      image(img, windowWidth / 2 - w / 2, windowHeight / 2 - h / 2, w, h);
      break;
    //---Allez à la page 1---
    case 1:
      background(255, 255, 255);
      //---Debug---
      // videoPlayer(true, 90.00, true, 92.0, false);
      //---Debug---
      text("allez à la première page et appuyer pour commencer", 50, 50);
      if (touches.length > 0) {
        currentState++;
      }
      break;
    //---Video 1 : texte---
    case 2:
      videoPlayer(true, 0, true, 39.6, false);
      break;
    //---Video 1 : interaction---
    case 3:
      if (touches.length > 0) {
        currentState++;
      }
      break;
    //---Video 1 : fin---
    case 4:
      videoPlayer(false, 0, true, 56.24, false);
      break;

    //---Video 2 : texte---
    case 5:
      videoPlayer(true, 56.25, true, 90, false);
      break;
    //---Video 3 : interaction---
    case 6:
      if (touches.length > 0) {
        currentState++;
      }
      break;
    //---Video 4 : fin---
    case 7:
      videoPlayer(false, 0, false, 0, false);
      break;
  }
};

//--------Lauching video--------
sketch.mousePressed = function () {
  fullscreen(true);
  // document.documentElement.webkitRequestFullscreen();

  switch (currentState) {
    case -1:
      // console.log("comming to 0");
      currentState = 0;
      break;

    case 0:
      if (doubleTouch >= 2) {
        // console.log("comming to 1");

        currentState = 1;
        // sketch.setup();
      }
      break;
  }
};

//--------Loop And Sound When Loaded-s-------
function vidLoad() {
  console.log("video loaded");
}

function sonLoad() {
  console.log("son loaded");
  oceanSon.loop();
}


function videoPlayer(isStart, startTime, isPause, pauseTime, debug) {
  if (!isPlaying && !debug) {
    if (isStart) {
      vid.play().time(startTime);
    } else {
      vid.play();
    }
    isPlaying = true;
  } else if (!isPlaying && debug) {
    vid.play().time(pauseTime - 0.01);
    isPlaying = true;
  }

  if (isPlaying && !debug) {
    if (isPause && vid.time() > pauseTime) {
      vid.pause();
      isPlaying = false;
      currentState++;
    }
  } else if (isPlaying && debug) {
    if (isPause && vid.time() > pauseTime) {
      vid.pause();
    }
  }
  vid.volume(1);
}
