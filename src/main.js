import "../css/style.css";
import { sketch } from "p5js-wrapper";

let vid;
let playing = false;
var w = 1920/3;
var h = 1080/3;
let currentState = -1;
let doubleTouch = 0;
let doubleTouchThreshold = 0;


//--------Setup--------
sketch.setup = function () {
  canvas = createCanvas(windowWidth, windowHeight);



switch (currentState){
  case -1:
    background(255, 255, 255);
    rect(windowWidth/2-w/2, windowHeight/2-h/2, w, h);
    break;
    

  case 1:
    background(0, 255, 0);
    vid = createVideo(["assets/pauvrete.mp4","assets/faim.mp4","assets/sante.mp4","assets/consommation.mp4","assets/education.mp4","assets/ocean.mp4"], vidLoad);
    console.log("pitte");

    if (!playing) {
      vidLoad();
    }
    playing = true;
    vid.hide();
    break;

  //   case 2:
  //     background(255, 0, 0);
  //   vid = createVideo(["assets/faim.mp4"], vidLoad);
  //   vid.hide();
  // break
}
  

  // vid.size(windowWidth*2, windowWidth*2);

};






sketch.touchMoved = function(){
  if (currentState ===0){
    console.log("wesh");
    console.log(touches[0].x);
    w = map(touches[0].x,0,windowWidth,0.5,2)*1920/3;
    h = map(touches[0].x,0,windowWidth,0.5,2)*1080/3;
  }
}
sketch.touchStarted = function(){

  doubleTouch++
}




//--------Draw--------
sketch.draw = function () {
  // console.log("current State ", currentState);s

  if (doubleTouch>0){
    doubleTouchThreshold++;
    if (doubleTouchThreshold > 20 || currentState > 0){
      doubleTouchThreshold = 0;
      doubleTouch = 0;
    }
  }
  console.log(doubleTouch);
  switch (currentState){
    case 0:
      
      background(255, 255, 255);

      text(doubleTouch,50,50)


      rect(windowWidth/2-w/2, windowHeight/2-h/2, w, h);
      break;
  
  }

  // console.log(vid.time());
  //--------resize video fonction--------
  if (playing) {
    image(vid, windowWidth/2-w/2, windowHeight/2-h/2, w, h);
  }
};

//--------Lauching video--------
sketch.mousePressed = function () {
  document.documentElement.webkitRequestFullscreen();
  sketch.setup();

    switch (currentState){
      case -1:
        console.log("comming to 0");
      currentState = 0;
      break;
      
      case 0:
        if (doubleTouch >= 2){
          console.log("comming to 1");
          
          currentState = 1;
          sketch.setup();
          
          
        }
        break;
        
      };
}

function sayDone() {
  vid.play(2).time(3);
}

//--------Loop And Sound When Loaded-s-------
function vidLoad() {
  vid.play();
  vid.volume(1);
}