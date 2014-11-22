var containerBalengo = new createjs.Container();
var containerTutorial = new createjs.Container();
var line = new createjs.Shape();
var preloadBalengo = new createjs.LoadQueue(false);
var winBalengo = false;
var back;

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
		{src:"menino3.png", id:"menino-balengo"},
		{src:"arvore550.png", id:"arvore"},
		{src:"maos.png", id:"mao"},
		{src:"background.png", id:"back"}
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
			width:180, height:360
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
	alvo.scaleX = alvo.scaleY = 0.7;
	menino.scaleX = menino.scaleY = 0.5;
	menino.regY = 180
	menino.y = 420;
	menino.x = 120;
	maoDoMenino.x =  menino.x+20; 
    maoDoMenino.y = menino.y +30;
	balengotengo.x =  maoDoMenino.x; 
	balengotengo.y = maoDoMenino.y;
	balengotengo.scaleX = balengotengo.scaleY = 0.5
	balengotengo.regX = 8;  //Pontos de rotação
	balengotengo.regY = 10; 
	
	alvo.x = 340;
	alvo.y = 215;

	//containerBalengo.addChild(new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height)));
	back = new createjs.Bitmap(preloadBalengo.getResult("back"));
	back.scaleX = back.scaleY = 0.5;
	back.regX = 900;
	back.x = 450;
	//arvore.scaleX = arvore.scaleY = 0.175;
	
	containerBalengo.addChild(back);
	containerBalengo.addChild(line);
	
	containerBalengo.addChild(alvo);
	containerBalengo.addChild(menino);
	containerBalengo.addChild(balengotengo);
	
	containerBalengo.scaleX = containerBalengo.scaleY = 2;
	containerBalengo.regX = 450;
	containerBalengo.x = 450;
	back.on("mousedown", mDown);
	back.on("pressmove", mMove);
	back.on("pressup", joga);
	back.on("tick", tickBalengo);
	
	
	
	//criaTutorial();
	//createjs.Ticker.addEventListener("tick", tickBalengo);
}
var mao = criaMaoTuto();

function criaTutorial(){
	mao = criaMaoTuto();
	mao.status = "ida";
	mao.x = 400;
	mao.y = 300;
	containerTutorial = new createjs.Container();
	var fundoTuto = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRoundRect(0, 0, stage.canvas.width, stage.canvas.height, 10));
	fundoTuto.alpha = 0.5;
	containerTutorial.addChild(fundoTuto);
	
	var balaoTuto = new createjs.Container();
	
	var shapeBalao = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRoundRect( 0, 0, 400, 200, 5 ));
	balaoTuto.x = 200;
	balaoTuto.y = 380;
	balaoTuto.addChild(shapeBalao);
	
	var titulo = new createjs.Text("Balengotengo", "50px Bahiana", "#ffffff");
	var b = titulo.getBounds();
	titulo.x = 200 - b.width/2;
	titulo.y = 15;
	balaoTuto.addChild(titulo);
	
	var texto = new createjs.Text("Clique e arraste para mirar. Solte para rebolar o balengotengo! Bora tirar essa raia daí!", "20px FiraSans", "#000000");
	texto.x = 15;
	texto.y = 75;
	texto.lineWidth = 370;
	texto.lineHeight = 25;
	balaoTuto.addChild(texto);
	
	balaoTuto.addChild(criaBotaoTuto());
	containerTutorial.addChild(balaoTuto);
	containerTutorial.addChild(mao);
	containerBalengo.addChild(containerTutorial);
	containerTutorial.scaleX = containerTutorial.scaleY = 0;
	containerTutorial.regX = 400;
	containerTutorial.regY = 300;
	containerTutorial.x = 400;
	containerTutorial.y = 300;
	createjs.Tween.get(containerTutorial, {override : true}).to({ scaleX : 1, scaleY : 1, status : "volta"} , 500).call(loopMao);
}

function criaBotaoTuto(){
	var botao = new createjs.Container();
	
	var shapeBotao = new createjs.Shape(new createjs.Graphics().beginFill("#ed682c").drawRoundRect( 0, 0, 80, 50, 5 ));
	botao.addChild(shapeBotao);
	
	var titulo = new createjs.Text("Bora!", "50px Bahiana", "#ffffff");
	var b = titulo.getBounds();
	titulo.x = 40 - b.width/2;
	botao.addChild(titulo);
	
	botao.x = 160;
	botao.y = 140;
	
	botao.on("click", function(evt){
		createjs.Tween.get(containerTutorial, {override : true}).to({ scaleX : 0, scaleY : 0, status : "volta"} , 500);
	});
	
	return botao;
	//titulo.y = 15;
	
}

function loopMao(){
	if(mao.status == "ida"){
		createjs.Tween.get(mao, {override : true}).wait(400).to({ rotation : -30, status : "volta"} , 1500).call(loopMao);
	}
	
	if(mao.status == "volta"){
		createjs.Tween.get(mao, {override : true}).wait(600).to({ rotation : 0, status: "ida"} , 1500).call(loopMao);
	}
}

function criaMaoTuto(){
	var data = {
		framerate: 24,
		images: [preloadBalengo.getResult("mao")],
		frames: {
			width:744, height:413
		},
		animations: {
		/*
			idle:[0],
			down:[1],
			impact:[2],
			click: [0, 2, "down"],
			*/
			idle : [0, 39, true]
        },
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	//animation.spriteSheet.getAnimation("click").speed = 50;
	animation.scaleX = animation.scaleY = 0.25;
	animation.regX = 600;
	animation.regY = 413;
	animation.width = animation.spriteSheet.getFrameBounds(0).width;
	animation.height = animation.spriteSheet.getFrameBounds(0).height;
	return animation;
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
	/*
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
	}*/
	
	//Caso o projétil saia da tela, se encerra o lançamento atual
	if(balengotengo.x < 0 || balengotengo.x > stage.canvas.width
	|| balengotengo.y>stage.canvas.height || balengotengo.y<0)
	{
		if(menino.currentFrame == 26){
		poeBalengoNaMao();
		lancou = false;
		}
		
	}  
	 maoDoMenino.x =  menino.x+20; 
    maoDoMenino.y = menino.y +30;
	
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
