var stage;

var dragContainer = new createjs.Container(); //Cenário como todo
var secao1 = new createjs.Container(); //Praça
var secao2 = new createjs.Container(); //Lagoa
var bitmap = new createjs.Bitmap("cenarios/cenario1.png");
var maxPositionX;
//Setas
var right ; 
var left ;

 //Booleanos de controle da camera
var moveLeft;
var moveRight;

function init() {
	stage = new createjs.Stage("canvas");
	createjs.Ticker.addEventListener("tick", tick);
	stage.enableMouseOver(20);  
	stage.addChild(dragContainer);

	

	
	//var bitmap = new createjs.Bitmap("cenarios/teste.jpg"); //Containers não possuem width e height definido, por isso estou pegando os da imagem
	secao1.width = bitmap.image.width;
	secao1.height = bitmap.image.height;
	maxPositionX = - (secao1.width - stage.canvas.width);
	dragContainer.maxPositionX = maxPositionX; //Limites de posicionamento dele
	//dragContainer.y = dragContainer.maxPositionY; //Só para começar no canto esquerdo de baixo
	
	/*
	var lVideo = document.createElement('video');
	var lParent = document.getElementById('videoContainer');
		lVideo.src = "iron.mp4";
		
		lVideo.hidden   = false;

 		lVideo.width  = 400;
 		lVideo.height = 400;
		
		// Lets set the volume
		lVideo.volume = 0.6;
		lVideo.controls = true;

		//lParent.appendChild(lVideo);

		// Convert this to a dom element so that it can be added to our container (display list).
		var lVideoDOMElement = new createjs.DOMElement(lVideo);
		lVideoDOMElement.x = -100;
		lVideoDOMElement.y = 10;*/
	
	secao1.addChild(bitmap);
	//secao1.addChild(lVideoDOMElement);
	secao1.addChild(criaRelogio());
	var olha = new createjs.Bitmap("sprites/olha.png");
	olha.x = 600;
	olha.y = 300;
	secao1.addChild(olha);
	
	var bitmap2 = new createjs.Bitmap("cenarios/teste2.jpg"); 
	secao2.width = bitmap2.image.width;
	secao2.height = bitmap2.image.height;
	secao2.x = secao1.width;
	secao2.addChild(bitmap2);
	secao2.addChild(criaBela());
	
	

	var rectRight = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(stage.canvas.width*0.90, 0, stage.canvas.width*0.10, stage.canvas.height));

	var dragRight= new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragRight.hitArea = rectRight;
	dragRight.addEventListener("mouseover", overR);
	dragRight.addEventListener("mouseout", function (evt){ moveRight = false});
	dragRight.addEventListener("click", clickR);
	stage.addChild(dragRight);	
	
	var rectLeft = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(0, 0, stage.canvas.width*0.10, stage.canvas.height));

	var dragLeft = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragLeft.hitArea = rectLeft; 
	dragLeft.addEventListener("mouseover", overL);
	dragLeft.addEventListener("mouseout", function (evt){ moveLeft = false});
	dragLeft.addEventListener("click", clickL);
	stage.addChild(dragLeft);
	
	right = new createjs.Bitmap("cenarios/setad.png");
	right.x = stage.canvas.width - 110;
	right.y = stage.canvas.height /2 - 50;
	
	
	left = new createjs.Bitmap("cenarios/setae.png");
	left.x = 10;
	left.y = stage.canvas.height /2 - 50;
	
	dragContainer.addChild(secao1);
	dragContainer.addChild(secao2);

	stage.addChild(left);
	stage.addChild(right);


}

function overR(event){
		moveRight = true;
}

function clickR(event){
	var positionX = dragContainer.x - stage.canvas.width;
	moveRight = false;
	if(positionX >= dragContainer.maxPositionX)
		createjs.Tween.get(dragContainer).to({x:positionX},2000, createjs.Ease.getElasticOut(1, 2));
	else
		createjs.Tween.get(dragContainer).to({ x : dragContainer.maxPositionX } , 2000, createjs.Ease.getElasticOut(1, 2));
}

function overL(event){
		moveLeft = true;
}

function clickL(event){
	var positionX = dragContainer.x + stage.canvas.width;
	moveLeft = false;
	
	if(positionX <= 0)
		createjs.Tween.get(dragContainer).to({x:positionX,visible:true},2000, createjs.Ease.getElasticOut(1, 2));
	else
		createjs.Tween.get(dragContainer).to({ x : 0} , 2500, createjs.Ease.getElasticOut(1, 2));
}


function criaRelogio(){
	var  clicado = false;
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
	animation.x = secao1.width/2;
	animation.y = 0; //secao1.height/2;
	
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
		if(!clicado){
			clicado = true;
			dragContainer.maxPositionX -=  secao2.width;
			}
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
	animation.x = 2400;
	animation.y = secao2.height/2;

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


// Update the stage
function tick(event) {
	stage.update();
	
	if(dragContainer.x < dragContainer.maxPositionX){
		moveRight = false;
		right.alpha = 0;
		}
	else	
		right.alpha = 100;
	
	if(dragContainer.x>=0){
		moveLeft=false;
		left.alpha=0;
		}
	else
		left.alpha = 100;
	
	if (moveRight) {
       dragContainer.x -= 10;
	   }
	   
	else if (moveLeft) {
       dragContainer.x += 10;
	   }
	   
}
