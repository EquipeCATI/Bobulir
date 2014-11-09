var imageContainer;
var oldItem;

function criaImagens(id, num) {
	imageContainer = new createjs.Container();
	borderPadding = 10;
	imageContainer.removeAllChildren();

	for(var i=1; i<=num; i++)
	{
		
		var image = new createjs.Bitmap(preloadPanorama.getResult(id+i));
		
		var w = image.image.width;
		var h = image.image.height;
		
		image.scaleX = 0.75;
		image.scaleY = 0.75;
		image.regX = w/2;
		image.regY = h/2;
		image.rotation = Math.random() * 16 - 8;
		image.x = borderPadding/2 * 0.75;
		image.y = borderPadding/2 * 0.75;
		image.on("click", handleClick);
		
		var border = new createjs.Shape(new createjs.Graphics().beginFill("#FFFFFF").drawRect(0, 0, w + borderPadding, h + borderPadding).endFill());
		border.rotation = image.rotation;
		border.regX = w/2;
		border.regY = h/2;
		border.scaleX = image.scaleX;
		border.scaleY = image.scaleY;
		border.shadow = new createjs.Shadow("#000000", 0, 0, 2.5);
		
		var movieClip = new createjs.Container();
		movieClip.addChild(border, image);
		imageContainer.addChild(movieClip);
	}
}

function handleClick(event) {
	createjs.Sound.play("flip");
	currentItem = event.target.parent;
	var tween = createjs.Tween.get(currentItem, {override:true}).to({alpha:0}, 500).call(tweenUpComplete).to({alpha:1}, 500);
	tween.on("change", handleTweenChange);
}

function tweenUpComplete() {
	imageContainer.addChildAt(currentItem, 0);
}