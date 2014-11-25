var lixeiraVidro;
var lixeiraMetal;
var lixeiraPapel;
var lixeiraPlastico;
var containerJogoLixo = new createjs.Container();
var isaura = new criaIsaura();
var preloadIsaura = new createjs.LoadQueue(false);

function carregaAssetsLixo(){
	preloadIsaura.on("complete", preloadCompletoLixo);
	var manifest = [
		{src:"lixeiraMetal.png", id:"lixeiraMetal"},
		{src:"lixoPlasticos.png", id:"lixeiraPlasticos"},
		{src:"lixeiraVidro.png", id:"lixeiraVidro"},
		{src:"lixoPapel.png", id:"lixeiraPapel"},
		{src:"pisca.png", id:"pisca"},
		{src:"sim.png", id:"sim"},
		{src:"nao.png", id:"nao"},
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

	}

function preloadCompletoLixo(evt){

	stage.mouseMoveOutside = true;

	var lagoa = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRect(0, 200, 800, 400));
	var fundo = new createjs.Bitmap(preloadIsaura.getResult("back"));
	containerJogoLixo.addChild(lagoa);

	containerJogoLixo.addChild(isaura);

	// Fazendo as lixeiras
	lixeiraVidro = new createjs.Bitmap(preloadIsaura.getResult("lixeiraVidro"));
	lixeiraVidro.x = 320;
	lixeiraVidro.y = 20;
	containerJogoLixo.addChild(lixeiraVidro);

	lixeiraPlastico = new createjs.Bitmap(preloadIsaura.getResult("lixeiraPlasticos"));
	lixeiraPlastico.x = 440;
	lixeiraPlastico.y = 20;
	containerJogoLixo.addChild(lixeiraPlastico);

	lixeiraMetal = new createjs.Bitmap(preloadIsaura.getResult("lixeiraMetal"));
	lixeiraMetal.x = 570;
	lixeiraMetal.y = 20;
	containerJogoLixo.addChild(lixeiraMetal);

	lixeiraPapel = new createjs.Bitmap(preloadIsaura.getResult("lixeiraPapel"));
	lixeiraPapel.x = 695;
	lixeiraPapel.y = 20;
	containerJogoLixo.addChild(lixeiraPapel);

	containerJogoLixo.scaleX = containerJogoLixo.scaleY = 0;
	stage.addChild(containerJogoLixo);
	geraLixo();
}

function verificaLixeira(lixo){
	if(lixo.tipo == "vidro"){
		console.log("vidro");
		//Checagem de colisão
		var ponto = ndgmr.checkRectCollision(lixo,lixeiraVidro); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (ponto) 
		{
			console.log("soltou vidro na lixeira certa");
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
		}else isaura.gotoAndPlay("nao");
	}
	
	else if(lixo.tipo == "metal"){
		//Checagem de colisão
		var ponto = ndgmr.checkRectCollision(lixo,lixeiraMetal); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (ponto) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
		}else isaura.gotoAndPlay("nao");
	}
	
	else if(lixo.tipo == "papel"){
		//Checagem de colisão
		var ponto = ndgmr.checkRectCollision(lixo,lixeiraPapel); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (ponto) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
		}else isaura.gotoAndPlay("nao");
	}
	
	else if(lixo.tipo == "plastico"){
		//Checagem de colisão
		var ponto = ndgmr.checkRectCollision(lixo,lixeiraPlastico); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (ponto) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
		}else isaura.gotoAndPlay("nao");
	}
	
}

function geraLixo(){
	var lixo;
	var countV = 0;
	var countPl = 0;
	var countM = 0;
	var countPp = 0;
	
	//criando o lixo
	for(var i = 0; i<12; i++){
		var flag = false;
		console.log(" "+i);
		var rand = parseInt(Math.random()*4);
		switch(rand){
			case 0:
				countV++;
				if(countV <= 3){
					lixo = spriteLixoVidro(countV);
					lixo.tipo = "vidro";
					console.log("cria verde. cont: "+ countV);
				}else{
					i--;
					flag = true;
				}				
			break;

			case 1:
				countPl++
				if(countPl <= 3){
					lixo = spriteLixoPlastico(countPl);
					lixo.tipo = "plastico";
					console.log("cria vermelho. cont: "+ countPl);
				}else{
					i--;
					flag = true;
				}
				
			break;

			case 2:
				countM++;
				if(countM <= 3){
					lixo = spriteLixoMetal(countM);
					lixo.tipo = "metal";
					console.log("cria amarelo. cont: "+ countM);
				}else{
					i--;
					flag = true;
				}
				
			break;

			case 3:
				countPp++;
				if(countPp <= 3){
					lixo = spriteLixoPapel(countPp);
					lixo.tipo = "papel";
					console.log("cria azul. cont: "+ countPp);
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
				if(evt.target){
					createjs.Tween.get(evt.target, {override : true}).to({ x : evt.target.Xoriginal, y : evt.target.Yoriginal} , 2500).call(voltaParaOLago).to({ rotation : 10, clicado : false} , 1).call(loopLixo);
					
				}
				console.log("Soltou " + evt.target.tipo); 
			});
		}
	}
}

function voltaParaOLago(evt){
	evt.target.gotoAndPlay("normal");
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
	
	console.log(" "+ cont);
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
	
	console.log(" "+ cont);
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
	
	console.log(" "+ cont);
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
	
	console.log(" "+ cont);
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
			width:140, height:143
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


