var dragContainer = new createjs.Container(); //Cenário como todo
var preloadPanorama = new createjs.LoadQueue(false);
var secao1 = new createjs.Container(); //Praça
var secao2 = new createjs.Container(); //Lagoa
var panoramaIsActive = false;
var balao = new createjs.Container();
var meninaBike = criaBike();
var maoClique;
var buleiro;
var baiao;
var raia;
var meninaOlha;
var windowVar ;
var right;
var left;
var botaoSom;
var containerTutorialPanorama;

var bigObjectFlag = false;

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
		{src:"sprites/mark.png", id:"mark"},
		{src:"sprites/raia.png", id:"raia"},
		{src:"sprites/raiaCaixa.png", id:"raiaLagoa"},
		{src:"sprites/relogio.png", id:"relogio"},
		{src:"sprites/bruxaSprite.png", id:"bruxinha"},
		{src:"sprites/bruxaSprite2.png", id:"bruxinhaRun"},
		{src:"sprites/meninaBike2.png", id:"meninaBike"},
		{src:"sprites/tutorial.png", id:"tutorialPanorama"},
		{src:"sprites/bila.png", id:"bila"},
		{src:"sprites/peao.png", id:"peao"},
		{src:"sprites/corda.png", id:"corda"},
		{src:"sprites/olha.png", id:"olha"},
		{src:"sprites/dedada.png", id:"maoClique"},
		{src:"images/icons/setad.png", id:"setad"},
		{src:"images/icons/setae.png", id:"setae"},
		{src:"images/icons/seta.png", id:"seta"},
		{src:"images/icons/mais.png", id:"mais"},
		{src:"images/icons/som.png", id:"som"},
		{src:"images/icons/balaoFala.png", id:"balaoFala"},
		];
	preloadPanorama.loadManifest(manifestCenario, true, "assets/");
	
	var manifestBaloes = [
		{src:"balao.png", id: "balao"},
		{src:"bila/1.jpg", id: "bila1"},
		{src:"bila/2.jpg", id: "bila2"},
		{src:"bila/3.jpg", id: "bila3"},
		{src:"relogio/1.jpg", id: "relogio1"},
		{src:"relogio/2.png", id: "relogio2"},
		{src:"bruxinha/1.jpg", id: "bruxinha1"},
		{src:"bruxinha/2.jpg", id: "bruxinha2"},
		{src:"bruxinha/3.jpg", id: "bruxinha3"},
		];
	preloadPanorama.loadManifest(manifestBaloes, true, "assets/images/baloes/");
	
	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
	var audioPath = "assets/audio/";
	var manifestAudio = [
		{id:"flip", src:"flip.mp3"},
		{id:"poim", src:"poim.mp3"},
		{id:"magia", src:"bila.wav"},
		{id:"baiao", src:"baiao.wav"},
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

function clickableMark(evt){
if(balao.balaoAtivo != evt.target.id){
	buleiro.x = evt.target.x + evt.target.width/2;
	buleiro.y = evt.target.y - 20;
	evt.target.parent.addChild(buleiro);
	}
	evt.target.on("click", clickableOut);
}

function clickableOut(evt){
	evt.target.parent.removeChild(buleiro);
}

//Marcador de objetos clicáveis
function criaBuleiro(){
	var data = {
		framerate: 24,
		images: [preloadPanorama.getResult("mark")],
		frames: {
			width:368, height:377
		},
		animations: {
			idle:[0, 23]
        },
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.scaleX = animation.scaleY = 0.1;
	animation.regX = 184;
	animation.regY = 188;
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
	return animation;
}

function panorama() {
	console.log("teste");
	dragContainer.y = 973;
	createjs.Ticker.on("tick", tickPanorama);
	createjs.Ticker.setFPS(20);
	buleiro = criaBuleiro();
	
	stage.addChild(dragContainer);
	var fundo = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRect(0, -373, 6000, 973));
	dragContainer.addChild(fundo);
	criaSecao1();
	criaSecao2();
	dragContainer.addChild(secao1);
	dragContainer.addChild(secao2);
	meninaBike = criaBike();
	dragContainer.addChild(meninaBike);
	
	this.document.onkeydown = keyPressed;
	this.document.onkeyup = keyUp;
	baiao = createjs.Sound.play("baiao", {loop : 100});
	baiao.volume = 0.2;
	createjs.Tween.get(containerMenu, {override : true}).to({ y : -600} , 2500, createjs.Ease.getPowOut(2));
	createjs.Tween.get(dragContainer,  {override : true}).to({ y : 0} , 4054, createjs.Ease.getPowOut(2)).call(terminouMenu);
}

 function terminouMenu(){
	stage.removeChild(containerMenu);
	criaHUD();
	panoramaIsActive = true;
	createjs.Tween.removeAllTweens();
	loopBike();
	tutorialPanorama();
 }

function tutorialPanorama(){
	var maoTuto = maoClique;
	maoTuto.alpha = 1;
	maoTuto.x = 720;
	maoTuto.y = 485;
	containerTutorialPanorama = new createjs.Container();
	var fundoTuto = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRoundRect(0, 0, stage.canvas.width, stage.canvas.height, 10));
	fundoTuto.alpha = 0.5;
	containerTutorialPanorama.addChild(fundoTuto);
	
	var balaoTuto = new createjs.Container();
	
	var shapeBalao = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRoundRect( 0, 0, 200, 200, 5 ));
	balaoTuto.x = 15;
	balaoTuto.y = 380;
	balaoTuto.addChild(shapeBalao);
	
	var titulo = new createjs.Text("Bem vindo!", "50px Bahiana", "#ffffff");
	var b = titulo.getBounds();
	titulo.x = 15;
	titulo.y = 15;
	balaoTuto.addChild(titulo);
	
	var texto = new createjs.Text("Use as setas do teclado ou as da tela para andar pela praça", "20px FiraSans", "#000000");
	texto.x = 15;
	texto.y = 75;
	texto.lineWidth = 170;
	texto.lineHeight = 25;
	balaoTuto.addChild(texto);
	
	containerTutorialPanorama.addChild(criaBotaoTutoPanorama());
	containerTutorialPanorama.addChild(criaTutorialPanorama());
	containerTutorialPanorama.addChild(balaoTuto);
	containerTutorialPanorama.addChild(maoTuto);
	stage.addChild(containerTutorialPanorama);
	containerTutorialPanorama.scaleX = containerTutorial.scaleY = 0;
	containerTutorialPanorama.regX = 400;
	containerTutorialPanorama.regY = 300;
	containerTutorialPanorama.x = 400;
	containerTutorialPanorama.y = 300;
	createjs.Tween.get(containerTutorialPanorama, {override : true}).to({ scaleX : 1, scaleY : 1} , 500);
}

