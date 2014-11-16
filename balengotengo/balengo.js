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

var maoDoMenino = new createjs.Point(0,0);
var moveMeninoRight = false;
var moveMeninoLeft = false;


function carregaAssetsBalengo(){
	preloadBalengo.on("complete", handleCompleteBalengo);

	var manifest = [
		{src:"balengotengo.png", id:"balengotengo"},
		{src:"raia.png", id:"alvo"},
		{src:"menino2.png", id:"menino-balengo"},
		{src:"arvore550.png", id:"arvore"},
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
		framerate: 60,
		images: [preloadBalengo.getResult("menino-balengo")],
		frames: 
		{
			width:55, height:70
		},
		animations:
		{
			idle: [0],
			mira:[0,26,false],
			joga:[26,46, "volta", 2],
			volta: {
             frames: [46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26],
             next: false,
			}
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "mira");
	return animation;
}

function getBalengo()
{
	containerBalengo = new createjs.Container();
	menino = criaMenino();
	balengotengo = new createjs.Bitmap(preloadBalengo.getResult("balengotengo"));
	
	alvo = new createjs.Bitmap(preloadBalengo.getResult("alvo"));
	alvo.scaleX = alvo.scaleY = 0.75
	menino.y = 500;
	menino.x = 100;
	maoDoMenino.x =  menino.x+5; 
    maoDoMenino.y = menino.y +20;
	balengotengo.x =  maoDoMenino.x; 
	balengotengo.y = maoDoMenino.y;
	balengotengo.scaleX = balengotengo.scaleY = 0.5
	balengotengo.regX = 8;  //Pontos de rotação
	balengotengo.regY = 10; 
	
	alvo.x = 300;
	alvo.y = 300;

	containerBalengo.addChild(new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height)));
	var arvore = new createjs.Bitmap(preloadBalengo.getResult("arvore"));
	arvore.x = 400;
	//arvore.scaleX = arvore.scaleY = 0.175;
	containerBalengo.addChild(arvore);
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
	
	if(forca<=75 && distX>=0)
	{
		var lineX = maoDoMenino.x;
		var lineY = maoDoMenino.y;
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
		if(distX<=0)
		distX = 0;
	}
}

function joga()
{
	line.graphics.clear();
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
		balengotengo.y = maoDoMenino.y - velocidadeInicialY*t - (gravidade*t*t)/2;
		balengotengo.x = maoDoMenino.x + velocidadeInicialX*t;
		
		balengotengo.rotation+=20; //Apenas para o projétil girar
		t+=0.5;
	}
	else{
		if (moveMeninoRight && menino.x < 600 - menino.spriteSheet.getFrameBounds(0).width) {
       menino.x += 10;
	   balengotengo.x +=  10; 
	   }
	 
	 if (moveMeninoLeft && menino.x>= 0) {
		console.log("teste");
		menino.x -= 10;
	    balengotengo.x -=  10; 
	   }
	}
	
	//Caso o projétil saia da tela, se encerra o lançamento atual
	if(balengotengo.x < 0 || balengotengo.x > stage.canvas.width
	|| balengotengo.y>stage.canvas.height || balengotengo.y<0)
	{
		if(menino.currentFrame == 26){
		poeBalengoNaMao();
		lancou = false;
		}
		
	}  
	 maoDoMenino.x =  menino.x+5; 
	 maoDoMenino.y = menino.y +25;
	
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

function poeBalengoNaMao(){
	balengotengo.x =  maoDoMenino.x; 
	balengotengo.y = maoDoMenino.y;
}
