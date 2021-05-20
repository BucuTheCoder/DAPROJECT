
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

    // the link to your model provided by Teachable Machine export panel
    const URL = "./";
    let model, webcam, ctx, labelContainer, maxPredictions, res;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 520;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);


        //button = document.getElementById("start");
       // button.hide();
        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = 510;
        ctx = canvas.getContext("2d");
        //labelContainer = document.getElementById("label-container");
        result = document.getElementById("result");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            result.appendChild(document.createElement("div"));
        }

//Hide The results
 x = document.getElementById("result");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
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
            result.childNodes[i].innerHTML = classPrediction;
            if (prediction[4].probability.toFixed() == 1) {
              res = prediction[4].className;
            //  console.log(prediction[4].className);
            }
             if (prediction[3].probability.toFixed() == 1) {
              res = prediction[3].className;
             // console.log(prediction[3].className);
            }
             if (prediction[2].probability.toFixed() == 1) {
                res = prediction[2].className;
            //  console.log(prediction[2].className);
            }
             if (prediction[1].probability.toFixed() == 1) {
              res = prediction[1].className;
            //  console.log(prediction[1].className);
            } 
           /* if (prediction[5].probability.toFixed() == 1) {
              document.getElementById("goodafternoon").style.display = "block";
            } */
        }
        showResult();
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

    function showResult(){
         if (res == "Thank You") {
                res = prediction[4].className;
              document.getElementById("thankyou").style.display = "block";
              document.getElementById("goodbye").style.display = "none";
              document.getElementById("goodmorning").style.display = "none";
              document.getElementById("goodnight").style.display = "none";
             // console.log(prediction[4].className);
            }
             else if (res == "Good Bye") {
              document.getElementById("goodbye").style.display = "block";
              document.getElementById("thankyou").style.display = "none";
              document.getElementById("goodmorning").style.display = "none";
              document.getElementById("goodnight").style.display = "none";
              //console.log(prediction[3].className);
            }
             else if (res == "Good Morning") {
              document.getElementById("goodmorning").style.display = "block";
              document.getElementById("thankyou").style.display = "none";
              document.getElementById("goodbye").style.display = "none";
              document.getElementById("goodnight").style.display = "none";
            
            }
             else if (res == "Good Night") {
              document.getElementById("goodnight").style.display = "block";
             document.getElementById("thankyou").style.display = "none";
              document.getElementById("goodmorning").style.display = "none";
              document.getElementById("goodbye").style.display = "none";
            } 
    }
