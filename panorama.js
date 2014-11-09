var dragContainer = new createjs.Container(); //Cenário como todo
var preloadPanorama = new createjs.LoadQueue(false);
var secao1 = new createjs.Container(); //Praça
var secao2 = new createjs.Container(); //Lagoa

var balao = new createjs.Container();


 //Booleanos de controle da camera
var moveLeft;
var moveRight;

function carregaAssetsPanorama(){
	preloadPanorama.on("complete", handleCompletePanorama);

	var manifestCenario = [
		{src:"images/cenarios/cenario1-cor2.png", id:"secao1"},
		{src:"images/cenarios/teste2.jpg", id:"secao2"},
		{src:"sprites/raia.png", id:"raia"},
		{src:"sprites/relogio.png", id:"relogio"},
		{src:"sprites/bela.png", id:"bila"},
		{src:"sprites/peao.png", id:"peao"},
		{src:"images/icons/setad.png", id:"setad"},
		{src:"images/icons/setae.png", id:"setae"},
		];
	preloadPanorama.loadManifest(manifestCenario, true, "assets/");
	
	var manifestBaloes = [
		{src:"images/bila/1.jpg", id: "bila1"},
		{src:"images/bila/2.jpg", id: "bila2"},
		{src:"images/bila/3.jpg", id: "bila3"},
		{src:"images/relogio/1.jpg", id: "relogio1"},
		{src:"images/relogio/2.png", id: "relogio2"},
		];
	preloadPanorama.loadManifest(manifestBaloes, true, "assets/");
	
	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
	var audioPath = "assets/audio/";
	var manifestAudio = [
		{id:"flip", src:"flip.mp3"},
		{id:"poim", src:"poim.mp3"},
		{id:"magia", src:"magia.mp3"},
	];
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.registerManifest(manifestAudio, audioPath);
	}
	
function stop() {
	if (preloadPanorama != null) { preloadPanorama.close(); }
	}
	
function handleCompletePanorama(event) {
	panorama();
}

function panorama() {
	stage.removeAllChildren();
	createjs.Ticker.removeAllEventListeners();
	createjs.Ticker.on("tick", tickPanorama);
	stage.addChild(dragContainer);
	
	criaSecao1();
	
	criaSecao2();
	
	criaHUD();

	dragContainer.addChild(secao2);
	dragContainer.addChild(secao1);
}

function criaSecao1(){
	//var bitmap = new createjs.Bitmap("cenarios/teste.jpg"); //Containers não possuem width e height definido, por isso estou pegando os da imagem
	var bitmap = new createjs.Bitmap(preloadPanorama.getResult("secao1"));
	secao1.width = bitmap.image.width;
	secao1.height = bitmap.image.height;
	var maxPositionX = - (secao1.width - stage.canvas.width);
	dragContainer.maxPositionX = maxPositionX; //Limites de posicionamento dele
	//dragContainer.y = dragContainer.maxPositionY; //Só para começar no canto esquerdo de baixo
	

	/*
	var lVideo = document.createElement('EMBED');
	var lParent = document.getElementById('videoContainer');
		lVideo.src = "assets/images/cenarios/teste2.jpg";
		lVideo.style.overflow = 'auto';
		
		// Lets set the volume
		//lVideo.volume = 0.6;
		//lVideo.controls = true;

		lParent.appendChild(lVideo);

		// Convert this to a dom element so that it can be added to our container (display list).
		var lVideoDOMElement = new createjs.DOMElement(lVideo);
		secao1.addChild(lVideoDOMElement);
	*/
	
	secao1.addChild(bitmap);
	secao1.addChild(criaRelogio());
	secao1.addChild(criaBela());
	
	var olha = new createjs.Bitmap("assets/sprites/olha.png");
	olha.id = "Menina-raia";
	olha.texto= "Bora desenganchar a raia!";
	olha.x = 2250;
	olha.y = 300;
	olha.width = olha.image.width;
	olha.height = olha.image.height;
	olha.on("click", function(event){
		criaBalao(event.target, 200, 100);
		});
		
	var raia = new createjs.Bitmap("assets/sprites/raia.png");
	raia.x = 2300;
	raia.y = 10;
	raia.on("click", function(event){
		stage.addChild(getBalengo());
		});
	secao1.addChild(raia);
	secao1.addChild(olha);
}

