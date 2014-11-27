var containerZerim = new createjs.Container();
var preloadZerim = new createjs.LoadQueue(false);

var jogador;
var jogador1;
var jogador2;
var jogador3;

var botao0;
var botao1;

var animacaoZerim;


function carregaAssetsZerim(){
	preloadZerim.on("complete", handleCompleteZerim);

	var manifest = [
		{src:"spriteZerim.png", id:"sprite"},
		{src:"iei.png", id:"iei"},
		{src:"back.png", id:"back"},
		{src:"jogador.png", id:"baixo"},
		{src:"jogadorCima.png", id:"cima"},
		{src:"jogadorEsq.png", id:"esquerda"},
		{src:"jogadorDir.png", id:"direita"},
		{src:"0ou1.png", id:"0ou1"},
		];
	preloadZerim.loadManifest(manifest, true, "zerimOuUm/");

	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
	var audioPath = "zerimOuUm/";
	var manifestAudio = [
		{id:"ieei", src:"ieei.wav"},
		{id:"zerimOUm", src:"zerimOUm.wav"},
	];
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.registerManifest(manifestAudio, audioPath);
}
	
function stop() {
	if (preloadZerim != null) { preloadZerim.close(); }
	}
	
function handleCompleteZerim(event) {
	//zerim();
}

function criaJogador(id){
	//Configuração do spriteSheet do botao
	var image = new createjs.Bitmap(preloadZerim.getResult(id));
	var data = {
		framerate: 10, //Velocidade de troca de frame - irrelevante
		images: [preloadZerim.getResult(id)], //spriteSheet
		frames: {
			width:image.image.width/2, height:image.image.height// tamanho dos frames
		},
		animations: { //Associação de nomes de animação aos frames
			zero : [0], 
			um : [1],
		}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	var mao = new createjs.Sprite(spriteSheet, "zero");
	mao.regX = image.image.width/4;
	mao.regY = image.image.height/2;
	return mao;
}

function cria0ou1(){
	var data = {
		framerate: 10, //Velocidade de troca de frame - irrelevante
		images: [preloadZerim.getResult("0ou1")], //spriteSheet
		frames: {
			width:800, height:600// tamanho dos frames
		},
		animations: { //Associação de nomes de animação aos frames
			idle : [0], 
			anima : [0, 34, false],
		}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	return animation;
}

function getZerim(stage){	
	animacaoZerim = cria0ou1();
	botao0 = criaMaoZerim();
	botao1 = criaMaoZerim();
	jogador  = criaJogador("baixo");
	jogador.x = 400;
	jogador.y = 600 - jogador.regY/2;
	jogador1 = criaJogador("esquerda");
	jogador1.x = jogador.regX/2;
	jogador1.y = 300;

	jogador2 = criaJogador("cima");
	jogador2.x = 400;
	jogador2.y = jogador2.regX/2; 

	jogador3 = criaJogador("direita");
	jogador3.x = 800 - jogador3.regX/2;
	jogador3.y = 300; 
	
	containerZerim = new createjs.Container();
	
	//Fundo
	var fundo = new createjs.Bitmap(preloadZerim.getResult("back"));
	containerZerim.addChild(fundo);

	
	botao0.gotoAndPlay("zero");
	botao0.x = 200;
	botao0.y = 500;
	
	botao1.gotoAndPlay("um");
	botao1.x = 500;
	botao1.y = 500;
	
	botao0.on("click", clicou);
	botao1.on("click", clicou);
	
	containerZerim.addChild(jogador);
	containerZerim.addChild(jogador1);
	containerZerim.addChild(jogador2);
	containerZerim.addChild(jogador3);
	
	containerZerim.addChild(botao0);
	containerZerim.addChild(botao1);
	
	stage.addChild(containerZerim);
	criaTutorialZerim();
}

function clicou(evt){
	jogador.alpha = 0;
	jogador1.alpha = 0;
	jogador2.alpha = 0;
	jogador3.alpha = 0;
	containerZerim.addChild(animacaoZerim);
	createjs.Sound.play("zerimOUm");
	if (evt.target == botao0){
		jogador.gotoAndPlay("zero");
		jogador1.gotoAndPlay("um");
		jogador2.gotoAndPlay("um");
		jogador3.gotoAndPlay("um");
	}
	else{
		jogador.gotoAndPlay("um");
		jogador1.gotoAndPlay("zero");
		jogador2.gotoAndPlay("zero");
		jogador3.gotoAndPlay("zero");
	}
	animacaoZerim.gotoAndPlay("anima");
	containerZerim.on("tick", exibeZerim);
}

function exibeZerim(){
	if(animacaoZerim.currentFrame == 34){
		animacaoZerim.alpha = 0;
		animacaoZerim.gotoAndPlay("idle");
		jogador.alpha = 1;
		jogador1.alpha = 1;
		jogador2.alpha = 1;
		jogador3.alpha = 1;
		var iei = new createjs.Bitmap(preloadZerim.getResult("iei"));
		createjs.Sound.play("ieei");
		iei.scaleX = iei.scaleY = 0;
		iei.regX = iei.image.width/2;
		iei.regY = iei.image.height/2;
		
		iei.x = 400;
		iei.y = 300;
		containerZerim.addChild(iei);
		createjs.Tween.get(iei,  {override : true}).to({ scaleX : 0.75, scaleY : 0.75} , 1000).to({ scaleX : 0.5, scaleY : 0.5} , 1000).call(terminou);
	}
}

var containerTutorialZerim;
function criaTutorialZerim(){
	containerTutorialZerim = new createjs.Container();
	var fundoTuto = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRoundRect(0, 0, stage.canvas.width, stage.canvas.height, 10));
	fundoTuto.alpha = 0.5;
	containerTutorialZerim.addChild(fundoTuto);
	
	var balaoTuto = new createjs.Container();
	
	var shapeBalao = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRoundRect( 0, 0, 400, 300, 5 ));
	balaoTuto.x = 200;
	balaoTuto.y = 200;
	balaoTuto.addChild(shapeBalao);
	
	var texto = new createjs.Text("Eita, a raia caiu na Lagoa do Urubu! A galera tá morrendo de medo de ir lá por causa da Isaura! Bora tirar zerim ou um e ver quem vai?", "20px FiraSans", "#000000");
	texto.x = 15;
	texto.y = 75;
	texto.lineWidth = 370;
	texto.lineHeight = 25;
	balaoTuto.addChild(texto);
	
	balaoTuto.addChild(criaBotaoTutoZerim());
	containerTutorialZerim.addChild(balaoTuto);
	containerZerim.addChild(containerTutorialZerim);
	containerTutorialZerim.regX = 400;
	containerTutorialZerim.regY = 300;
	containerTutorialZerim.x = 400;
	containerTutorialZerim.y = 300;
}

