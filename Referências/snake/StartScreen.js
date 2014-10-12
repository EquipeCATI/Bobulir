var introBackground;
var startScreenBtn;
var startScreenBtnImg;
var stage;
var stageHeight;
var stageWidth;
//this function render start screen
function renderStartScreen()
{
stage = new createjs.Stage("canvas1");
loadMainGame();

}
//event handler function get called on start button roll over
function onstartScreenBtnOver()
{
startScreenBtnImg.image.src = "assets/images/start_button_over.png";
}
//event handler function get called on start button roll out
function onstartScreenBtnOut()
{
startScreenBtnImg.image.src = "assets/images/start_button_normal.png";
}
//event handler function get called on start button click
function onstartScreenBtnClick(event)
{
cleanupStartScreen();
}
//event handler function get called on specified interval 
function startScreenTickHandler()
{
stage.update();
}
//clean start screen and loads main game
function cleanupStartScreen()
{
stage.removeAllChildren();
stage.update();
stage.removeAllEventListeners();
createjs.Ticker.removeEventListener("tick", startScreenTickHandler);

}