function criaTutorialPanorama(){
	var data = {
		framerate: 60,
		images: [preloadPanorama.getResult("tutorialPanorama")],
		frames: {
			width:740, height:500
		},
		animations: {
			idle: [1, 70]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 30;
	animation.y = 15; //secao1.height/2;

	return animation;
}

function criaBotaoTutoPanorama(){
	var botao = new createjs.Container();
	
	var shapeBotao = new createjs.Shape(new createjs.Graphics().beginFill("#ed682c").drawRoundRect( 0, 0, 120, 50, 5 ));
	botao.addChild(shapeBotao);
	
	var titulo = new createjs.Text("Bó bulir!", "50px Bahiana", "#ffffff");
	var b = titulo.getBounds();
	titulo.x = 0;
	botao.addChild(titulo);
	
	botao.x = 650;
	botao.y = 485;
	
	botao.on("click", function(evt){
		createjs.Tween.get(containerTutorialPanorama, {override : true}).to({ scaleX : 0, scaleY : 0} , 500);
		panoramaIsActive = true;
	});
	
	return botao;
	//titulo.y = 15;
	
}

var fadeOutScreen;
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
	
	secao1.addChild(criaCorda());
	secao1.addChild(criaBruxinha());
	//secao1.addChild(criaRelogio());
	secao1.addChild(criaBela());
	secao1.addChild(criaPeao());
	
		
	raia = new createjs.Bitmap("assets/sprites/raia.png");
	raia.x = 2250;
	raia.y = -60;
	raia.on("click", function(event){
		console.log("raia");
		if(!containerBalengo)
		getBalengo();
			fadeOutScreen = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0, 0, 800, 600));
			fadeOutScreen.alpha = 0;
			stage.addChild(fadeOutScreen);
			createjs.Tween.get(fadeOutScreen, {override : true}).to({ alpha : 1} , 500).call(adicionaBalengo).to({alpha : 0}, 500);
			createjs.Tween.get(containerBalengo, {override : true}).wait(1000).to({ scaleX : 1, scaleY : 1} , 2500).call(criaTutorial);
			panoramaIsActive = false;
		});
	raia.width = raia.image.width;
	raia.height = raia.image.height;
	raia.on("mouseover", clickableMark);
	raia.on("mouseout", clickableOut);
	secao1.addChild(raia);
	meninaOlha = criaOlha()
	secao1.addChild(meninaOlha);	
}
function criaOlha(){
	var data = {
		framerate: 60,
		images: [preloadPanorama.getResult("olha")],
		frames: {
			width:250, height:400
		},
		animations: {
			idle:[0],
			run:[1, 34, "idle"]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 2140;
	animation.y = 320; //secao1.height/2;
	animation.scaleX = animation.scaleY = 0.6;
	animation.som = "risada menina";
	animation.width = animation.spriteSheet.getFrameBounds(0).width*animation.scaleX - 50;
	animation.height = animation.spriteSheet.getFrameBounds(0).height*animation.scaleY;
 
	animation.id = "Olha!";
	animation.texto= "Tem uma raia presa ali em cima!";
		
	animation.on("click", anima);
	animation.on("mousedown", function(evt){
		maoClique.x = stage.canvas.width/2;
		maoClique.y = 50;
		maoClique.alpha = 100;
	});
	animation.on("mouseover", clickableMark);
	animation.on("mouseout", clickableOut);
	
	return animation;
}
function adicionaBalengo(){
	stage.addChild(containerBalengo);
	stage.addChild(fadeOutScreen);
}

function criaSecao2(){
	var bitmap2 = new createjs.Bitmap(preloadPanorama.getResult("secao2"));
	//bitmap2.sca
	bitmap2.x = -1010;
	bitmap2.y = 60;
	secao2.width = bitmap2.image.width - 1000;
	secao2.height = bitmap2.image.height;
	secao2.x = secao1.width;
	secao2.addChild(bitmap2);

	var raiaLagoa = new createjs.Bitmap(preloadPanorama.getResult("raiaLagoa"));
	raiaLagoa.scaleX = raiaLagoa.scaleY = 0.1;
	raiaLagoa.width = raiaLagoa.image.width*raiaLagoa.scaleX;
	raiaLagoa.id = "raia lagoa";
	raiaLagoa.x = 500;
	raiaLagoa.y = 200; 
	raiaLagoa.on("click", function(evt){
		createjs.Tween.get(baiao).to({volume : 0}, 900);
		botaoSom.gotoAndPlay("off");
		fadeOutScreen = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0, 0, 800, 600));
		fadeOutScreen.alpha = 0;
		stage.addChild(fadeOutScreen);
		createjs.Tween.get(fadeOutScreen, {override : true}).to({ alpha : 1} , 500).call(carregaAssetsLixo).to({alpha : 0}, 500);
		createjs.Tween.get(containerJogoLixo, {override : true}).wait(1000).to({ scaleX : 1, scaleY : 1} , 2500);
		panoramaIsActive = false;
	});
	raiaLagoa.on("mouseover", clickableMark);
	raiaLagoa.on("mouseout", clickableOut);
	buleiro.scaleX = buleiro.scaleY = 0.1;
	secao2.addChild(raiaLagoa);
}

