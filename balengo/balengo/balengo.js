var stage;

//Variáveis de controle do lançamento
var angle;
var lancou;
var forca = 90;

//Variáveis do Lançamento Oblíquo
var velocidadeInicialX ;
var velocidadeInicialY;
var gravidade = -10;
var t = 0;

//Sprites
var balengotengo = new createjs.Bitmap("balengotengo.png");
var alvo = new createjs.Bitmap("alvo.png");
var menino = criaMenino();

function criaMenino()
{
	var data = 
	{
		framerate: 10,
		images: ["menino.jpg"],
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

function init()
{
	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	
	menino.y = 550;
	menino.x = 50;
	
	balengotengo.x = -100; 
	balengotengo.y = -100;
	
	balengotengo.regX = 8;  //Pontos de rotação
	balengotengo.regY = 10; 
	
	menino.regX = menino.regY = 50;
	
	alvo.x = 300;
	alvo.y = 100;

	stage.addChild(alvo);
	stage.addChild(menino);
	stage.addChild(balengotengo);
	
	stage.on("stagemousedown", lancar);
	createjs.Ticker.addEventListener("tick", tick);
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

function tick(event) {
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
	if(balengotengo.x < 0 || balengotengo.x > 800 || balengotengo.y>600 || balengotengo.y<0)
	{
		menino.gotoAndPlay("idle");
		lancou = false;
	}
	
	//Checagem de colisão
	alvo.alpha = 0.2;
	var ponto = balengotengo.localToLocal(0,0,alvo); //Posição do projétil relativo ao alvo
	
	//Checagem se este ponto está por cima de algum pixel do alvo
	if (alvo.hitTest(ponto.x, ponto.y)) 
	{
		alvo.alpha = 1; 
	}
		
	stage.update();
}
