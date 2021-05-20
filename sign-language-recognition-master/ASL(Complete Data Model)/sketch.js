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
function setup() {
  canvas = createCanvas(520,510);

  // Create a video element
  //video = createCapture(VIDEO);

vid = document.getElementById('container');
vid = createCapture(VIDEO);

  vid.hide();
  background(0);

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  featureExtractor.numClasses=3
  // Create a new classifier using those features and give the video we want to use
  classifier = featureExtractor.classification(vid);
//createButtons();
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

// A util function to create UI buttons
function createButtons() {
  // When the Cat button is pressed, add the current frame
  // from the video with a label of "cat" to the classifier
  buttonA = createButton('Thank You');
  buttonA.mousePressed(function() {
    addImage('thankyou');
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonB = createButton('Welcome');
  buttonB.mousePressed(function() {
    addImage('Welcome');
  });

buttonC = createButton('Okay');
  buttonC.mousePressed(function() {
    addImage('Okay');
  });

  buttonC = createButton('Hello');
  buttonC.mousePressed(function() {
    addImage('Hello');
  });

  buttonC = createButton('Good Bye');
  buttonC.mousePressed(function() {
    addImage('Good Bye');
  });

saveButton = createButton('save');
  saveButton.mousePressed(function() {
    classifier.save();
  });

  // Train Button
  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });
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
  /*for (let i = 0; i <= res.size(); i++) {
     if (res == 1) {
    filipino = '';
    english = '';
    label = 'None'
  }
  }*/
if (res == 0) {
    filipino = 'Punta';
    english = 'Go';
    
  }else if (res == 1) {
  	filipino = 'Dasal';
  	english = 'Pray';
    
  } else if (res == 2) {
  	filipino = 'Kain';
  	english = 'Eat';
  }
   else if (res == 3) {
  	filipino = 'Inom';
  	english = 'Drink';
  } 
  else if (res == 4) {
  	filipino = 'Turo';
  	english = 'Teach';
  }
  else if (res == 5) {
    filipino = 'Tayo';
    english = 'Stand';
  } 
  else if (res == 6) {
    filipino = 'Upo';
    english = 'Sit';
  } 
  else if (res == 7) {
    filipino = 'Hugas';
    english = 'Wash';
  } 
  else if (res == 8) {
    filipino = 'Trabaho';
    english = 'Work';
  } else if (res == 9) {
    filipino = 'Tigil';
    english = 'Stop';
  } else if (res == 10) {
    filipino = 'Paalam';
    english = 'GoodBye';
  } else if (res == 11) {
    filipino = 'Salamat';
    english = 'Thank You';
  }else if (res == 12) {
    filipino = 'Kamusta';
    english = 'Hello';
  }else if (res == 13) {
    filipino = 'Mahal Kita';
    english = 'Iloveyou';
  }else if (res == 14) {
    filipino = 'Magandang Araw';
    english = 'GoodMorning';
  }else if (res == 15) {
    filipino = '';
    english = '';
    label='';
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
