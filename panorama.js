var dragContainer = new createjs.Container(); //Cenário como todo
var preloadPanorama = new createjs.LoadQueue(false);
var secao1 = new createjs.Container(); //Praça
var secao2 = new createjs.Container(); //Lagoa
var panoramaIsActive = false;
var balao = new createjs.Container();
var meninaBike = criaBike();


var right;
var left;
var up;
var down;

 //Booleanos de controle da camera
var moveLeft;
var moveRight;
var moveUp;
var moveDown;


function carregaAssetsPanorama(){
	preloadPanorama.on("complete", handleCompletePanorama);

	var manifestCenario = [
		{src:"images/cenarios/praca.png", id:"secao1"},
		{src:"images/cenarios/lagoa.png", id:"secao2"},
		{src:"sprites/raia.png", id:"raia"},
		{src:"sprites/relogio.png", id:"relogio"},
		{src:"sprites/bruxaSprite.png", id:"bruxinha"},
		{src:"sprites/meninaBike.png", id:"meninaBike"},
		{src:"sprites/bela.png", id:"Bila"},
		{src:"sprites/peao.png", id:"peao"},
		{src:"images/icons/setad.png", id:"setad"},
		{src:"images/icons/setae.png", id:"setae"},
		];
	preloadPanorama.loadManifest(manifestCenario, true, "assets/");
	
	var manifestBaloes = [
		{src:"images/bila/1.jpg", id: "Bila1"},
		{src:"images/bila/2.jpg", id: "Bila2"},
		{src:"images/bila/3.jpg", id: "Bila3"},
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
		{id:"risada menina", src:"risada_menina.mp3"},
	];
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.registerManifest(manifestAudio, audioPath);
	}
	
function stop() {
	if (preloadPanorama != null) { preloadPanorama.close(); }
	}
	
function handleCompletePanorama(event) {
	carregaAssetsBalengo();
	panorama();
}

function panorama() {
	console.log("teste");
	dragContainer.y = 973;

	createjs.Ticker.on("tick", tickPanorama);
	
	stage.addChild(dragContainer);
	var fundo = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRect(0, -373, 6000, 973));
	dragContainer.addChild(fundo);
	criaSecao1();
	criaSecao2();
	dragContainer.addChild(secao1);
	dragContainer.addChild(secao2);
	
	this.document.onkeydown = keyPressed;
	this.document.onkeyup = keyUp;
	createjs.Tween.get(containerMenu, {override : true}).to({ y : -600} , 2500, createjs.Ease.getPowOut(2));
	createjs.Tween.get(dragContainer,  {override : true}).to({ y : 0} , 4054, createjs.Ease.getPowOut(2)).call(terminouMenu);
}

 function terminouMenu(){
	stage.removeChild(containerMenu);
	criaHUD();
	panoramaIsActive = true;
	createjs.Tween.removeAllTweens();
	loopBike();
 }

function criaSecao1(){
	//Containers não possuem width e height definido, por isso estou pegando os da imagem
	var bitmap = new createjs.Bitmap(preloadPanorama.getResult("secao1"));
	bitmap.y = -373;
	secao1.width = bitmap.image.width;
	secao1.height = bitmap.image.height;
	var maxPositionX = - (secao1.width - stage.canvas.width);
	dragContainer.maxPositionX = maxPositionX; //Limites de posicionamento dele
	dragContainer.x = 0;
	//dragContainer.y = dragContainer.maxPositionY; //Só para começar no canto esquerdo de baixo
	
	secao1.addChild(new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRect(0, -280, secao1.width, 280)));
	secao1.addChild(bitmap);
	
	
	secao1.addChild(criaBruxinha());
	secao1.addChild(criaRelogio());
	secao1.addChild(criaBela());
	
	var olha = new createjs.Bitmap("assets/sprites/olha.png");
	olha.id = "";
	olha.texto= "Bora desenganchar a raia!";
	olha.x = 2650;
	olha.y = 300;
	olha.width = olha.image.width;
	olha.height = olha.image.height;
	olha.on("click", function(event){
		criaBalao(event.target, 200, 100);
		});
		
	var raia = new createjs.Bitmap("assets/sprites/raia.png");
	raia.x = 2300;
	raia.y = -220;
	raia.on("click", function(event){
		console.log("raia");
		if(!containerBalengo)
			getBalengo();
			stage.addChild(containerBalengo);
			panoramaIsActive = false;
		});
	secao1.addChild(raia);
	secao1.addChild(olha);
	
	meninaBike = criaBike();
	dragContainer.addChild(meninaBike);

	
}

