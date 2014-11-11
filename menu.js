var stage;
var containerMenu = new createjs.Container();
var containerFundo = new createjs.Container();
var bitmapStart;
var bitmapCredit;
var seta;
var preloadMenu = new createjs.LoadQueue(false);
var pipa;
//var pipa = spritePipa("assets/sprites/spritePipa.png");


function carregaAssets(){

	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

	stage.enableMouseOver(20);  
	createjs.Ticker.on("tick", tick);

	preloadMenu.on("complete", handleCompleteMenu);

	var manifest = [
		{src:"sprites/spritePipa.png", id:"pipa"},
		{src:"images/icons/iniciar.png", id:"iniciar"},
		{src:"images/icons/creditos.png", id:"creditos"},
		{src:"images/icons/setas.png", id:"setas"},
		{src:"images/nuv/nuvemPequena.png", id:"nuvem1"},
		{src:"images/nuv/nuvemMedia.png", id:"nuvem2"},
		{src:"images/nuv/nuvemGrande.png", id:"nuvem3"},
		];
	preloadMenu.loadManifest(manifest, true, "assets/");
	}
	
function stop() {
	if (preloadMenu != null) { preloadMenu.close(); }
	}
	
function handleCompleteMenu(event) {
	menu();
}

function menu(){

    var fundo = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRect(0, 0, 800, 600));
	containerFundo.addChild(fundo);
	for(var i = 0; i <= 10; i++){
			criaNuvens();
	}
	
	containerMenu.addChild(containerFundo);

	//criação do Botão start.
	//bitmapStart = new createjs.Bitmap("startBtn.png");
	bitmapStart = spriteBotao(preloadMenu.getResult('iniciar'));
	bitmapCredit = spriteBotao(preloadMenu.getResult('creditos'));
	seta = spriteBotao(preloadMenu.getResult('setas'));

	var startBtnHit = new createjs.Shape();
	startBtnHit.graphics.beginFill("#000000").drawRect(0, 0, 150, 58);
	bitmapStart.hitArea = startBtnHit;

	bitmapStart.x = 325;
	bitmapStart.y = 150;
	containerMenu.addChild(bitmapStart);

	bitmapStart.on("click", btnClicked);
	bitmapStart.addEventListener("mouseover", over);
	bitmapStart.addEventListener("mouseout", out);
	bitmapStart.addEventListener("mousedown", down);

	//botao dos creditos

	var creditBtnHit = new createjs.Shape();
	creditBtnHit.graphics.beginFill("#000000").drawRect(0, 0, 150, 58);
	bitmapCredit.hitArea = startBtnHit;

	bitmapCredit.x = 325;
	bitmapCredit.y = 220;
	containerMenu.addChild(bitmapCredit);

	pipa = spritePipa(preloadMenu.getResult('pipa'));
	pipa.x = 500;
	pipa.y = 50;
	containerMenu.addChild(pipa);

	stage.addChild(containerMenu);


	bitmapCredit.on("click", btnClicked);
	bitmapCredit.addEventListener("mouseover", over);
	bitmapCredit.addEventListener("mouseout", out);
	bitmapCredit.addEventListener("mousedown", down);
}

function criaNuvens(){
		var nNuvem = parseInt(Math.random()*3 +1);
		console.log(nNuvem);
		var img = preloadMenu.getResult("nuvem" + nNuvem);
		var nuvem = new createjs.Bitmap(img);
		nuvem.x = 100 + Math.random()*500;
		nuvem.x = -nuvem.x;
		nuvem.y = 10 + Math.random()*200;
		nuvem.scaleX = nuvem.scaleY = 0.1;
		createjs.Tween.get(nuvem, {override : true}).to({ x : 800} , 15000 + Math.random()*20000).call(criaNuvens);

		containerFundo.addChild(nuvem);
}

function btnClicked(event){
	event.target.gotoAndPlay("click");
	event.on("mouseup", up);
	if(event.target == bitmapStart){
		teste();
	}
	if(event.target == bitmapCredit){
		creditos();
	}
	if(event.target == seta){
		stage.removeAllChildren();
		menu();
	}

}

function teste(){
	createjs.Tween.get(pipa, {override : true}).to({ x : 800} , 1500 ).call(carregaAssetsPanorama);
}

//Sprite de botão - usada em ambos
function spriteBotao(caminho){
	//Configuração do spriteSheet do botao
	var data = {
		framerate: 10, //Velocidade de troca de frame - irrelevante
		images: [caminho], //spriteSheet
		frames: {
			width:150, height:58// tamanho dos frames
		},
		animations: { //Associação de nomes de animação aos frames
			normal : 0, 
			over : 1,
			click : 2
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var botao = new createjs.Sprite(spriteSheet, "normal");

	
	return botao;
}

function spritePipa(caminho){
	//Configuração do spriteSheet do botao
	var data = {
		framerate: 10, //Velocidade de troca de frame - irrelevante
		images: [caminho], //spriteSheet
		frames: {
			width:250, height:181, count: 32 // tamanho dos frames
		},
		animations: { //Associação de nomes de animação aos frames
			loop : [0, 32]
			//flyOut :[ ]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animacao = new createjs.Sprite(spriteSheet, "normal");
	
	return animacao;
}



function over(event){
	event.target.gotoAndPlay("over");
}
function out(event){
	event.target.gotoAndPlay("normal");
}
function down(event){
	event.target.gotoAndPlay("click");
	event.on("mouseup", up);
}
function up(event){
	event.target.gotoAndPlay("normal");
}

function tick(){
	stage.update();
}

 function creditos(){
 	stage.removeAllChildren();

 	var setaHit = new createjs.Shape();
 	setaHit.graphics.beginFill("#000000").drawRect(0, 0, 150, 58);
 	seta.hitArea = setaHit;

 	seta.x = 20;
 	seta.y = 20;

 	stage.addChild(seta);

 	seta.on("click", btnClicked);
	seta.addEventListener("mouseover", over);
	seta.addEventListener("mouseout", out);
	seta.addEventListener("mousedown", down);
 }
 