function criaHUD(){	
	right = criaSeta();//new createjs.Bitmap(preloadPanorama.getResult("setad"));
	right.scaleX = -1;
	right.x = stage.canvas.width - 10;
	right.y = stage.canvas.height /2 - 35;
	right.addEventListener("mouseover", overR);
	right.addEventListener("mouseout", function (evt){ moveRight = false});
	right.addEventListener("click", clickR);
	
	left = criaSeta();//new createjs.Bitmap(preloadPanorama.getResult("setad"));
	left.x = 10;
	left.y = stage.canvas.height /2 - 35;
	left.addEventListener("mouseover", overL);
	left.addEventListener("mouseout", function (evt){ moveLeft = false});
	left.addEventListener("click", clickL);
	left.alpha = 0;
	
	up = criaSeta();//new createjs.Bitmap(preloadPanorama.getResult("setad"));
	up.regX = up.width/2;
	up.regY = up.height/2;
	up.rotation = 90;
	up.x = stage.canvas.width/2;
	up.y = up.height/2 + 10;
	up.addEventListener("mouseover", function (evt){
		if(evt.target.alpha==100){
			maoClique.x = evt.target.x;
			maoClique.y = evt.target.y;
			maoClique.alpha = 100;
		}
	});
	up.addEventListener("mouseout", function (evt){maoClique.alpha = 0;});
	up.addEventListener("click", clickU);
	up.alpha = 0;
	
	down = criaSeta();//new createjs.Bitmap(preloadPanorama.getResult("setad"));
	down.regX = down.width/2;
	down.regY = down.height/2;
	down.rotation = -90;
	down.x = stage.canvas.width/2;
	down.y = 590 - down.height/2;
	down.addEventListener("mouseover", function (evt){
		if(evt.target.alpha==100){
			maoClique.x = evt.target.x;
			maoClique.y = evt.target.y;
			maoClique.alpha = 100;
		}
	});
	down.addEventListener("mouseout", function (evt){ maoClique.alpha = 0;});
	down.addEventListener("click", clickD);
	down.alpha = 0;
	
	stage.addChild(left);
	stage.addChild(right);
	stage.addChild(up);
	stage.addChild(down);
	
	maoClique = criaMao();
	maoClique.alpha = 0;
	stage.addChild(maoClique);
	botaoSom = criaBotaoSom();
	stage.addChild(botaoSom);
}

