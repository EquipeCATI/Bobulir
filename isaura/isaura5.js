var lixeiraVidro;
var lixeiraMetal;
var lixeiraPapel;
var lixeiraPlastico;
var containerJogoLixo = new createjs.Container();
var isaura = new criaIsaura();
var preloadIsaura = new createjs.LoadQueue(false);

function carregaAssetsLixo(){

	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

	stage.enableMouseOver(20); 

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



	stage.addChild(containerJogoLixo);
	geraLixo();
}

function verificaLixeira(lixo){
	if(lixo.tipo == "vidro"){
		console.log("vidro");
		//Checagem de colisão
		var ponto = lixo.localToLocal(0,0,lixeiraVidro); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (lixeiraVidro.hitTest(ponto.x, ponto.y)) 
		{
			console.log("soltou vidro na lixeira certa");
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
		}else isaura.gotoAndPlay("nao");
	}
	
	else if(lixo.tipo == "metal"){
		//Checagem de colisão
		var ponto = lixo.localToLocal(0,0,lixeiraMetal); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (lixeiraMetal.hitTest(ponto.x, ponto.y)) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
		}else isaura.gotoAndPlay("nao");
	}
	
	else if(lixo.tipo == "papel"){
		//Checagem de colisão
		var ponto = lixo.localToLocal(0,0,lixeiraPapel); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (lixeiraPapel.hitTest(ponto.x, ponto.y)) 
		{
			containerJogoLixo.removeChild(lixo);
			isaura.gotoAndPlay("sim");
		}else isaura.gotoAndPlay("nao");
	}
	
	else if(lixo.tipo == "plastico"){
		//Checagem de colisão
		var ponto = lixo.localToLocal(0,0,lixeiraPlastico); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (lixeiraPlastico.hitTest(ponto.x, ponto.y)) 
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
	var flag = false;
	//criando o lixo
	for(var i = 0; i<12; i++){
		console.log(" "+i);
		var rand = parseInt(Math.random()*4);
		switch(rand){
			case 0:
				countV++;
				if(countV <= 3){
					lixo = new createjs.Shape(new createjs.Graphics().beginFill("#00ff00").drawRect(0, 0, 25, 35));
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
					lixo = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 25, 35));
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
					lixo = spriteLixo();
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
					lixo = new createjs.Shape(new createjs.Graphics().beginFill("#0000ff").drawRect(0, 0, 25, 35));
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

					createjs.Tween.get(evt.target, {override : true}).to({ x : evt.target.Xoriginal, y : evt.target.Yoriginal} , 2500, createjs.Ease.getPowOut(2)).to({ rotation : 10, clicado : false} , 1).call(loopLixo);
				}
				console.log("Soltou"); 
			});
		}else{
			flag = false;
		}
		
	}
}

function loopLixo(evt){

	if( evt.target.rotation == 10 && !evt.target.clicado){
		createjs.Tween.get(evt.target).to({ rotation : -10} , 2500, createjs.Ease.getPowOut(3)).call(loopLixo);
	}
	
	if(evt.target.rotation == -10 && !evt.target.clicado){
		createjs.Tween.get(evt.target).to({ rotation : 10} , 2500, createjs.Ease.getPowOut(3)).call(loopLixo);
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

function spriteLixo(){
	
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
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "normal");

	animation.regX = (animation.spriteSheet.getFrameBounds(0).width*animation.scaleX)/2
	animation.regY = (animation.spriteSheet.getFrameBounds(0).height*animation.scaleX)/2

	animation.scaleX = animation.scaleY = 0.7;


	return animation;
}

