var lixeiraVidro;
var lixeiraMetal;
var lixeiraPapel;
var lixeiraPlastico;
var containerJogoLixo = new createjs.Container();
var isaura = new criaIsaura();
var preloadIsaura = new createjs.LoadQueue(false);
var quadrim1;
var quadrim2;
var quadrim3;

function carregaAssetsLixo(){
	preloadIsaura.on("complete", preloadCompletoLixo);
	var manifest = [
		{src:"backFim.png", id:"backFinal"},
		{src:"meninoRaia.png", id:"meninoRaia"},
		{src:"final1.png", id:"quadrinhoFinal1"},
		{src:"final2.png", id:"quadrinhoFinal2"},
		{src:"final3.png", id:"quadrinhoFinal3"},
		{src:"lixeiraMetal.png", id:"lixeiraMetal"},
		{src:"lixoPlasticos.png", id:"lixeiraPlasticos"},
		{src:"lixeiraVidro.png", id:"lixeiraVidro"},
		{src:"lixoPapel.png", id:"lixeiraPapel"},
		{src:"pisca.png", id:"pisca"},
		{src:"sim.png", id:"sim"},
		{src:"nao.png", id:"nao"},
		{src:"back2.png", id:"back"},
		{src:"lixos/amassado.png", id:"amassado"},
		{src:"lixos/balde.png", id:"baldeMetal"},
		{src:"lixos/baldo.png", id:"baldePlastico"},
		{src:"lixos/sardinha.png", id:"sardinha"},
		{src:"lixos/carta.png", id:"carta"},
		{src:"lixos/copo.png", id:"copo"},
		{src:"lixos/garrafa.png", id:"garrafaV"},
		{src:"lixos/garrafap.png", id:"garrafaP"},
		{src:"lixos/lata.png", id:"lata"},
		{src:"lixos/oculos.png", id:"oculos"},
		{src:"lixos/papel.png", id:"papel"},
		{src:"lixos/pente.png", id:"pente"},
		];

	preloadIsaura.loadManifest(manifest, true, "isaura/");

	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
	var audioPath = "isaura/";
	var manifestAudio = [
		{id:"rap", src:"rapDoLixo.m4a"},
		{id:"sim", src:"sim.wav"},
		{id:"nao", src:"nao.wav"},
	];
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.registerManifest(manifestAudio, audioPath);

	}

function preloadCompletoLixo(evt){
	stage.mouseMoveOutside = true;

	var lagoa = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRect(0, 200, 800, 400));
	var fundo = new createjs.Bitmap(preloadIsaura.getResult("back"));
	containerJogoLixo.addChild(fundo);

	containerJogoLixo.addChild(isaura);

	// Fazendo as lixeiras
	lixeiraVidro = new createjs.Bitmap(preloadIsaura.getResult("lixeiraVidro"));
	lixeiraVidro.x = 320;
	lixeiraVidro.y = 40;
	containerJogoLixo.addChild(lixeiraVidro);

	lixeiraPlastico = new createjs.Bitmap(preloadIsaura.getResult("lixeiraPlasticos"));
	lixeiraPlastico.x = 440;
	lixeiraPlastico.y = 40;
	containerJogoLixo.addChild(lixeiraPlastico);

	lixeiraMetal = new createjs.Bitmap(preloadIsaura.getResult("lixeiraMetal"));
	lixeiraMetal.x = 570;
	lixeiraMetal.y = 40;
	containerJogoLixo.addChild(lixeiraMetal);

	lixeiraPapel = new createjs.Bitmap(preloadIsaura.getResult("lixeiraPapel"));
	lixeiraPapel.x = 695;
	lixeiraPapel.y = 40;
	containerJogoLixo.addChild(lixeiraPapel);

	containerJogoLixo.scaleX = containerJogoLixo.scaleY = 0;
	stage.addChild(containerJogoLixo);
	var rap = createjs.Sound.play("rap");
	rap.volume = 0.6;
	geraLixo();
	criaTutorialIsaura();
	quadrim1 = criaQuadrinhoFinal1();
	quadrim2 = criaQuadrinhoFinal2();
	quadrim3 = criaQuadrinhoFinal3();
}

var sim;
var nao;

