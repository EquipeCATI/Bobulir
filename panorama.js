var dragContainer = new createjs.Container(); //Cenário como todo
var secao1 = new createjs.Container(); //Praça
var secao2 = new createjs.Container(); //Lagoa

var balao = new createjs.Container();


 //Booleanos de controle da camera
var moveLeft;
var moveRight;




function panorama() {
	stage.removeAllChildren();
	createjs.Ticker.removeAllEventListeners();
	createjs.Ticker.on("tick", tickPanorama);
	stage.addChild(dragContainer);

	//var bitmap = new createjs.Bitmap("cenarios/teste.jpg"); //Containers não possuem width e height definido, por isso estou pegando os da imagem
	var bitmap = new createjs.Bitmap("cenarios/cenario1.png");
	secao1.width = bitmap.image.width;
	secao1.height = bitmap.image.height;
	var maxPositionX = - (secao1.width - stage.canvas.width);
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
		//secao1.addChild(lVideoDOMElement);
	
	
	secao1.addChild(bitmap);
	secao1.addChild(criaRelogio());
	secao1.addChild(criaBela());
	
	var olha = new createjs.Bitmap("sprites/olha.png");
	olha.x = 600;
	olha.y = 300;
	olha.on("click", function(event){
		stage.addChild(getBalengo());
		});
	secao1.addChild(olha);
	
	var bitmap2 = new createjs.Bitmap("cenarios/teste2.jpg"); 
	secao2.width = bitmap2.image.width;
	secao2.height = bitmap2.image.height;
	secao2.x = secao1.width;
	secao2.addChild(bitmap2);
	

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
	
	
	dragContainer.addChild(secao2);
	dragContainer.addChild(secao1);

	stage.addChild(left);
	stage.addChild(right);
	

}

function btnClicked(event){
	console.log("Clickou");
}



function overR(event){
		moveRight = true;
}

function clickR(event){
	var positionX = dragContainer.x - stage.canvas.width;
	moveRight = false;
	if(positionX >= dragContainer.maxPositionX)
		createjs.Tween.get(dragContainer, {override : true}).to({x:positionX},2000, createjs.Ease.getElasticOut(1, 2));
	else
		createjs.Tween.get(dragContainer, {override : true}).to({ x : dragContainer.maxPositionX } , 2000, createjs.Ease.getElasticOut(1, 2));
}

function overL(event){
		moveLeft = true;
}

function clickL(event){
	var positionX = dragContainer.x + stage.canvas.width;
	moveLeft = false;
	
	if(positionX <= 0)
		createjs.Tween.get(dragContainer, {override : true}).to({x:positionX,visible:true},2000, createjs.Ease.getElasticOut(1, 2));
	else
		createjs.Tween.get(dragContainer, {override : true}).to({ x : 0} , 2500, createjs.Ease.getElasticOut(1, 2));
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
	animation.x = 800;
	animation.y = 0; //secao1.height/2;
	
	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
    var audioPath = "audio/";
    var manifest = [
        {id:"poim", src:"poim.mp3"},
    ];
	
	animation.id = "Relógio";
	animation.texto= "tick tack";
 
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerManifest(manifest, audioPath);
	
	animation.on("click", function move(evt){
		animation.gotoAndPlay("run");
		createjs.Sound.play("poim");
		if(!clicado){
			clicado = true;
			dragContainer.maxPositionX -=  secao2.width;
			}
			
		if(balao.balaoAtivo != animation.id)
			criaBalao(animation);
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
	animation.x = 500;
	animation.y = 300;

	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
    var audioPath = "audio/";
    var manifest = [
        {id:"magia", src:"magia.mp3"},
    ];
 
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerManifest(manifest, audioPath);
	
	animation.id = "Bela";
	animation.texto= "teste";
	
	animation.on("click", function move(evt){
		animation.gotoAndPlay("run");
		createjs.Sound.play("magia");
		if(balao.balaoAtivo != animation.id)
			criaBalao(animation);
	});
	
	return animation;
}

function criaBalao(animationAlvo){
	balao.removeAllChildren();

	var shapeBalao = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRoundRect( 0, 0, 200, 100, 5 ));
	var texto = new createjs.Text(animationAlvo.texto, "20px Arial", "#FFFFFF");
	balao.addChild(shapeBalao);
	balao.addChild(texto);
	
	balao.balaoAtivo = animationAlvo.id;
	
	balao.regX = 0;
	balao.regY = 100;
	balao.x = animationAlvo.x + animationAlvo.spriteSheet.getFrameBounds(0).width;
	balao.y = animationAlvo.y;
	
	if(balao.y <= 10)
	{
		balao.regY = 0;
		balao.y = animationAlvo.y + animationAlvo.spriteSheet.getFrameBounds(0).height;
	}
	
	if(balao.x + 200 > -dragContainer.x + 800)
	{
		balao.regX = 200;
		balao.x = animationAlvo.x;
	}
		
	animationAlvo.parent.addChild(balao);
	
	balao.scaleX = 0;
	balao.scaleY = 0;
	createjs.Tween.get(balao).to({scaleX:1, scaleY:1, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
}


// Update the stage
function tickPanorama(event) {
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