function criaSecao2(){
	var bitmap2 = new createjs.Bitmap(preloadPanorama.getResult("secao2"));
	//bitmap2.sca
	bitmap2.x = -1000;
	bitmap2.y = 60;
	secao2.width = bitmap2.image.width - 1000;
	secao2.height = bitmap2.image.height;
	secao2.x = secao1.width;
	secao2.addChild(bitmap2);
}

function criaHUD(){
	var rectRight = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(stage.canvas.width*0.9, 0, 80, stage.canvas.height));
	var dragRight= new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragRight.hitArea = rectRight;
	dragRight.addEventListener("mouseover", overR);
	dragRight.addEventListener("mouseout", function (evt){ moveRight = false});
	dragRight.addEventListener("click", clickR);
	stage.addChild(dragRight);	
	
	
	var rectLeft = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(0, 0, 80, stage.canvas.height));
	var dragLeft = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragLeft.hitArea = rectLeft; 
	dragLeft.addEventListener("mouseover", overL);
	dragLeft.addEventListener("mouseout", function (evt){ moveLeft = false});
	dragLeft.addEventListener("click", clickL);
	stage.addChild(dragLeft);
	
	
	var rectUp = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(0, 0, stage.canvas.width, 60));
	var dragUp = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragUp.hitArea = rectUp; 
	dragUp.addEventListener("click", clickU);
	stage.addChild(dragUp);
	
	
	
	var rectDown = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(0, stage.canvas.height*0.9, stage.canvas.width, 60));
	var dragDown = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragDown.hitArea = rectDown; 
	dragDown.addEventListener("click", clickD);
	stage.addChild(dragDown);
	
	
	
	right = new createjs.Bitmap(preloadPanorama.getResult("setad"));
	right.x = stage.canvas.width - right.image.width;
	right.y = stage.canvas.height /2 - 50;
	
	left = new createjs.Bitmap(preloadPanorama.getResult("setad"));
	left.scaleX = -1;
	left.x = left.image.width;
	left.y = stage.canvas.height /2 - 50;
	
	up = new createjs.Bitmap(preloadPanorama.getResult("setad"));
	up.regX = up.image.width/2;
	up.regY = up.image.height/2;
	up.rotation = -90;
	up.x = stage.canvas.width/2;
	up.y = 0 + up.image.height/2;
	
	down = new createjs.Bitmap(preloadPanorama.getResult("setad"));
	down.regX = down.image.width/2;
	down.regY = down.image.height/2;
	down.rotation = 90;
	down.x = stage.canvas.width/2;
	down.y = 600 - down.image.height/2;
	
	stage.addChild(left);
	stage.addChild(right);
	stage.addChild(up);
	stage.addChild(down);
}

function overR(event){
	 if(dragContainer.y == 0)
		moveRight = true;
}

function clickR(event){
	if( dragContainer.y == 0){
		var positionX = dragContainer.x - stage.canvas.width;
		moveRight = false;
		if(positionX >= dragContainer.maxPositionX && dragContainer.y == 0){
			createjs.Tween.get(dragContainer, {override : true}).to({x:positionX},2000, createjs.Ease.getElasticOut(1, 2));
			}
		else
			createjs.Tween.get(dragContainer, {override : true}).to({ x : dragContainer.maxPositionX } , 2000, createjs.Ease.getElasticOut(1, 2));
	}
}

