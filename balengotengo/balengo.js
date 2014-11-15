var containerBalengo = new createjs.Container();
var line = new createjs.Shape();
var preloadBalengo = new createjs.LoadQueue(false);
var winBalengo = false;

//Variáveis de controle do lançamento
var angle;
var lancou = false;
var forca = 0;
var distX;
var distY;

//Variáveis do Lançamento Oblíquo
var pontoI = new createjs.Point(0,0);
var pontoF = new createjs.Point(0,0);
var velocidadeInicialX ;
var velocidadeInicialY;
var gravidade = -10;
var t = 0;

//Sprites
var balengotengo;
var alvo;
var menino;


function carregaAssetsBalengo(){
	preloadBalengo.on("complete", handleCompleteBalengo);

	var manifest = [
		{src:"balengotengo.png", id:"balengotengo"},
		{src:"alvo.png", id:"alvo"},
		{src:"menino.png", id:"menino-balengo"},
		];
		
	preloadBalengo.loadManifest(manifest, true, "balengotengo/");
	}
	
function stop() {
	if (preloadBalengo != null) { preloadMenu.close(); }
	}
	
function handleCompleteBalengo(event) {
	carregaAssetsZerim();
	getBalengo();
}


function criaMenino()
{
	var data = 
	{
		framerate: 30,
		images: [preloadBalengo.getResult("menino-balengo")],
		frames: 
		{
			width:200, height:200
		},
		animations:
		{
			idle: [13],
			mira:[0,13,false],
			joga:[13,24, "mira"]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	return animation;
}

function getBalengo()
{
	containerBalengo = new createjs.Container();
	menino = criaMenino();
	balengotengo = new createjs.Bitmap(preloadBalengo.getResult("balengotengo"));
	alvo = new createjs.Bitmap(preloadBalengo.getResult("alvo"));
	menino.y = 500;
	menino.x = 100;
	menino.regX = menino.regY = 100;
	
	balengotengo.x =  menino.x - 60; 
	balengotengo.y = menino.y - 40;
	
	balengotengo.regX = 8;  //Pontos de rotação
	balengotengo.regY = 10; 
	
	
	
	alvo.x = 300;
	alvo.y = 100;

	containerBalengo.addChild(new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height)));
	
	containerBalengo.addChild(line);
	
	containerBalengo.addChild(alvo);
	containerBalengo.addChild(menino);
	containerBalengo.addChild(balengotengo);
	
	containerBalengo.on("mousedown", mDown);
	containerBalengo.on("pressmove", mMove);
	containerBalengo.on("pressup", joga);
	containerBalengo.on("tick", tickBalengo);
	//createjs.Ticker.addEventListener("tick", tickBalengo);
}

function mDown(){
	pontoI.x = stage.mouseX;
	pontoI.y = stage.mouseY;
}

function mMove(){
	pontoF.x = stage.mouseX;
	pontoF.y = stage.mouseY;
	
	distX = pontoI.x - pontoF.x;
	distY = pontoI.y - pontoF.y;
	
	forca = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
	
	if(forca<=75)
	{
		var lineX = menino.x - 60;
		var lineY = menino.y - 40;
		line.graphics.clear();
		
		line.graphics.setStrokeStyle(3);
		line.graphics.beginStroke("#ff3333");
		line.graphics.moveTo(lineX,  lineY);
		line.graphics.lineTo(lineX - distX,   lineY - distY);
		line.graphics.beginFill('#ff3333').drawCircle(lineX - distX, lineY - distY, 5);
	}
	
	else
	{
		forca = 75;
	}
}

function joga()
{
	angle = Math.atan2(pontoI.y - pontoF.y, pontoI.x - pontoF.x ); 
	angle = angle * (180/Math.PI);
	console.log(angle);
	if(!lancou)
	{
		//Cálculo da força inicial, distribuída de acordo com o angulo
		velocidadeInicialX = forca * Math.cos(angle * Math.PI/180);
		velocidadeInicialY =  forca *  Math.sin(-angle * Math.PI/180);
		t=0;
		menino.gotoAndPlay("joga");
		lancou = true;
		forca = 0;
	}
}

function tickBalengo(event) {
	if(lancou) //Processo de lançamento
	{ 
		//Fórmulas do lançamento oblíquo
		balengotengo.y = menino.y - 50 - velocidadeInicialY*t - (gravidade*t*t)/2;
		balengotengo.x = menino.x - 50 + velocidadeInicialX*t;
		
		balengotengo.rotation+=20; //Apenas para o projétil girar
		t+=0.5;
	}
	
	//Caso o projétil saia da tela, se encerra o lançamento atual
	if(balengotengo.x < 0 || balengotengo.x > stage.canvas.width
	|| balengotengo.y>stage.canvas.height || balengotengo.y<0)
	{
		balengotengo.x =  menino.x - 60; 
		balengotengo.y = menino.y - 40;
		//menino.gotoAndPlay("mira");
		lancou = false;
	}
	
	//Checagem de colisão
	var ponto = balengotengo.localToLocal(0,0,alvo); //Posição do projétil relativo ao alvo
	
	//Checagem se este ponto está por cima de algum pixel do alvo
	if (alvo.hitTest(ponto.x, ponto.y)) 
	{
		if(!winBalengo)
		{
			dragContainer.maxPositionX -=  secao2.width;
			winBalengo = true;
		}
		lancou = false;
		line.graphics.clear();
		containerBalengo.removeAllChildren();
		containerBalengo.removeAllEventListeners();
		containerBalengo = undefined;
		stage.addChild(getZerim());
		stage.removeChild(containerBalengo);
	}
}
