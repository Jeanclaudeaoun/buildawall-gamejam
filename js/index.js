var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'mission', { preload: preload, create: create, update: update , render: render});
var surface;

var shotDelay;
var trumpSpeed;
//var numberOfBullets;
var gravity;
var placedTrump;
var trump = [];
var groundBlock;
var i;
var counter = 0;
var wall = [];
var mexicanRight;
var bmpText;
var bmpText2;
var trumpScore=0;
var khwanScore=0;
function preload() {

  game.load.image('background','assets/background2.jpg');
  game.load.image('ground','assets/ground2.png');
  game.load.image('trump', 'assets/Donald_Trump.png');
  game.load.image('mexican', 'assets/mexican.png');
  game.load.image('cousin', 'assets/cousin.png');
  game.load.image('brick', 'assets/brick.png');
  game.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');
  // game.load.spritesheet('roverSprite', ASSETS_PATH+'roversprite.png', 109,100,7);
}

function create() {

  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
/*

  game.add.image(0,0,'background');

  surface = game.add.s6prite(0,500,'marsSurface');




   game.input.onDown.add(gofull, this);
   initializeKeys();*/
   game.add.image(0,0,'background');
    bmpText = game.add.bitmapText(50, 100, 'desyrel', 'Trumps Score : 0', 30);
    bmpText2 = game.add.bitmapText(700, 100, 'desyrel', 'Juans Score : 0', 30);
    groundBlock = game.add.sprite(420,530,'ground');
    //groundBlock.scale.setTo(0.5,0.5);
    groundTrump = game.add.sprite(-500,530,'ground');
    game.physics.enable(groundTrump,Phaser.Physics.ARCADE);
    groundTrump.body.immovable=true;
    groundTrump.body.allowGravity=false;
   shotDelay =300;
   trumpSpeed = 900;
  // numberOfBullets = 20;
   gravity = 980;



   mexicanRight = game.add.sprite(900,470,'cousin');
   mexicanRight.scale.setTo(0.3,0.3);
   game.physics.enable(mexicanRight,Phaser.Physics.ARCADE);
   mexicanRight.body.allowGravity=false;
   mexicanRight.body.immovable=true;

   placedTrump = game.add.sprite(50, game.height - 44 , 'trump');
   placedTrump.scale.setTo(0.3,0.3);

   placedTrump.anchor.setTo(0.5,0.5);

   createWall();

   game.physics.arcade.gravity.y=gravity;


   game.physics.enable(groundBlock,Phaser.Physics.ARCADE);
   groundBlock.body.immovable=true;
   groundBlock.body.allowGravity=false;

   game.input.activePointer.x = game.width/2;
   game.input.activePointer.y=game.height/2-100;

  // zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);

   game.input.onUp.add( function(){
     createTrump();
     shootTrump();
     trumpSpeed=900;
   }, this );
 }


function update(){
    bmpText.text='Trumps Score : '+trumpScore;
    bmpText2.text='Juans Score : '+khwanScore;
    if (game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown){
      moveleft();
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown){
      moveright();
    }

    //listenToKeys();
    if (game.input.activePointer.isDown){
     trumpSpeed+=10;
   }
    for(i=0;i<counter;i++ ){
      for (var j = 0; j < wall.length; j++) {
        game.physics.arcade.collide(trump[i],wall[j]);
        game.physics.arcade.collide(trump[i],mexicanRight,function(trump,mex){
          khwanScore++;
          trump.kill();
          destroyWall();
          createWall();
        });
      }


    game.physics.arcade.collide(trump[i],groundBlock,function(trump,groundBlock){
      trumpScore++;
      trump.kill();
      destroyWall();
      createWall();
      },null);

      game.physics.arcade.collide(trump[i],groundTrump,function(trump,groundBlock){

        trump.kill();
        destroyWall();
        createWall();
        },null);

    if(trump[i].alive){
        trump[i].rotation= Math.atan2(trump[i].body.velocity.y,trump[i].body.velocity.x);
      }
    }
    placedTrump.rotation=game.physics.arcade.angleToPointer(placedTrump);
  /*  if(game.input.activePointer.isDown){
      createTrump();
      shootTrump();
    }*/

}

function render(){




}





function reloadLevel(){

  game.state.restart();

}

function gofull() {

  if (game.scale.isFullScreen){
    game.scale.stopFullScreen();
  }
  else{
    game.scale.startFullScreen(false);
  }

}/*
function moveup(){
  surface.y -= 1;
}
function movedown(){
  surface.y += 1;
}*/
function moveleft(){
  mexicanRight.x -= 3;
}
function moveright(){
  mexicanRight.x += 3;
}
function shootTrump(){
  trump[counter].revive();
  trump[counter].checkWorldBounds = true;
  trump[counter].outOfBoundsKill=true;

  trump[counter].reset(placedTrump.x,placedTrump.y);
  trump[counter].rotation = placedTrump.rotation;

  trump[counter].body.velocity.x=Math.cos(trump[counter].rotation) * trumpSpeed;
  trump[counter].body.velocity.y=Math.sin(trump[counter].rotation) * trumpSpeed;
    counter++;
}

function createTrump(){

  trump[counter] = game.add.sprite(0,0,'mexican');
  trump[counter].scale.setTo(0.3,0.3);
  trump[counter].anchor.setTo(0.5,0.5);
  game.physics.enable(trump[counter],Phaser.Physics.ARCADE);
  trump[counter].kill();
  trump[counter].body.collideWorldBounds = true;

}

function createWall(){
  var rand  = Math.floor(Math.random() * 10);
  for (var i = 0; i < 10; i++) {
    rand = rand >= 5 ? 5 : rand;
    if( i == rand || i == rand+1 || i == rand+2)
      continue;
    wall[i]=game.add.sprite(400,(0+(i*60)),'brick');
    wall[i].scale.setTo(0.35,0.35)
    game.physics.enable(wall[i],Phaser.Physics.ARCADE);
    wall[i].body.immovable=true;
    wall[i].body.allowGravity=false;


  }
}

function destroyWall(){
  for(var i = 0;i<10;i++){
    if (typeof wall[i] !== "undefined")
      wall[i].destroy();
  }
}