function verificaLixeira(lixo){
	if(lixo.tipo == "vidro"){
		//Checagem de colisão
		var ponto = ndgmr.checkRectCollision(lixo,lixeiraVidro); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (ponto) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
			sim = createjs.Sound.play("sim");
			sim.volume = 0.7;
			countV--;
		}else{ isaura.gotoAndPlay("nao");
		nao = createjs.Sound.play("nao");
			nao.volume = 0.7;
		}
	}
	
	else if(lixo.tipo == "metal"){
		//Checagem de colisão
		var ponto = ndgmr.checkRectCollision(lixo,lixeiraMetal); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (ponto) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
			sim = createjs.Sound.play("sim");
			sim.volume = 0.7;
			countM--;
		}else{
		 isaura.gotoAndPlay("nao");
		 nao = createjs.Sound.play("nao");
		nao.volume = 0.7;
		}
	}
	
	else if(lixo.tipo == "papel"){
		//Checagem de colisão
		var ponto = ndgmr.checkRectCollision(lixo,lixeiraPapel); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (ponto) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
			sim = createjs.Sound.play("sim");
			sim.volume = 0.7;
			countPp--;
		}else{ isaura.gotoAndPlay("nao");
			nao = createjs.Sound.play("nao");
			nao.volume = 0.7;
	}
	}
	
	else if(lixo.tipo == "plastico"){
		//Checagem de colisão
		var ponto = ndgmr.checkRectCollision(lixo,lixeiraPlastico); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (ponto) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
			sim = createjs.Sound.play("sim");
			sim.volume = 0.7;
			countPl--;
		}else {
			isaura.gotoAndPlay("nao");
			nao = createjs.Sound.play("nao");
			nao.volume = 0.7;
			}

	}
	
}
var countV = 0;
var countPl = 0;
var countM = 0;
var countPp = 0;


function geraLixo(){
	var lixo;
	
	
	//criando o lixo
	for(var i = 0; i<12; i++){
		var flag = false;
		var rand = parseInt(Math.random()*4);
		switch(rand){
			case 0:
				if(countV < 3){
					countV++;
					lixo = spriteLixoVidro(countV);
					lixo.tipo = "vidro";
				}else{
					i--;
					flag = true;
				}				
			break;

			case 1:
				if(countPl < 3){
					countPl++
					lixo = spriteLixoPlastico(countPl);
					lixo.tipo = "plastico";
				}else{
					i--;
					flag = true;
				}
				
			break;

			case 2:
				if(countM < 3){
					countM++;
					lixo = spriteLixoMetal(countM);
					lixo.tipo = "metal";
				}else{
					i--;
					flag = true;
				}
				
			break;

			case 3:
				if(countPp < 3){
					countPp++;
					lixo = spriteLixoPapel(countPp);
					lixo.tipo = "papel";
				}else{
					i--;
					flag = true;
				}
				
			break;

			default:
				alert("erro!");
		}

		if(flag == false){
			lixo.x = 200 +parseInt(Math.random()*570);
			lixo.y = 230 + parseInt(Math.random()*360);
			lixo.Xoriginal = lixo.x; //
			lixo.Yoriginal = lixo.y;
			lixo.clicado = false;
			//lixo.rotation = -10 + parseInt(Math.random()*19);
			containerJogoLixo.addChild(lixo);

			//ondulação do vento na água
			createjs.Tween.get(lixo).to({ rotation : 10} , 2500, createjs.Ease.getPowOut(3)).call(loopLixo);

			//Os atributos Xoriginal e Yoriginal ja fazem isso
			lixo.on("mousedown", function(evt){
				evt.target.clicado = true;
				evt.target.rotation = 0;
				evt.target.gotoAndPlay("dragged");
			});

			//listener para fazer o "drag"
			lixo.on("pressmove",function(evt) {
				evt.target.x = evt.stageX;
				evt.target.y = evt.stageY;
			});

			//listener quando o botão é solto
			lixo.on("pressup", function(evt) { 
				verificaLixeira(evt.target);
				if(countPp == 0 && countM == 0 && countPl == 0 && countV == 0){
					console.log("entrou");
					containerJogoLixo.addChild(new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0, 0, 800, 600)));
					containerJogoLixo.addChild(quadrim1);
					containerJogoLixo.addChild(quadrim2);
					containerJogoLixo.addChild(quadrim3);
					containerJogoLixo.on("tick", iniciaAnimacaoFinal);
					quadrim1.gotoAndPlay("anima");
				}
				if(evt.target){
					createjs.Tween.get(evt.target, {override : true}).to({ x : evt.target.Xoriginal, y : evt.target.Yoriginal} , 2500).call(voltaParaOLago).to({ rotation : 10, clicado : false} , 1).call(loopLixo);
				}
			});
		}
	}
}
function criaQuadrinhoFinal1(){
	var data = {
		framerate: 24,
		images: [preloadIsaura.getResult("quadrinhoFinal1")],
		frames: {
			width:800, height:600
		},
		animations: {
			idle: [0],
			anima : [0, 50, false],
			termina : [49]
        },
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	return animation;
}

function criaQuadrinhoFinal2(){
	var data = {
		framerate: 24,
		images: [preloadIsaura.getResult("quadrinhoFinal2")],
		frames: {
			width:800, height:600
		},
		animations: {
			idle : [0],
			anima : [0, 50, false],
			termina : [49],
        },
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	return animation;
}

function criaQuadrinhoFinal3(){
	var data = {
		framerate: 24,
		images: [preloadIsaura.getResult("quadrinhoFinal3")],
		frames: {
			width:800, height:600
		},
		animations: {
			idle : [0],
			anima : [0, 50, false]
        },
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	return animation;
}
function iniciaAnimacaoFinal(){
	if(quadrim3.currentFrame != 50){
		if(quadrim1.currentFrame == 50){
			quadrim1.gotoAndPlay("termina");
			quadrim2.gotoAndPlay("anima");
			}

		if(quadrim2.currentFrame == 50){
			quadrim2.gotoAndPlay("termina");
			quadrim3.gotoAndPlay("anima")
			}
	}
	else{
			var fadeOutScreen = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0, 0, 800, 600));
			fadeOutScreen.alpha = 0;
			stage.addChild(fadeOutScreen);
			createjs.Tween.get(fadeOutScreen, {override : true}).to({ alpha : 1} , 500).call(criaFim).to({alpha : 0}, 500);
			containerJogoLixo.removeAllEventListeners();
		}
}

function criaFim(){
	credito.x = 400;
	var containerFinal = new createjs.Container();
	var fundo = new createjs.Bitmap(preloadIsaura.getResult("backFinal"));
	containerFinal.x = -5;
	containerFinal.addChild(fundo);
	containerFinal.addChild(criaMeninoRaia());
	containerFinal.addChild(credito);
	loopCred();
	stage.addChild(containerFinal);
}

function criaMeninoRaia(){
	var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("meninoRaia")],
		frames: {
			width:200, height:380
		},
		animations: {
			idle: [0, 79]
		}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");

	animation.x = 60;
	animation.y = 150;



	return animation;
}