function overL(event){
	if(dragContainer.y == 0)
		moveLeft = true;
}

function clickL(event){
	if( dragContainer.y == 0){
		var positionX = dragContainer.x + stage.canvas.width;
		moveLeft = false;
		
		if(positionX <= 0)
			createjs.Tween.get(dragContainer, {override : true}).to({x:positionX,visible:true},2000, createjs.Ease.getElasticOut(1, 2));
		else
			createjs.Tween.get(dragContainer, {override : true}).to({ x : 0} , 2500, createjs.Ease.getElasticOut(1, 2));
	}
}

function clickU(){
	if(dragContainer.x<-2000 && dragContainer.x > -secao1.width){
		createjs.Tween.get(dragContainer,  {override : true}).to({ y : 373} , 2500, createjs.Ease.getElasticOut(1, 2));
		}
}

function clickD(){
	createjs.Tween.get(dragContainer,  {override : true}).to({ y : 0} , 2500, createjs.Ease.getElasticOut(1, 2));
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

function criaBruxinha(){
	var  clicado = false;
	var data = {
		framerate: 30,
		images: [preloadPanorama.getResult("bruxinha")],
		frames: {
			width:550, height:531
		},
		animations: {
			idle:[0, 34, true]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 1325;
	animation.y = 350; //secao1.height/2;
	animation.scaleX = animation.scaleY = 0.3;
	animation.som = "risada menina";
	animation.width = animation.spriteSheet.getFrameBounds(0).width*0.3;
	animation.height = animation.spriteSheet.getFrameBounds(0).height*0.3;
 
	animation.id = "bruxinha";
	animation.texto= "bruxinhas";
	animation.balaoW = 200;
	animation.balaoH = 200;
	animation.numFotos = 2;
		
	animation.on("click", anima);
	
	return animation;
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
	animation.y = 20; //secao1.height/2;
	animation.som = "poim";
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
 
	animation.id = "relogio";
	animation.texto= "BLABLA BLA BLABLA TICK TACK";
	animation.balaoW = 400;
	animation.balaoH = 300;
	animation.numFotos = 2;
		
	animation.on("click", anima);
	
	return animation;
}

function criaBela(){
	var data = {
		framerate: 10,
		images: [preloadPanorama.getResult("Bila")],
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
	animation.id = "Bila";
	animation.texto= "A bila é uma brincadeira muito massa! Elas são apostadas num triângulo e quem biçar mais leva tudo!";
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
	animation.balaoW = 400;
	animation.balaoH = 300;
	animation.numFotos = 3;
	
	animation.on("click", anima);
	
	return animation;
}

function criaBike(){
	var data = {
		framerate: 10,
		images: [preloadPanorama.getResult("meninaBike")],
		frames: {
			width:237, height:235.8
		},
		animations: {
			idle:[0, 34, true]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = secao1.width;
	animation.y = 350; //secao1.height/2;
	animation.direcao = "vindo";
	
	return animation;
}

function loopBike(){
	console.log(meninaBike.direcao);
	if(meninaBike.direcao == "vindo"){
		meninaBike.scaleX = -1;
		createjs.Tween.get(meninaBike).to({ x : -1000, direcao : "indo"} , 10000).call(loopBike);
	}
	
	if(meninaBike.direcao == "indo"){
		meninaBike.scaleX = 1;
		createjs.Tween.get(meninaBike).to({ x : -dragContainer.maxPositionX + 1800, direcao : "vindo"} , 10000).call(loopBike);
	}
}

function criaBela(){
	var data = {
		framerate: 10,
		images: [preloadPanorama.getResult("Bila")],
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
	animation.id = "Bila";
	animation.texto= "A bila é uma brincadeira muito massa! Elas são apostadas num triângulo e quem biçar mais leva tudo!";
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
	animation.balaoW = 400;
	animation.balaoH = 250;
	animation.numFotos = 3;
	
	animation.on("click", anima);
	
	return animation;
}

function criaBalao(animationAlvo){
	balao.removeAllChildren();

	var shapeBalao = new createjs.Shape(new createjs.Graphics().beginFill("#fff4dd").drawRoundRect( 0, 0, 400, 300, 5 ));
	var titulo = new createjs.Text(animationAlvo.id, "36px Bahiana", "#000000");
	titulo.regX = titulo.width/2;
	
	titulo.x = 200;
	titulo.y = 10;
	
	var texto = new createjs.Text(animationAlvo.texto, "24px FiraSans", "#000000");
	texto.x = 20;
	texto.y = 50;
	texto.lineWidth = 360;
	texto.lineHeight = 30;
	balao.addChild(shapeBalao);
	balao.addChild(titulo);
	balao.addChild(texto);
	
	balao.balaoAtivo = animationAlvo.id;
	balao.regY = 300;
	balao.regX = 0;
	balao.x = animationAlvo.x + animationAlvo.width;
	balao.y = animationAlvo.y + animationAlvo.height;	
	
	if(balao.y <= 300)
	{
		balao.regY = 0;
		balao.y = animationAlvo.y;
	}
	
	if(balao.x + 400 > -dragContainer.maxPositionX + 800)
	{
		balao.regX = 400;
		balao.x = animationAlvo.x;
		createjs.Tween.get(dragContainer).to({ x : -animationAlvo.x + 480} , 1000);
	}
	
	else{
		createjs.Tween.get(dragContainer).to({ x : -animationAlvo.x + 80} , 1000);
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
	regras.on("click",createPopup);
	balao.addChild(regras);
	balao.addChild(imageContainer);
	imageContainer.x = 80;
	imageContainer.y = height - 80;
}

function createPopup(){

var windowhandle=window.open("", "newwin", "height=260, width=340");
windowhandle.document.write('<title>My Video</title>');
windowhandle.document.write('<embed src="raia.m4v" width=330 height=250 />');
/*
Shadowbox.open({
        content:    'raia.m4v',
		player: 'm4v',
        title:      "Raia",
        height:     240,
        width:      320
    });
	*/
}

function keyPressed(event) {
	
		switch(event.keyCode) 
		{
			case 37:
				if(panoramaIsActive)
				{
					moveLeft = true;
				}
					moveMeninoLeft = true;

			break;
			
			case 39:
			if(panoramaIsActive)
			{
				moveRight = true;
			}
					moveMeninoRight = true;
			break;
		}
	}
	
	

function keyUp(event) {
	switch(event.keyCode) 
	{
		case 37:	
		moveLeft = false;
		moveMeninoLeft = false;
		break;
		
		case 39:
		moveRight = false;
		moveMeninoRight = false;
		break;
	}
}


// Update the stage
function tickPanorama(event) {	
	gerenciaAlphaHUD();
	if (moveRight) {
       dragContainer.x -= 10;
	   createjs.Tween.get(balao).to({scaleX:0, scaleY:0, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
	   balao.balaoAtivo = "";
	   }
	   
	else if (moveLeft) {
       dragContainer.x += 10;
	   createjs.Tween.get(balao).to({scaleX:0, scaleY:0, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
	   balao.balaoAtivo = "";
	   }
}

function gerenciaAlphaHUD(){
	if(dragContainer.x <= dragContainer.maxPositionX ||  dragContainer.y != 0){
		moveRight = false;
		right.alpha = 0;
		}
	else	
		right.alpha = 100;
	
	if(dragContainer.x>=0 || dragContainer.y != 0){
		moveLeft=false;
		left.alpha=0;
		}
	else
		left.alpha = 100;
		
	if(dragContainer.x<-1800 && dragContainer.x > -secao1.width && dragContainer.y == 0){
		up.alpha = 100;
	}
	else
		up.alpha = 0;
		
	if(dragContainer.y == 373){
		down.alpha = 100;
	}
	else
		down.alpha = 0;
}
