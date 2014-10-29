var stage;
var bitmapStart = spriteBotao("iniciar.png");
var bitmapCredit = spriteBotao("creditos.png");
var seta = spriteBotao("setas.png")

function menu(){
	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

	stage.enableMouseOver(20);  

	//criação do Botão start.
	//bitmapStart = new createjs.Bitmap("startBtn.png");

	var startBtnHit = new createjs.Shape();
	startBtnHit.graphics.beginFill("#000000").drawRect(0, 0, 150, 58);
	bitmapStart.hitArea = startBtnHit;

	bitmapStart.x = 325;
	bitmapStart.y = 150;
	stage.addChild(bitmapStart);

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
	stage.addChild(bitmapCredit);

	bitmapCredit.on("click", btnClicked);
	bitmapCredit.addEventListener("mouseover", over);
	bitmapCredit.addEventListener("mouseout", out);
	bitmapCredit.addEventListener("mousedown", down);


	createjs.Ticker.on("tick", tick);
}

function btnClicked(event){
	event.target.gotoAndPlay("click");
	event.on("mouseup", up);
	if(event.target == bitmapStart){
		//stage.removeAllEventListeners();
		panorama();
	}
	if(event.target == bitmapCredit){
		creditos();
	}
	if(event.target == seta){
		stage.removeAllChildren();
		menu();
	}

}

//Sprite de botão - usada em ambos
function spriteBotao(caminho){
	//Configuração do spriteSheet do botao
	var data = {
		framerate: 10, //Velocidade de troca de frame - irrelevante
		images: [caminho], //spriteSheet
		frames: {
			width:150, height:58 // tamanho dos frames
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