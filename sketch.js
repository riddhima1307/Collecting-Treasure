var path,boy,cash,diamonds,jwellery,sword;
var pathImage,boyImage,cashImage,diamondsImage,
  jwelleryImage,swordImage;
var treasureCollection = 0;
var cashgroup,diamondsgroup,jwellerygroup,swordgroup;
var PLAY=1;
var END=0;
var gameState =1;

function preload(){
  pathImage = loadImage("Road.png");
  boyImage = loadAnimation("runner1.png","runner2.png");
  cashImage = loadImage("cash.png");
  diamondsImage = loadImage("diamonds.png");
  jwelleryImage = loadImage("jwell.png");
  swordImage = loadImage("sword.png");
  endImage =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImage);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("running",boyImage);
boy.scale=0.08;
  
  
cashgroup=new Group();
diamondsgroup=new Group();
jwellerygroup=new Group();
swordgroup=new Group();
}

function draw() {
  
  if(gameState===END){
    cashgroup.destroyEach();
    cashgroup.setVelocityEach(0);
    jwellerygroup.destroyEach();
    jwellerygroup.setVelocityEach(0);
    diamondsgroup.destroyEach();
    diamondsgroup.setVelocityEach(0);
  }

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  
  if (cashgroup.isTouching(boy)||diamondsgroup.isTouching(boy)||jwellerygroup.isTouching(boy)){
  treasureCollection=treasureCollection+50;
  }

    if (cashgroup.isTouching(boy)) {
      cashgroup.destroyEach();
    }
    else if (diamondsgroup.isTouching(boy)) {
      diamondsgroup.destroyEach();
      
    }else if(jwellerygroup.isTouching(boy)) {
      jwellerygroup.destroyEach();
      
    }else{
      if(swordgroup.isTouching(boy)) {
        swordgroup.destroyEach();
    }
      
      if (swordgroup.isTouching(boy)){
        gameState=END;
        boy.changeAnimation("running",endImage);
      }
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImage);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashgroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImage);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsgroup.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImage);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwellerygroup.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImage);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordgroup.add(sword);
  }
}