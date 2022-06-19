Song1="";
Song2="";
statusrw="";
statuslw="";
scoreLW=0;
scoreRW=0;

LeftWristx=0;
LeftWristy=0;
RightWristx=0;
RightWristy=0;

number_left_wrist="";
function preload()
{
  Song1=loadSound("Song1.mp3");
  Song2=loadSound("Song2.mp3");
}

function setup()
{
   canvas=createCanvas(600,500);
   canvas.position(500,250);
   
   video=createCapture(VIDEO);
   video.hide();

   posenet=ml5.poseNet(video,modelLoaded);
   posenet.on("pose",gotposes);
}

function modelLoaded()
{
    console.log("PoseNet is working");
}

function gotposes(results)
{
if(results.length>0)
{
    console.log(results);
    LeftWristx=results[0].pose.leftWrist.x;
    LeftWristy=results[0].pose.leftWrist.y;
    RightWristx=results[0].pose.rightWrist.x;
    RightWristy=results[0].pose.rightWrist.y;

    console.log("Left Wrist x="+LeftWristx);
    console.log("Left Wrist y="+LeftWristy);
    console.log("right Wrist x="+RightWristx);
    console.log("right Wrist y="+RightWristy);

    scoreLW=results[0].pose.keypoints[9].score;
    console.log("Score of Left wrist is:"+scoreLW);

    scoreRW=results[0].pose.keypoints[10].score;
    console.log("Score of the right wrist is:"+scoreRW);
 
    
}
}

function draw()
{
  image(video,0,0,600,600);

  statusrw=Song1.isPlaying();
  statuslw=Song2.isPlaying();
  
  fill("cyan");
  stroke("#000099");
  

  number_left_wrist=Number(LeftWristy/500);
  NLW=floor(number_left_wrist);
  
  statusrw=Song1.isPlaying();
  statuslw=Song2.isPlaying();
  console.log("Status of song 1="+statusrw);
console.log("Number of Left Wrist="+NLW);
if(scoreRW>0.2)
{
   circle(RightWristx,RightWristy,20);
   Song2.stop();
 
   console.log("Status of on and on song="+statusrw);
   console.log("Score of Right Wrist="+scoreRW);

   if(statusrw == false)
   {
    Song2.play();
    document.getElementById("song").innerHTML="Current Song:"+"BamBamBam by Camila Cabello";
   }
}

if(scoreLW>0.2)
{
   circle(LeftWristx,LeftWristy,20);
   Song2.stop();
  
   console.log("Status of bam bam song="+statuslw);
   console.log("Score of Left Wrist="+scoreLW);
  if(statuslw == false)
   {
    Song1.play();
    document.getElementById("song").innerHTML="Current Song:"+"BamBamBam by Camila Cabello";
   }
}
 
} 

  