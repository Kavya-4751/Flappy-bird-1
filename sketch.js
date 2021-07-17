var bird,birdImg,birdDyingImg, balloon1,balloon2, balloon3, balloon4
var restart,restartImg,scene,sceneImg,gameOver,gameOverImg
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var music1,music2;



function preload(){
  birdImg = loadAnimation("tile000.png","tile004.png","tile004.png","tile006.png","tile009.png")
  birdDyingImg=loadImage("tile009.png");
  sceneImg = loadImage("Background.png")
  balloon1 = loadAnimation("redBalloon.png","redBalloon.png","redBalloon.png");
  balloon2 = loadAnimation("blueBalloon2.png","blueBalloon2.png","blueBalloon2.png");
  balloon3 = loadAnimation("purpleBalloon.png","purpleBalloon.png","purpleBalloon.png");
  balloon4 = loadAnimation("yellowBalloon.png","yellowBalloon.png","yellowBalloon.png");
  gameOverImg=loadImage("gameOver.png")
  restartImg = loadImage("Restart_button2.png")
 music1=loadSound("birdfly.wav")
  music2=loadSound("music.wav")
}

function setup() {
  createCanvas(900,600);

  scene= createSprite(600,400,100,100)
  scene.addImage(sceneImg)
  scene.scale=2
  scene.velocityX=-4
  bird=createSprite(100,300,50,50)
//bird.debug=true
  bird.addAnimation("flyingBird",birdImg)
  bird.scale=0.5
  restart=createSprite(400,160)
  gameOver=createSprite(360,60)
  gameOver.scale = 0.5;
  restart.scale  = 0.05;
  restart.addImage(restartImg)
  gameOver.addImage(gameOverImg)
  restart.visible=false
gameOver.visible=false

  obstaclesGroup=new Group()
 
  redBalloonGroup= new Group();
  blueBalloonGroup=new Group()
  purpleBalloonGroup= new Group()
  yellowBalloonGroup= new Group()
}

function draw() {
  background(255,255,255);  
  
 

  if (gameState===PLAY){
   music2.stop()
    score = score + Math.round(getFrameRate()/60);
  restart.visible=false
  gameOver.visible=false
  scene.velocityX=-4
if(scene.x<0){
  scene.x=scene.width/2;
}
    
    if(keyDown("space") && bird.y >= 159) {
      bird.velocityY = -12;
      music1.play()
    }
  
    bird.velocityY = bird.velocityY + 0.8
  

  var rand=Math.round(random(1,4));
if (World.frameCount%100===0) {
  if(rand===1){
    redB()
  }
    else if(rand===2){
      blueB();
    }
    else if(rand===3){
     yellowB();
    }
    else
    purpleB();
  }
  
 

   
  
    if(redBalloonGroup.isTouching(bird) || bird.y>600 ){
        gameState = END;
        bird.x=100
        bird.y=300
        bird.addImage("dyingBird", birdDyingImg)

    }


    if(blueBalloonGroup.isTouching(bird) || bird.y>600 ){
      gameState = END;
      bird.x=100
      bird.y=300
      bird.addImage("dyingBird", birdDyingImg)
  }
  if(purpleBalloonGroup.isTouching(bird) || bird.y>600 ){
    gameState = END;
    bird.x=100
    bird.y=300
    bird.addImage("dyingBird", birdDyingImg)
}
if(yellowBalloonGroup.isTouching(bird) || bird.y>600 ){
  gameState = END;
  bird.x=100
  bird.y=300
  bird.addImage("dyingBird", birdDyingImg)
}
  }

  else if (gameState === END) {
    music1.stop();
    music2.play();
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
   
    bird.velocityY = 0;
    scene.velocityX=0;
  
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 

 

  drawSprites();
  textSize(30)
  stroke(0)
  fill("black")
  text("SCORE: "+score, 700,80)
 
}

function reset(){
gameState=PLAY;
score=0;

redBalloonGroup.destroyEach();
blueBalloonGroup.destroyEach();
yellowBalloonGroup.destroyEach();
purpleBalloonGroup.destroyEach();
restart.visible=true;
gameOver.visible=true;

bird.changeAnimation("dying",birdDyingImg)
}

function redB(){
  if(World.frameCount%100=== 0){
  var redBalloon=createSprite(600,Math.round(random(100,500)),10,40);
  redBalloon.addAnimation("redflying",balloon1)
  redBalloon.velocityX = -(6 + 3*score/100);
  redBalloon.scale =0.1 ;
  redBalloon.lifetime = 300;
  //add each obstacle to the group
  redBalloonGroup.add( redBalloon);
}
}
function purpleB(){
  if(World.frameCount%100=== 0){
  var purpleBalloon=createSprite(600,Math.round(random(100,500)),10,40);
  purpleBalloon.addAnimation("redflying",balloon2)
  purpleBalloon.velocityX = -(6 + 3*score/100);
  purpleBalloon.scale =0.1 ;
  purpleBalloon.lifetime = 300;
  //add each obstacle to the group
  purpleBalloonGroup.add( purpleBalloon);
}
}
function blueB(){
  if(World.frameCount%100=== 0){
  var blueBalloon=createSprite(600,Math.round(random(100,500)),10,40);
  blueBalloon.addAnimation("blueflying",balloon3)
  blueBalloon.velocityX = -(6 + 3*score/100);
  blueBalloon.scale =0.5 ;
  blueBalloon.lifetime = 300;
  //add each obstacle to the group
  blueBalloonGroup.add(blueBalloon);
}
}

function yellowB(){
  if(World.frameCount%100=== 0){
  var yellowBalloon=createSprite(600,Math.round(random(100,500)),10,40);
  yellowBalloon.addAnimation("blueflying",balloon4)
  yellowBalloon.velocityX = -(6 + 3*score/100);
  yellowBalloon.scale =0.1 ;
  yellowBalloon.lifetime = 300;
  //add each obstacle to the group
  yellowBalloonGroup.add(yellowBalloon);
}
}
