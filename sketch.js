//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogimg, hdogimg

function preload()
{
	//load images here
  dogimg = loadImage("Dog.png")
  hdogimg = loadImage("happydog.png")
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database()

  dog = createSprite(250, 250, 100, 100)
  dog.addImage(dogimg)
  
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(hdogimg);
  }


  drawSprites();
  //add styles here
  
  textSize(20);
  fill("red")
  stroke("black")
  text("Food Remaining:"+foodS,170,200)
  text("Press Up Arrow To Feed The Dog", 100, 400)
}

function readStock(data){
foodS=data.val()
}

function writeStock(x){
if (x<=0){
  x=0;
}else{
  x=x-1;
}
database.ref('/').update({
  Food:x
})
}