function criaSecao2(){
	var bitmap2 = new createjs.Bitmap(preloadPanorama.getResult("secao2")); 
	secao2.width = bitmap2.image.width;
	secao2.height = bitmap2.image.height;
	secao2.x = secao1.width;
	secao2.addChild(bitmap2);
}

function criaHUD(){
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
	
	right = new createjs.Bitmap(preloadPanorama.getResult("setad"));
	right.x = stage.canvas.width - 110;
	right.y = stage.canvas.height /2 - 50;
	
	
	left = new createjs.Bitmap(preloadPanorama.getResult("setae"));
	left.x = 10;
	left.y = stage.canvas.height /2 - 50;
	
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

function anima(evt){
	evt.target.gotoAndPlay("run");
	createjs.Sound.play(evt.target.som);
			
	if(balao.balaoAtivo != evt.target.id){
		criaBalao(evt.target, evt.target.balaoW, evt.target.balaoH);
		criaImagens(evt.target.id, evt.target.numFotos);
		addFotosRegras(evt.target.balaoW, evt.target.balaoH);
		
	}
}


function criaRelogio(){
	var  clicado = false;
	var data = {
		framerate: 10,
		images: [preloadPanorama.getResult("relogio")],
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
	animation.som = "poim";
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
 
	animation.id = "relogio";
	animation.texto= "BLABLA BLA BLABLA TICK TACK";
	animation.balaoW = 200;
	animation.balaoH = 200;
	animation.numFotos = 2;
		
	animation.on("click", anima);
	
	return animation;
}

function criaBela(){
	var data = {
		framerate: 10,
		images: [preloadPanorama.getResult("bila")],
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
	animation.x = 50;
	animation.y = 300;	
	animation.som = "magia";
	animation.id = "bila";
	animation.texto= "Bila\n\nJogadores: 2 ou mais\n\nA bila é uma brincadeira muito massa! Elas são apostadas num triângulo e quem biçar mais leva tudo!";
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
	animation.balaoW = 250;
	animation.balaoH = 250;
	animation.numFotos = 3;
	
	animation.on("click", anima);
	
	return animation;
}

function criaBalao(animationAlvo, width, height){
	balao.removeAllChildren();

	var shapeBalao = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRoundRect( 0, 0, width, height, 5 ));
	var texto = new createjs.Text(animationAlvo.texto, "14px Arial", "#FFFFFF");
	texto.x = 10;
	texto.y = 10;
	texto.lineWidth = width - 10;
	balao.addChild(shapeBalao);
	balao.addChild(texto);
	
	balao.balaoAtivo = animationAlvo.id;
	balao.regX = width;
	balao.regY = height;
	balao.x = animationAlvo.x ;
	balao.y = animationAlvo.y;	
	
	if(balao.y <= 10)
	{
		balao.regY = 0;
		balao.y = animationAlvo.y + animationAlvo.height;
	}
	
	if(balao.x - width < -dragContainer.x)
	{
		balao.regX = 0;
		balao.x = animationAlvo.x + animationAlvo.width;
	}
		
	animationAlvo.parent.addChild(balao);
	balao.scaleX = 0;
	balao.scaleY = 0;
	createjs.Tween.get(balao).to({scaleX:1, scaleY:1, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
}

function addFotosRegras(width, height){
	var regras = new createjs.Bitmap("assets/images/icons/regras.png");
	regras.x = width - 80;
	regras.y = height - 100;
	balao.addChild(regras);
	balao.addChild(imageContainer);
	imageContainer.x = 80;
	imageContainer.y = height - 80;
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