function criaBotaoTutoZerim(){
	var botao = new createjs.Container();
	
	var shapeBotao = new createjs.Shape(new createjs.Graphics().beginFill("#ed682c").drawRoundRect( 0, 0, 180, 50, 5 ));
	botao.addChild(shapeBotao);
	
	var titulo = new createjs.Text("É o jeito...", "50px Bahiana", "#ffffff");
	var b = titulo.getBounds();
	titulo.x = 90 - b.width/2;
	titulo.y = 5;
	botao.addChild(titulo);
	
	botao.x = 110;
	botao.y = 200;
	
	botao.on("click", function(evt){
		createjs.Tween.get(containerTutorialZerim, {override : true}).to({ scaleX : 0, scaleY : 0, status : "volta"} , 500);
		endTutorialBalengo = true;
	});
	
	return botao;
}

function terminou(){
	containerZerim.parent.removeChild(containerZerim);
	panoramaIsActive = true;
}

function criaMaoZerim(){
	//Configuração do spriteSheet do botao
	var data = {
		framerate: 10, //Velocidade de troca de frame - irrelevante
		images: [preloadZerim.getResult("sprite")], //spriteSheet
		frames: {
			width:100, height:100// tamanho dos frames
		},
		animations: { //Associação de nomes de animação aos frames
			zero : 0, 
			um : 1,
			idle : 2
		}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	var mao = new createjs.Sprite(spriteSheet, "idle");
	mao.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect( 0, 0, 100, 100));
	
	return mao;
}