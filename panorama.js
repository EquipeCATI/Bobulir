var stage;
var dragContainer; //Cenário como todo
var right ;
var left ;

function init() {
	stage = new createjs.Stage("canvas");
	createjs.Ticker.addEventListener("tick", tick);
	stage.enableMouseOver(20);  
	//Cenário
	dragContainer = new createjs.Container();
	stage.addChild(dragContainer);
	
	var bitmap = new createjs.Bitmap("cenarios/teste.jpg"); //Containers não possuem width e height definido, por isso estou pegando os da imagem
	dragContainer.width = bitmap.image.width;
	dragContainer.height = bitmap.image.height;
	dragContainer.maxPositionX = - (dragContainer.width - stage.canvas.width); //Limites de posicionamento dele
	dragContainer.maxPositionY = - (dragContainer.height - stage.canvas.height);
	
	dragContainer.y = dragContainer.maxPositionY; //Só para começar no canto esquerdo de baixo
	dragContainer.addChild(bitmap);
	dragContainer.addChild(criaRelogio());
	dragContainer.addChild(criaBela());
	
	var rectRight = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(stage.canvas.width*0.95, 0, stage.canvas.width*0.05, stage.canvas.height));

	var dragRight= new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragRight.hitArea = rectRight;
	dragRight.addEventListener("mouseover", dragR);
	
	stage.addChild(dragRight);	
	
	var rectLeft = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(0, 0, stage.canvas.width*0.05, stage.canvas.height));

	var dragLeft = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragLeft.hitArea = rectLeft; 
	dragLeft.addEventListener("mouseover", dragL);
	stage.addChild(dragLeft);
	
	right = new createjs.Bitmap("cenarios/setad.png");
	right.x = stage.canvas.width - 110;
	right.y = stage.canvas.height /2 - 50;
	stage.addChild(right);
	
	left = new createjs.Bitmap("cenarios/setae.png");
	left.x = 10;
	left.y = stage.canvas.height /2 - 50;
	stage.addChild(left);
}

function dragR(event){
	var positionX = dragContainer.x - stage.canvas.width;
	
	if(positionX >= dragContainer.maxPositionX){
		createjs.Tween.get(dragContainer).to({x:positionX,visible:true},2000, createjs.Ease.getElasticOut(1, 2));
		}
	else{
		createjs.Tween.get(dragContainer).to({ x : dragContainer.maxPositionX } , 2500, createjs.Ease.getElasticOut(1, 2));
		}
}

function dragL(event){
	var positionX = dragContainer.x + stage.canvas.width;
	
	if(positionX <= 0){
		createjs.Tween.get(dragContainer).to({x:positionX,visible:true},2000, createjs.Ease.getElasticOut(1, 2));
		}
	else{
		createjs.Tween.get(dragContainer).to({ x : 0} , 2500, createjs.Ease.getElasticOut(1, 2));
		}
}

function criaRelogio(){
	
	var data = {
		framerate: 10,
		images: ["Sprites/relogio.png"],
		frames: {
			width:100, height:100
		},
		animations: {
			idle:0,
			run:[0, 15, "idle", 0.5]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 1300;
	animation.y = 800;
	
	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
    var audioPath = "audio/";
    var manifest = [
        {id:"poim", src:"poim.mp3"},
    ];
 
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerManifest(manifest, audioPath);
	
	animation.on("click", function move(evt){
		animation.gotoAndPlay("run");
		createjs.Sound.play("poim");
	});
	
	return animation;
}

function criaBela(){
	var data = {
		framerate: 10,
		images: ["Sprites/bela.png"],
		frames: {
			width:150, height:150
		},
		animations: {
			idle: 0,
			run: [0, 19, "idle", 0.5]
		}
	};
	
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 1800;
	animation.y = 1000;

	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
    var audioPath = "audio/";
    var manifest = [
        {id:"magia", src:"magia.mp3"},
    ];
 
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerManifest(manifest, audioPath);
	
	animation.on("click", function move(evt){
		animation.gotoAndPlay("run");
		createjs.Sound.play("magia");
	});
	
	return animation;
}
/*
var offset = new createjs.Point();
function startDrag(event) {
	offset.x = stage.mouseX - dragContainer.x;
	offset.y = stage.mouseY - dragContainer.y;
	event.addEventListener("mousemove", doDrag);
}

function doDrag(event) {
	var positionX = event.stageX - offset.x;
	var positionY = event.stageY - offset.y;
	if (positionX <= 0 && positionX >= dragContainer.maxPositionX)
		dragContainer.x = event.stageX - offset.x;

	if (positionY <= 0 && positionY >= dragContainer.maxPositionY)
		dragContainer.y = event.stageY - offset.y;
}
*/

// Update the stage
function tick(event) {
	stage.update();
	
	if(dragContainer.x <= dragContainer.maxPositionX)
		createjs.Tween.get(right).to({ alpha : 0} , 500);
	else
		createjs.Tween.get(right).to({ alpha : 100} , 500);
		
	if(dragContainer.x >= 0)
		createjs.Tween.get(left).to({ alpha : 0} , 500);
	else
		createjs.Tween.get(left).to({ alpha : 100} , 500);

		
	
}
