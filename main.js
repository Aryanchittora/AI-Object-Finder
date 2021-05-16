input = "";
status = "";
objects = [];

function preload() {}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
}

function draw() {
    image(video, 0, 0, 350, 350);

    if (status != "") {
        Model.detect(video, gotResult);

        for (var i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);

            fill('#4169e1');
            text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#4169e1');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (result != "") {
                if (result == objects[i].label) {
                    document.getElementById("result").innerHTML = input + " Found";
                }
                else {
                    document.getElementById("result").innerHTML = input + " Not Found";
                }
            }
        }
    }
}

function start() {
    Model = ml5.objectDetector('cocossd', loaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("text_box").value;
    result = input.toLowerCase();
    console.log(input);
}

function loaded() {
    console.log("COCO Ready");
    status = true;
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}