function voltaParaOLago(evt){
	evt.target.gotoAndPlay("normal");
}

function loopCred(){
 	createjs.Tween.get(credito).to({ y : -credito.image.height} ,30000).to({ y : 600} , 1).call(loopCred);
 }

function loopLixo(evt){
	if( evt.target.rotation == 10 && !evt.target.clicado){
		createjs.Tween.get(evt.target).to({ rotation : -10} , 2500).call(loopLixo);
	}
	if(evt.target.rotation == -10 && !evt.target.clicado){
		createjs.Tween.get(evt.target).to({ rotation : 10} , 2500).call(loopLixo);
	}
}

function criaIsaura(){
	
	var data = {
		framerate: 10,
		images: ["isaura/pisca.png", "isaura/nao.png", "isaura/sim.png"],
		frames: {
			width:200, height:274
		},
		animations: {
			pisca: [0, 29],
			nao: [30, 66, "pisca"],
			sim: [72, 101, "pisca"]
		}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "pisca");

	animation.x = 10;
	animation.y = 350;


	return animation;
}

function spriteLixoMetal(cont){
	if(cont == 1){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("lata")],
		frames: {
			width:70, height:100
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};

	}
	else if(cont == 2){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("baldeMetal")],
		frames: {
			width:150, height:130
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};

	}
	else if(cont == 3){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("sardinha")],
		frames: {
			width:105, height:50
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};
	}
	
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "normal");

	animation.regX = (animation.spriteSheet.getFrameBounds(0).width*animation.scaleX)/2
	animation.regY = (animation.spriteSheet.getFrameBounds(0).height*animation.scaleX)/2

	animation.scaleX = animation.scaleY = 0.7;


	return animation;
}

function spriteLixoPapel(cont){
	if(cont == 1){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("carta")],
		frames: {
			width:110, height:85
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};

	}
	else if(cont == 2){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("amassado")],
		frames: {
			width:50, height:43
		},
		animations: {
			normal: 0,
			dragged: 0
		}
		};

	}
	else if(cont == 3){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("papel")],
		frames: {
			width:120, height:140
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};
	}
	
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "normal");

	animation.regX = (animation.spriteSheet.getFrameBounds(0).width*animation.scaleX)/2
	animation.regY = (animation.spriteSheet.getFrameBounds(0).height*animation.scaleX)/2

	animation.scaleX = animation.scaleY = 0.7;


	return animation;
}

