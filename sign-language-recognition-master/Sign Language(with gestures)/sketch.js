// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extraction with MobileNet. Built with p5.js
=== */

let featureExtractor;
let classifier;
let loss;
let dogImages = 0;
let catImages = 0;
let birdImages=0;
let label = 'loading model';
let filipino = '';
let english = '';
let res;
function init() {
  canvas = createCanvas(520,510);

  // Create a video element
  //video = createCapture(VIDEO);

vid = document.getElementById('container');
vid = createCapture(VIDEO);
window.requestAnimationFrame(loop);

  vid.hide();
  background(0);

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses=3
  // Create a new classifier using those features and give the video we want to use
  classifier = featureExtractor.classification(vid);

 // append/get elements to the DOM
        //const canvas = document.getElementById("canvas");
        //canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
          }
}

// A function to be called when the model has been loaded
function modelReady() {
  console.log('Model is ready!!!');
  classifier.load('model.json', customModelReady);
}

function customModelReady() {
   console.log('Custom Model is ready!!!');
   label = 'model ready';
   classifier.classify(gotResults);
 }

// Add the current frame from the video to the classifier
function addImage(label) {
  classifier.addImage(label);
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

function draw() {
	//res_translator();
  background(0);
  image(vid, 0, 0, 520, 440);
  fill(255);
  textSize(25);
  text(label, 190, height - 50);
  text("English", 40, height - 40);
  text("Filipino", 380, height - 40);
 text(filipino, 280, height - 5);
 text(english, 40, height - 5);
 
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}
function resTranslator(){
  if (res == 1) {
  	filipino = 'Salamat';
  	english = 'Thank You';
  }
   if (res == 4) {
  	filipino = 'Paalam';
  	english = 'Good Bye';
  }
   if (res == 2) {
  	filipino = 'Magandang Umaga';
  	english = 'Good Morning';
  }
   if (res == 5) {
  	filipino = 'Magandang Gabi';
  	english = 'Good Night';
  } 
  if (res == 3) {
  	filipino = 'Magandang hapon';
  	english = 'Good Afternoon';
  } 
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
 } else {
    // updated to work with newer version of ml5
     // label = result;
   res = result[0].label;
    //english = result[0].english[1];
   classifier.classify(gotResults);
   resTranslator();
  }
}

async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
        }
