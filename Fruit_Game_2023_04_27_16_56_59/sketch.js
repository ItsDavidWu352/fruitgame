var reset, resetImg;
//var win, winImg;
var gameover,gameoverImg, gameoversound;
var bg;

var sword, swordImage;
var Avocado, lemon, Strawberry, Watermelon, Pineapple, orange,fruitGroup;
var bomb, bombImg, enemyGroup;
var scream1, scream2, scream3, scream4, scream5, scream6;

//Game States
var PLAY = 1;
var END = 0;
//var WIN = 2;
var gameState = 1;

var x_dim = 400;
var y_dim = 700;
var spawn = 1;
var fruit_type = 0;

function preload() {
  bg = loadImage('Images/treebackground.png');
  swordImg = loadImage("Images/sword.png");
  gameoverImg = loadImage ("Images/gameover.png");
  fruit1 = loadImage ("Images/fruits/Avocado.png");
  fruit2 = loadImage ("Images/fruits/lemon.png");
  fruit3 = loadImage ("Images/fruits/Strawberry.png");
  fruit4 = loadImage ("Images/fruits/Watermelon.png");
  fruit5 = loadImage ("Images/fruits/Pineapple.png");
  fruit6 = loadImage ("Images/fruits/orange.png");
  madfruit1 = loadImage ("Images/fruits/madAvocado.png");
  madfruit2 = loadImage ("Images/fruits/madLemon.png");
  madfruit3 = loadImage ("Images/fruits/madStrawberry.png");
  madfruit4 = loadImage ("Images/fruits/madWatermelon.png");
  madfruit5 = loadImage ("Images/fruits/madPineapple.png");
  madfruit6 = loadImage ("Images/fruits/madorange.png");
//  winImg = loadImage ("Images/win.jpg");
  bombImg = loadImage ("Images/bomb.png");
 resetImg = loadImage ('Images/reset.png');
  scream1 = loadSound ('sounds/scream1.mp3');
  scream2 = loadSound ('sounds/scream2.mp3');
  scream3 = loadSound ('sounds/scream3.mp3');
  scream4 = loadSound ('sounds/scream4.mp3');
  scream5 = loadSound ('sounds/scream5.mp3');
  scream6 = loadSound ('sounds/scream6.mp3');
  sliceIt = loadSound ("sounds/slice.mp3");
  gameoversound = loadSound ("sounds/gameoversound.mp3");
  
}

function setup(){

  createCanvas (x_dim,y_dim);
  
//reset = createSprite(300,280);
//reset. addAnimation("reset",resetImg);
//reset. scale = 0.7;
  
//gameover = createSprite(300,200,20,20);
//gameover. addAnimation("gameover", gameover);
//gameover. scale = 1.5;
  
//win = createSprite(300,200);
//win. addAnimation("you win",winImg);
//win. scale = 0.7;
  
  //creating sword
  sword = createSprite(40, 100, 20, 20);
  sword.addImage(swordImg);
  sword.scale = 0.3;
  // set collider for sword
    sword.setCollider("rectangle", 0, 0, 40, 40);
    score = 0;
  // Grouping fruits & bombs
  score = 0;
  fruitGroup = new Group();
  enemyGroup = new Group();
}

function keyPressed(){
  if (key === 'LEFT_ARROW') { 
   sword.x -= 1;
  }  
  else if (key === 'RIGHT_ARROW') {
   sword.x += 1;
  }
    else if (key === 'DOWN_ARROW') {
   sword.y += 1;
  }
    else if (key === 'UP_ARROW') {
   sword.y -= 1;
  }
}