function criaBotaoSom(){
	var data = {
		framerate: 60,
		images: [preloadPanorama.getResult("som")],
		frames: {
			width:360.5, height:325
		},
		animations: {
			on:[0],
			off:[1],
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "on");
	animation.alpha = 0.5;
	animation.scaleX = animation.scaleY = 0.1;
	animation.on("mouseover", function(evt){
		evt.target.alpha = 1;
	});
	animation.on("mouseout", function(evt){
		evt.target.alpha = 0.5;
	});

	animation.on("click", function(evt){
		switchMusica();
	});

	animation.x = 10;
	animation.y = 10;

	return animation;
}

function switchMusica(){
	if(baiao.volume == 0.2){
		baiao.volume = 0;
		botaoSom.gotoAndPlay("off");
		}
	else{
		baiao.volume = 0.2;
		botaoSom.gotoAndPlay("on");
		}
}

function criaMao(){
	var data = {
		framerate: 24,
		images: [preloadPanorama.getResult("maoClique")],
		frames: {
			width:422, height:276
		},
		animations: {
			idle:[0, 21]
        },
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.regX = 360;
	animation.regY = 260;
	animation.scaleX = animation.scaleY = 0.2;
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
	return animation;
}

//Aponta para a esquerda
function criaSeta(){
	var data = {
		framerate: 30,
		images: [preloadPanorama.getResult("seta")],
		frames: {
			width:70, height:70
		},
		animations: {
			idle:[0],
			over:[1],
			down:[2],
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
	
	animation.on("mouseover", function(evt){evt.target.gotoAndPlay("over");});
	animation.on("mouseout", function(evt){evt.target.gotoAndPlay("idle");});
	animation.on("mousedown", function(evt){evt.target.gotoAndPlay("down");});
	animation.on("pressup", function(evt){evt.target.gotoAndPlay("idle");});
	return animation;
}

function overR(event){
	 if(dragContainer.y == 0)
		moveRight = true;
}

function clickR(event){
	if(panoramaIsActive && dragContainer.y == 0){
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
	if( panoramaIsActive && dragContainer.y == 0){
		var positionX = dragContainer.x + stage.canvas.width;
		moveLeft = false;
		
		if(positionX <= 0)
			createjs.Tween.get(dragContainer, {override : true}).to({x:positionX,visible:true},2000, createjs.Ease.getElasticOut(1, 2));
		else
			createjs.Tween.get(dragContainer, {override : true}).to({ x : 0} , 2500, createjs.Ease.getElasticOut(1, 2));
	}
}

function clickU(){
	if(panoramaIsActive && dragContainer.x<-1800 && dragContainer.x > -secao1.width){
		createjs.Tween.get(dragContainer,  {override : true}).to({ y : 373} , 2500, createjs.Ease.getElasticOut(1, 2));
		maoClique.alpha = 0;
		createjs.Tween.get(balao).to({scaleX:0, scaleY:0, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
	    balao.balaoAtivo = "";
	    bigObjectFlag = false;
		}
}

function clickD(){
	createjs.Tween.get(dragContainer,  {override : true}).to({ y : 0} , 2500, createjs.Ease.getElasticOut(1, 2));
	maoClique.alpha = 0;
}

function anima(evt){
	evt.target.gotoAndPlay("run");
	createjs.Sound.play(evt.target.som);
			
	if(balao.balaoAtivo != evt.target.id){
		criaBalao(evt.target, evt.target.balaoW, evt.target.balaoH);
		criaImagens(evt.target.id, evt.target.numFotos);
		addFotosRegras(evt.target.id);
	}
}

function criaPeao(){
	var  clicado = false;
	var data = {
		framerate: 30,
		images: [preloadPanorama.getResult("peao")],
		frames: {
			width:715, height:343
		},
		animations: {
			idle:[0],
			run: [0, 69, "loop"],
			loop: [10, 69, true],
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 1580;
	animation.y = 120; //secao1.height/2;
	animation.scaleX = animation.scaleY = 0.2;
	animation.som = "";
	var bounds = animation.spriteSheet.getFrameBounds(0);
	animation.width = bounds.width*animation.scaleX;
	animation.height = bounds.height*animation.scaleY;
	
	var rectHit = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, bounds.width, bounds.height));
	animation.hitArea = rectHit;
	animation.id = "Peão";
	animation.texto= "Sabia que tem gente que consegue soltar o peão e fazer com que ele gire na palma da mão? Tenta aí com a sua turma!\n\nClica no botão laranja pra ver uma galera fazendo beyblade!";
		
	animation.on("click", anima);
	animation.on("mouseover", clickableMark);
	animation.on("mouseout", clickableOut);
	
	return animation;
}

function criaBruxinha(){
	var data = {
		framerate: 60,
		images: [preloadPanorama.getResult("bruxinha"), preloadPanorama.getResult("bruxinhaRun")],
		frames: {
			width:236, height:550
		},
		animations: {
			idle: [0, 67, true],
			run: [72, 131, "idle"],
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 1450;
	animation.y = 340; //secao1.height/2;
	animation.scaleX = animation.scaleY = 0.35;
	animation.som = "risada menina";
	animation.width = animation.spriteSheet.getFrameBounds(0).width*animation.scaleX + 20;
	animation.height = animation.spriteSheet.getFrameBounds(0).height*animation.scaleY;
 
	animation.id = "bruxinha";
	animation.texto= "A bruxinha é uma bonequinha feita de pano. Tão bonita em seus bordados e retalhos! Tu conhece alguém que faz? Já brincou com uma?";
	animation.numFotos = 3;
		
	animation.on("click", anima);
	animation.on("mouseover", clickableMark);
	animation.on("mouseout", clickableOut);
	
	return animation;
}

function criaCorda(){
	var  clicado = false;
	var data = {
		framerate: 30,
		images: [preloadPanorama.getResult("corda")],
		frames: {
			width:438, height:400
		},
		animations: {
			idle:[0, 29, true]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 100;
	animation.y = 270; //secao1.height/2;
	animation.scaleX = animation.scaleY = 0.7;
	animation.regY = 120;
	animation.som = "";
	var bounds = animation.spriteSheet.getFrameBounds(0);
	animation.width = bounds.width*animation.scaleX;
	animation.height = bounds.height*animation.scaleY - 120;
	
	var rectHit = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, bounds.width, bounds.height));
	animation.hitArea = rectHit;
	animation.id = "Corda";
	animation.texto= "Essa brincadeira é muito divertida e te faz suar muito! Tu pode pular sozinho ou com um amigo, devagarinho ou bem rapidão! Só tome cuidado para não se atrapalhar e enganchar as pernas na corda, viu?";
	animation.numFotos = 3;
		
	animation.on("click", anima);
	animation.on("mouseover", clickableMark);
	animation.on("mouseout", clickableOut);
	
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
	animation.numFotos = 2;
		
	animation.on("click", anima);
	animation.on("mouseover", clickableMark);
	animation.on("mouseout", clickableOut);
	
	return animation;
}

function criaBike(){
	var data = {
		framerate: 10,
		images: [preloadPanorama.getResult("meninaBike")],
		frames: {
			width:237, height:237
		},
		animations: {
			idle:[0, 34, true]
		}
	};
	
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = secao1.width;
	animation.y = 360; //secao1.height/2;
	//animation.scaleX = animation.scaleY = 0.5;
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
	var x = new createjs.Bitmap
	var data = {
		framerate: 10,
		images: [preloadPanorama.getResult("bila")],
		frames: {
			width:524, height:400
		},
		animations: {
			idle: 0,
			run: [0, 75, "idle"]
		}
	};
	
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.scaleX = animation.scaleY = 0.4;
	animation.x = 820;
	animation.y = 250;	
	animation.regY = 120;
	animation.som = "magia";
	animation.id = "bila";
	animation.texto= "A bila é uma brincadeira muito massa! Elas são apostadas num triângulo e quem biçar leva pra casa!";
	var bounds = animation.spriteSheet.getFrameBounds(0);
	animation.width = bounds.width*animation.scaleX + 20;
	animation.height = bounds.height*animation.scaleY;
	animation.balaoW = 400;
	animation.balaoH = 250;
	animation.numFotos = 3;
	
	var rectHit = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, bounds.width, bounds.height));
	animation.hitArea = rectHit;
	
	animation.on("click", anima);
	animation.on("mouseover", clickableMark);
	animation.on("mouseout", clickableOut);
	
	return animation;
}

function criaBalao(animationAlvo){
	balao.removeAllChildren();
	if(animationAlvo.id == "Olha!"){
		var balaoShape = new createjs.Bitmap(preloadPanorama.getResult("balaoFala"));
		balao.addChild(balaoShape);
		balaoShape.scaleX = balaoShape.scaleY = 0.25;
		var titulo = new createjs.Text(animationAlvo.id, "50px Bahiana", "#ffffff");
		var b = titulo.getBounds();
		titulo.x = 140 - b.width/2;
		titulo.y = 10;
		console.log( b.height);
		
		var texto = new createjs.Text(animationAlvo.texto, "20px FiraSans", "#000000");
		texto.x = 40;
		texto.y = 60;
		texto.lineWidth = 200;
		texto.lineHeight = 25;
		//balao.addChild(shapeBalao);
		balao.addChild(titulo);
		balao.addChild(texto);
		
		balao.balaoAtivo = animationAlvo.id;
		balao.regY = 163;
		balao.regX = 0;
		balao.x = animationAlvo.x + animationAlvo.width;
		balao.y = animationAlvo.y;	
		createjs.Tween.get(dragContainer).to({ x : -animationAlvo.x + 80 + (240 - animationAlvo.width)/2} , 1000);
	}
	else{
		var balaoShape = new createjs.Bitmap(preloadPanorama.getResult("balao"));
		balao.addChild(balaoShape);
		balaoShape.shadow = new createjs.Shadow("#000000", 10, 10, 40);
		balaoShape.shadow.alpha = 0;
		var titulo = new createjs.Text(animationAlvo.id, "50px Bahiana", "#ffffff");
		var b = titulo.getBounds();
		titulo.x = 200 - b.width/2;
		titulo.y = 35;
		console.log( b.height);
		
		var texto = new createjs.Text(animationAlvo.texto, "20px FiraSans", "#000000");
		texto.x = 30;
		texto.y = 90;
		texto.lineWidth = 355;
		texto.lineHeight = 25;
		//balao.addChild(shapeBalao);
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
		
		else if(animationAlvo.width>=250){
			createjs.Tween.get(dragContainer).to({ x : -animationAlvo.x} , 1000);
			bigObjectFlag = true;
		}
		else{
			createjs.Tween.get(dragContainer).to({ x : -animationAlvo.x + 80 + (240 - animationAlvo.width)/2} , 1000);
		}
	}
		
	dragContainer.addChild(balao);
	balao.scaleX = 0;
	balao.scaleY = 0;
	createjs.Tween.get(balao).wait(animationAlvo.spriteSheet.count).to({scaleX:1, scaleY:1, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
}

function addFotosRegras(id){
	if(id == "bruxinha" || id == "Olha!" || id == "bila"){
		balao.addChild(imageContainer);
		var b = imageContainer.getBounds();
		imageContainer.x = 200;
		imageContainer.y = 300 - b.height/2 - 15;
	}
	else{
		var mais = new createjs.Bitmap(preloadPanorama.getResult("mais"));
		//mais.scaleX = mais.scaleY = 0.25;
		mais.x = 375 - mais.image.width;
		mais.y = 285 - mais.image.height;
		mais.id = id;
		mais.width = mais.image.width;
		mais.height = mais.image.height;
		mais.on("click",createPopup);
		mais.on("mouseover", clickableMark);
		mais.on("mouseout", clickableOut);
		balao.addChild(mais);
		balao.addChild(imageContainer);
		var b = imageContainer.getBounds();
		imageContainer.x = 30 + b.width/2;
		imageContainer.y = 300 - b.height/2 - 15;
	}
}

function createPopup(evt){
	switchMusica();
	if(!windowVar ){
		windowVar = window.open("", evt.target.id, "height=255, width=335", true);
		windowVar.document.clear();
		windowVar.document.write('<title>' + evt.target.id + '</title>');
		windowVar.document.write('<video  width="320" height="240" controls>  <source src="'+evt.target.id+'.mp4" type="video/mp4"> </video>');
	}
	else if( windowVar.name != evt.target.id){
		windowVar.close();
		windowVar = window.open("", evt.target.id, "height=255, width=335", true);
		windowVar.document.write('<title>' + evt.target.id + '</title>');
		windowVar.document.write('<video  width="320" height="240" controls>  <source src="'+evt.target.id+'.mp4" type="video/mp4" width = "320" height = "240"> </video>');
		}
	else{
		windowVar.focus();
	}
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

function tickPanorama(event) {	
	gerenciaAlphaHUD();
	if (panoramaIsActive && moveRight) {
       dragContainer.x -= 10;
	   createjs.Tween.get(balao).to({scaleX:0, scaleY:0, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
	   balao.balaoAtivo = "";
	   bigObjectFlag = false;
	   maoClique.alpha = 0;
	   }
	   
	else if (panoramaIsActive && moveLeft) {
       dragContainer.x += 10;
	   createjs.Tween.get(balao).to({scaleX:0, scaleY:0, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
	   balao.balaoAtivo = "";
	   bigObjectFlag = false;
	   maoClique.alpha = 0;
	   }

	else if (panoramaIsActive && moveUp) {
       dragContainer.x += 10;
	   createjs.Tween.get(balao).to({scaleX:0, scaleY:0, visible:true},500, createjs.Ease.getElasticInOut(6, 2));
	   balao.balaoAtivo = "";
	   bigObjectFlag = false;
	   maoClique.alpha = 0;
	   }
}

function gerenciaAlphaHUD(){
	if(dragContainer.x <= dragContainer.maxPositionX ||  dragContainer.y != 0){
		moveRight = false;
		right.alpha = 0;
		}
	else	
		right.alpha = 100;
	
	if(dragContainer.x>=0 || bigObjectFlag || dragContainer.y != 0){
		moveLeft=false;
		left.alpha=0;
		}
	else
		left.alpha = 100;
		
	if(dragContainer.x<-1800 && dragContainer.x > -secao1.width +800 && dragContainer.y == 0){
		up.alpha = 100;
	}
	else{
		up.alpha = 0;
		}
		
	if(dragContainer.y == 373){
		down.alpha = 100;
	}
	else
		down.alpha = 0;
	/*	
	if(!dragContainer.y == 0 && maoClique.y<=400)
		maoClique.alpha = 0;

	if(dragContainer.y < 0 && maoClique.y>=400)
		maoClique.alpha = 0;*/
}