function spriteLixoVidro(cont){
	if(cont == 1){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("oculos")],
		frames: {
			width:115, height:55
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};

	}
	else if(cont == 2){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("copo")],
		frames: {
			width:64, height:79
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};

	}
	else if(cont == 3){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("garrafaV")],
		frames: {
			width:60, height:190
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};
	}
	
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "normal");

	animation.regX = (animation.spriteSheet.getFrameBounds(0).width*animation.scaleX)/2
	animation.regY = (animation.spriteSheet.getFrameBounds(0).height*animation.scaleX)/2

	animation.scaleX = animation.scaleY = 0.7;


	return animation;
}

function spriteLixoPlastico(cont){
	if(cont == 1){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("pente")],
		frames: {
			width:60, height:90
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};

	}
	else if(cont == 2){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("baldePlastico")],
		frames: {
			width:110, height:143
		},
		animations: {
			normal: 0,
			dragged: 0
		}
		};

	}
	else if(cont == 3){
		var data = {
		framerate: 10,
		images: [preloadIsaura.getResult("garrafaP")],
		frames: {
			width:60, height:140
		},
		animations: {
			normal: 0,
			dragged: 1
		}
		};
	}
	
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "normal");

	animation.regX = (animation.spriteSheet.getFrameBounds(0).width*animation.scaleX)/2
	animation.regY = (animation.spriteSheet.getFrameBounds(0).height*animation.scaleX)/2

	animation.scaleX = animation.scaleY = 0.7;


	return animation;
}

function criaTutorialIsaura(){
	
	contTutorial = new createjs.Container();
	var fundoTutoHitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRoundRect(0, 0, stage.canvas.width, stage.canvas.height, 10));
	var fundoTuto = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRoundRect(0, 0, stage.canvas.width, stage.canvas.height, 10));
	fundoTuto.alpha = 0.5;
	fundoTuto.hitArea = fundoTutoHitArea;
	contTutorial.addChild(fundoTuto);
	
	var balaoTuto = new createjs.Container();
	
	var shapeBalao = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRoundRect( 0, 0, 400, 200, 5 ));
	balaoTuto.x = 200;
	balaoTuto.y = 380;
	balaoTuto.addChild(shapeBalao);
	
	var titulo = new createjs.Text("Coleta da Isaura", "50px Bahiana", "#ffffff");
	var b = titulo.getBounds();
	titulo.x = 200 - b.width/2;
	titulo.y = 15;
	balaoTuto.addChild(titulo);
	
	var texto = new createjs.Text("Ajude a Isaura a limpar a lagoa para ela lhe devolver a pipa. Clique e arraste para jogar os lixos nas lixeiras certas. Foi perder no zerinho ou um, agora limpa aí!", "20px FiraSans", "#000000");
	texto.x = 15;
	texto.y = 75;
	texto.lineWidth = 370;
	texto.lineHeight = 25;
	balaoTuto.addChild(texto);
	
	balaoTuto.addChild(criaBotaoIsaura());
	contTutorial.addChild(balaoTuto);
	stage.addChild(contTutorial);
	contTutorial.scaleX = contTutorial.scaleY = 0;
	contTutorial.regX = 400;
	contTutorial.regY = 300;
	contTutorial.x = 400;
	contTutorial.y = 300;
	createjs.Tween.get(contTutorial, {override : true}).to({ scaleX : 1, scaleY : 1, status : "volta"} , 500);
}



function criaBotaoIsaura(){
	var botao = new createjs.Container();
	
	var shapeBotao = new createjs.Shape(new createjs.Graphics().beginFill("#ed682c").drawRoundRect( 0, 0, 100, 50, 5 ));
	botao.addChild(shapeBotao);
	
	var titulo = new createjs.Text("Limpar!", "50px Bahiana", "#ffffff");
	var b = titulo.getBounds();
	titulo.x = 50 - b.width/2;
	botao.addChild(titulo);
	
	botao.x = 150;
	botao.y = -60;
	
	botao.on("click", function(evt){
		createjs.Tween.get(contTutorial, {override : true}).to({ scaleX : 0, scaleY : 0, status : "volta"} , 500);
		endTutorialBalengo = true;
	});
	
	return botao;
	//titulo.y = 15;
	
}

