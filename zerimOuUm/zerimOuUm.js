var containerZerim = new createjs.Container();
var preloadZerim = new createjs.LoadQueue(false);

var jogador;
var jogador1;
var jogador2;
var jogador3;

var botao0;
var botao1;


function carregaAssetsZerim(){
	preloadZerim.on("complete", handleCompleteZerim);

	var manifest = [
		{src:"spriteZerim.png", id:"sprite"},
		{src:"iei.png", id:"iei"},
		];
	preloadZerim.loadManifest(manifest, true, "zerimOuUm/");
	}
	
function stop() {
	if (preloadZerim != null) { preloadZerim.close(); }
	}
	
function handleCompleteZerim(event) {
	//zerim();
}

function getZerim(stage){	
	botao0 = criaMaoZerim();
	botao1 = criaMaoZerim();
	
	jogador   = criaMaoZerim();
	jogador1 = criaMaoZerim();
	jogador2 = criaMaoZerim();
	jogador3 = criaMaoZerim();
	
	
	containerZerim = new createjs.Container();
	
	//Fundo
	containerZerim.addChild(new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, 800, 600)));

	
	botao0.gotoAndPlay("zero");
	botao0.x = 200;
	botao0.y = 500;
	
	botao1.gotoAndPlay("um");
	botao1.x = 500;
	botao1.y = 500;
	
	jogador.x = 350;
	jogador.y = 400;
	
	jogador1.x = 100;
	jogador1.y = 200;
	
	jogador2.x = 600;
	jogador2.y = 200;
	
	jogador3.x = 350;
	jogador3.y = 50;
	
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
	
	var iei = new createjs.Bitmap(preloadZerim.getResult("iei"));
	iei.scaleX = iei.scaleY = 0;
	iei.regX = iei.image.width/2;
	iei.regY = iei.image.height/2;
	
	iei.x = 400;
	iei.y = 300;
	containerZerim.addChild(iei);
	createjs.Tween.get(iei,  {override : true}).to({ scaleX : 0.75, scaleY : 0.75} , 500).to({ scaleX : 0.5, scaleY : 0.5} , 1000).call(terminou);
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
	
	balaoTuto.addChild(criaBotaoTutoBalengo());
	containerTutorialZerim.addChild(balaoTuto);
	containerZerim.addChild(containerTutorialZerim);
	containerTutorialZerim.regX = 400;
	containerTutorialZerim.regY = 300;
	containerTutorialZerim.x = 400;
	containerTutorialZerim.y = 300;
}

function criaBotaoTutoBalengo(){
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
	
	return mao;
}