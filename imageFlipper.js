var loaderBar;
var stage;
var bar;
var imageContainer;
var currentImage;
var loaderWidth;
var loaderColor;
var borderPadding;
var preload;
var oldItem;
function criaImagens(manifest) {
if (window.top != window) {
document.getElementById("header").style.display = "none";
}
borderPadding = 10;
var barHeight = 20;
loaderColor = createjs.Graphics.getRGB(247,247,247);
loaderBar = new createjs.Container();
bar = new createjs.Shape();
bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();
imageContainer = new createjs.Container();
loaderWidth = 300;
var bgBar = new createjs.Shape();
var padding = 3
bgBar.graphics.setStrokeStyle(1).beginStroke(loaderColor).drawRect(-padding/2, -padding/2, loaderWidth+padding, barHeight+padding);
loaderBar.x = canvas.width - loaderWidth>>1;
loaderBar.y = canvas.height - barHeight>>1;
loaderBar.addChild(bar, bgBar);
imageContainer.addChild(loaderBar);


preload = new createjs.LoadQueue(false);
preload.on("progress", handleProgress);
preload.on("complete", handleComplete);
preload.on("fileload", handleFileLoad);
preload.loadManifest(manifest, true, "assets/");
}

function stop() {
if (preload != null) { preload.close(); }
}
function handleProgress(event) {
bar.scaleX = event.loaded * loaderWidth;
}
function handleFileLoad(event) {
var image = event.result;
var w = image.width;
var h = image.height;
var bmp = new createjs.Bitmap(image).set({
scaleX: 0.75,
scaleY: 0.75,
regX: w/2,
regY: h/2,
rotation: Math.random() * 16 - 8,
cursor: "pointer",
x: borderPadding/2 * 0.75,
y: borderPadding/2 * 0.75
});
bmp.on("click", handleClick);
var border = new createjs.Shape(
new createjs.Graphics().beginFill("#FFFFFF").drawRect(0, 0, w + borderPadding, h + borderPadding).endFill()
).set({
rotation: bmp.rotation,
regX: w/2,
regY: h/2,
scaleX: bmp.scaleX,
scaleY: bmp.scaleY,
shadow: new createjs.Shadow("#000000", 0, 0, 2.5)
});
var movieClip = new createjs.Container();
movieClip.addChild(border, bmp);
imageContainer.addChild(movieClip);
}

function handleClick(event) {
currentItem = event.target.parent;
var tween = createjs.Tween.get(currentItem, {override:true}).to({alpha:0}, 500).call(tweenUpComplete).to({alpha:1}, 500);
tween.on("change", handleTweenChange);
var audioPath = "assets/audio/";
    var manifest = [
        {id:"flip", src:"flip.mp3"},
    ];
	createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerManifest(manifest, audioPath);
createjs.Sound.play("flip");
}

function handleTweenChange(tween) {
stage.update();
}
function tweenUpComplete() {
imageContainer.addChildAt(currentItem, 0);
}
function handleComplete(event) {
loaderBar.visible = false;
}