var containerBalengo = new createjs.Container();
var winBalengo = false;
//Variáveis de controle do lançamento
var angle;
var lancou;
var forca = 80;

//Variáveis do Lançamento Oblíquo
var velocidadeInicialX ;
var velocidadeInicialY;
var gravidade = -10;
var t = 0;

//Sprites
var balengotengo = new createjs.Bitmap("balengotengo/balengotengo.png");
var alvo = new createjs.Bitmap("balengotengo/alvo.png");
var menino = criaMenino();

function criaMenino()
{
	var data = 
	{
		framerate: 10,
		images: ["balengotengo/menino.jpg"],
		frames: 
		{
			width:104, height:100
		},
		animations:
		{
			idle:0,
			joga:1
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	return animation;
}

function getBalengo()
{
	//var canvas = document.getElementById("game");
	//containerBalengo = new createjs.Stage(canvas);
	containerBalengo = new createjs.Container();
	menino.y = 550;
	menino.x = 50;
	
	balengotengo.x = -100; 
	balengotengo.y = -100;
	
	balengotengo.regX = 8;  //Pontos de rotação
	balengotengo.regY = 10; 
	
	menino.regX = menino.regY = 50;
	
	alvo.x = 300;
	alvo.y = 100;

	containerBalengo.addChild(new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height)));
	containerBalengo.addChild(alvo);
	containerBalengo.addChild(menino);
	containerBalengo.addChild(balengotengo);
	
	containerBalengo.on("click", lancar);
	containerBalengo.on("tick", tickBalengo);
	
	return containerBalengo;
	//createjs.Ticker.addEventListener("tick", tickBalengo);
}

function lancar()
{
	if(!lancou)
	{
		//Cálculo da força inicial, distribuída de acordo com o angulo
		velocidadeInicialX = forca * Math.cos(angle * Math.PI/180);
		velocidadeInicialY =  forca *  Math.sin(-angle * Math.PI/180);
		t=0;
		menino.gotoAndPlay("joga");
		lancou = true;
	}
}

function tickBalengo(event) {
	//Faz o menino "olhar" para o mouse
	angle = Math.atan2(stage.mouseY -menino.y, stage.mouseX -menino.x ); 
	angle = angle * (180/Math.PI);
	
	if(angle>-90 && angle<=0) //Limitação dos angulos que o menino olha
	{ 
		menino.rotation = angle;
	}
	
	if(lancou) //Processo de lançamento
	{ 
		//Fórmulas do lançamento oblíquo
		balengotengo.y = menino.y - velocidadeInicialY*t - (gravidade*t*t)/2;
		balengotengo.x = menino.x + velocidadeInicialX*t;
		
		balengotengo.rotation+=20; //Apenas para o projétil girar
		t+=0.5;
	}
	
	//Caso o projétil saia da tela, se encerra o lançamento atual
	if(balengotengo.x < 0 || balengotengo.x > stage.canvas.width
	|| balengotengo.y>stage.canvas.height || balengotengo.y<0)
	{
		menino.gotoAndPlay("idle");
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
		containerBalengo.removeAllChildren();
		containerBalengo.removeAllEventListeners();
		stage.removeChild(containerBalengo);
	}
}
