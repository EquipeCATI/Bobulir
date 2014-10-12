var background;
var snakeArray = [];
//var snakeBody;
var snake;
var snakeWidth=25;
var food;
var keyCode;
var CHECK_HIT_ALPHA = 1;
var currDirection;
var tempX;
var tempY;
var prevX;
var prevY;


function loadMainGame()
{
//background = new createjs.Bitmap("assets/images/loading_background.jpg");
//background.x=0;
//background.y=0;
//snake = new createjs.Container();


//snakeTail = new createjs.Shape();
//snakeTail.graphics.beginFill("#E2DC1E").drawPolyStar(40,65,15,3,0,360);
createSnakeHead();
createFood();
snakeArray.currDirection = "";
stage.addChild(snake,food);
createjs.Ticker.addEventListener("tick", snakeMovement);
//createjs.Ticker.addEventListener("tick", snakeBodyMovement);
window.onkeydown=function(e)
{

    keyCode = e.keyCode || e.which || window.Event; 
    if(keyCode == 37 && currDirection != "right")
    {
        currDirection = "left";
        snake.rotation= -90;
        tempX = snakeArray[0].x;
        tempY = snakeArray[0].y;
    }
    else if(keyCode == 39 && currDirection !="left")
    {
        currDirection = "right";
        snake.rotation = 90;
        tempX = snakeArray[0].x;
        tempY = snakeArray[0].y;
    }
    else if(keyCode == 38 && currDirection != "down")
    {
        currDirection = "up";
        snake.rotation = 360;
        tempX = snakeArray[0].x;
        tempY = snakeArray[0].y;
    }
    else if(keyCode == 40 && currDirection != "up")
    {
        currDirection = "down";
        snake.rotation = 180;
        tempX = snakeArray[0].x;
        tempY = snakeArray[0].y;
    }
}

}
function createSnakeHead()
{
snake = new createjs.Bitmap("snake.png");
snake.type = "head";
var randX = Math.floor(Math.random()*800);
var randY = Math.floor(Math.random()*500);
snake.x = randX;
snake.y = randY;
snake.regX = snake.image.width/2;
snake.regY = snake.image.height/2;
snakeArray.push(snake);
}

function createFood()
{
food = new createjs.Bitmap("snake.png");
 var randX = Math.floor(Math.random()*800);
var randY = Math.floor(Math.random()*500);
food.x = randX;
food.y = randY;
}

function snakeMovement()
{
console.log(snakeArray.length);
for(var i=0;i<=snakeArray.length-1;i++)
 {
     if(currDirection=="left")
     {
        snakeArray[i].rotation= -90;
        snakeArray[i].x = snakeArray[i].x - 2;
         prevX = snakeArray[i].x;
         prevY = snakeArray[i].y;
         if (snakeArray[i].x <= 0) 
        {
            snakeArray[i].x = stageWidth; 
         }
        snakeBodyMovement(prevX,prevY);
     }
     else if(currDirection == "right")
    {
         //tempX = snakeArray[0].x;
         snakeArray[i].rotation= 90;
        snakeArray[i].x = snakeArray[i].x + 2;
        prevX = snakeArray[i].x;
        prevY = snakeArray[i].y;
         if (snakeArray[i].x  >= stageWidth) 
        {
            snakeArray[i].x = 0; 
        }
         snakeBodyMovement(prevX,prevY);
         snakeArray[i].currDirection = "right";
     }
     else if(currDirection == "up")
    {
        //tempY = snakeArray[0].y;
        snakeArray[i].rotation= 360;
        snakeArray[i].y = snakeArray[i].y - 2;
        prevX = snakeArray[i].x;
        prevY = snakeArray[i].y;
         if(snakeArray[i].y <=0)
         {
             snakeArray[i].y = stageHeight;
         }
         snakeBodyMovement(prevX,prevY);
        snakeArray[i].currDirection = "up";
    }
     else if(currDirection == "down")
     {
         //var tempY = snakeArray[0].y;
         snakeArray[i].rotation= 180;
         snakeArray[i].y = snakeArray[i].y + 2;
         prevX = snakeArray[i].x;
         prevY = snakeArray[i].y;
         if(snakeArray[i].y >= stageHeight)
         {
            snakeArray[i].y = 0;
        }
         snakeBodyMovement(prevX,prevY);
         snakeArray[i].currDirection = "down";
     }
 }
foodSnakeCollision();
stage.update();
}

function foodSnakeCollision()
{
var intersection = ndgmr.checkPixelCollision(snake,food,CHECK_HIT_ALPHA);
if(intersection)    
{
    console.log("Eat food");
    var randX = Math.floor(Math.random()*800);
    var randY = Math.floor(Math.random()*500);
    food.x = randX;
    food.y = randY;
    createSnake();  
}
}

function createSnake()
{   
var snakeBody = new createjs.Bitmap("snake.png");
snakeBody.type = "body";
snakeBody.regX = snake.image.width/2;
 snakeBody.regY = snake.image.height/2;
if(currDirection=="left")
{   

    snakeBody.x = snakeArray[snakeArray.length-1].x + 25;
    snakeBody.y =snakeArray[snakeArray.length-1].y +0;
}
if(currDirection == "right")
{
     snakeBody.x = snakeArray[snakeArray.length-1].x - 25;
    snakeBody.y =snakeArray[snakeArray.length-1].y - 0;
}
if(currDirection == "up")
{
    snakeBody.x = snakeArray[snakeArray.length-1].x + 0;
    snakeBody.y =snakeArray[snakeArray.length-1].y + 25;
}
if(currDirection == "down")
{
    snakeBody.x = snakeArray[snakeArray.length-1].x - 0;
    snakeBody.y =snakeArray[snakeArray.length-1].y - 25;
}
snakeArray.push(snakeBody);
console.log(snakeArray.length + "after collision");
stage.addChild(snakeBody);
}

function snakeBodyMovement(prevX,prevY)
{
for(var i=1;i<=snakeArray.length-1;i++)
{
    if(currDirection == "left")
    {
        snakeArray[i].x = prevX + 15;
        snakeArray[i].y = prevY;
    }
    else if(currDirection == "right")
    {
        snakeArray[i].x = prevX - 15;
        snakeArray[i].y = prevY;
    }
    else if(currDirection == "up")
    {
        snakeArray[i].x = prevX;
        snakeArray[i].y = prevY + 15;
    }
    else if(currDirection == "down")
    {
        snakeArray[i].x = prevX;
        snakeArray[i].y = prevY - 15;
    }


}
}