function draw(){
  background(bg);
  
  if (gameState === PLAY){ 
    
  //  win.visible = false;
   // reset.visible = false;
  //  gameover.visible = false;
   // sword.visible = true;
    
    // calling the fruits and bombs
    fruits();
    Enemy(); 
    
    
    if (spawn === 1) {
      sword.x = x_dim/2;
      sword.y = y_dim*0.8;
      spawn = 0;
    }
    
    var keyboardSpeed = 8
    // Move with keybinding
    if (keyIsPressed){
    if (keyCode == RIGHT_ARROW){ 
   sword.x = sword.x+keyboardSpeed;
  }  
          if (keyCode == LEFT_ARROW){ 
   sword.x = sword.x-keyboardSpeed;
  }  
          if (keyCode == UP_ARROW){ 
   sword.y = sword.y-keyboardSpeed;
  }  
          if (keyCode == DOWN_ARROW){ 
   sword.y = sword.y+keyboardSpeed;
  }     
    }
    
    //Move with mouse
    //sword.x = mouseX;
    //sword.y = mouseY; 
    
    //Increase the score if sword hits fruits
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach(); 
      //Sound when sword swings
      sliceIt.play();
      score = score + 1;
      if (fruit_type == 1) {
        sword.addImage(madfruit1)
        scream1.play();
      } else if (fruit_type == 2) {
        sword.addImage(madfruit2)
        scream2.play();
      } else if (fruit_type == 3) {
        sword.addImage(madfruit3)
        scream3.play();
      } else if (fruit_type == 4) {
        sword.addImage(madfruit4)
        scream6.play();
      } else if (fruit_type == 5) {
        sword.addImage(madfruit5)
        scream5.play();
      } else if (fruit_type == 6) {
        sword.addImage(madfruit6)
        scream4.play();
      }
      sword.scale = 0.15;
}
 //   if(score === 100){
  //   gameState=WIN;
  //  }
 else {
    if (enemyGroup.isTouching(sword)) {
    gameState = END; 
    
    enemyGroup.destroyEach();
    fruitGroup.destroyEach(); 
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    
    //Sword animation/size
    sword.addImage(gameoverImg,);
    gameoversound.play();
    sword.scale=0.9;
    sword.x = x_dim/2;
    sword.y = y_dim/2;
      }
    }
  }
 else if (gameState===END){
      
   //   sword.visible = false;
   //   enemyGroup.visible = false;
   //   fruitGroup.visible = false;
    //  win.visible = false;
      
  //    gameover.visible = true;
   //   reset.visible = true;
   //   reset.y=350;
      
    //    if(keyDown("r")){
    //    resetSound.play();
     //   score=0;
     //   gameState=PLAY;
  //  }
  //}
  //  if (gameState === WIN){
      
   //   sword.visible = false;
   //   enemyGroup.visible = false;
    //  fruitGroup.visible = false;
      
    //  win.visible = true;
    //  reset.visible = true;
     // reset.y=350;
      
      if(keyDown("r")){
  //  resetSound.play();
        score=0;
        gameState=PLAY;
      }
    }
 // }
  
  drawSprites();
  
    //Display Score

  fill("black");
  textSize (25);
  text("Score:"+score,(x_dim/2)-25,y_dim/10);
}

// Random spawn Fruits
function fruits() {

if (World.frameCount%80 === 0) {
  
position = Math.round(random(1, 2));
fruit=createSprite(600,200,20,20);
fruit.scale = 0.2;

var r = Math.round(random(1,6));
if(r==1) {
  fruit.addImage(fruit1);
  fruit_type = 1;
} else if (r==2) {
  fruit.addImage(fruit2);
  fruit_type = 2;
} else if(r==3) {
  fruit.addImage(fruit3);
  fruit_type = 3;
} else if(r==4) {
  fruit.addImage(fruit4);
  fruit_type = 4;
} else if(r==5) {
  fruit.addImage(fruit5);
  fruit_type = 5;
} else {
  fruit.addImage(fruit6);
  fruit_type = 6;
}
sword.addImage(swordImg);
sword.scale=0.25;
fruit.x = Math.round(random(0,y_dim));
fruit.velocityY=-7;
          if(position == 1){
          fruit.y = 0;
          fruit.velocityY = (7+(score/4));
        }
        else{
          if(position == 2){
            fruit.y = 0;
            fruit.velocityY = (7+(score/4));
          }
        }
        fruitGroup.add(fruit);
        
}
}  

// Random Spawn Bombs
function Enemy() {
if (frameCount%200===0) {
bomb = createSprite(400,100,30,30);
bomb.addAnimation("moving", bombImg);
bomb.x =  Math.round(random(0, y_dim));
bomb.y = 0;
bomb.velocityY=(8+(score/10));
bomb.scale = 0.2;
bomb.setLifetime=50; 
  
enemyGroup.add(bomb);

}
}  