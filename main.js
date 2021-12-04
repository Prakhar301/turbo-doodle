percent="";
objects=[];
noline="";
video="";
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(350,300);
    canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects"; 
}
function modelLoaded(){
    console.log("Object detection initialized");
    noline=true;
    video.loop();
    video.speed(1.5);
    video.volume(0);
}
function draw(){    
    image(video,0,0,350,300);
    if(noline==true){
        objectDetector.detect(video,gotResults);
        for(i=0; i< objects.length; i++){
            textSize(20);
            strokeWeight(5);
            stroke("#eb4034");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+30,objects[i].y+30);
            noFill();
            stroke('#00fff2');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}