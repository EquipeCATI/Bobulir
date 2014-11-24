var lixeiraVidro;
var lixeiraMetal;
var lixeiraPapel;
var lixeiraPlastico;
var containerJogoLixo = new createjs.Container();

function carregaAssetsLixo(){
	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

	stage.enableMouseOver(20);  
	createjs.Ticker.on("tick", tick);

	stage.mouseMoveOutside = true;

	var lagoa = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRect(0, 200, 800, 400));
	containerJogoLixo.addChild(lagoa);

	// Fazendo as lixeiras

	lixeiraPlastico = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(525, 20, 60, 110));
	containerJogoLixo.addChild(lixeiraPlastico);

	lixeiraMetal = new createjs.Shape(new createjs.Graphics().beginFill("#ffff00").drawRect(600, 20, 60, 110));
	containerJogoLixo.addChild(lixeiraMetal);

	lixeiraPapel = new createjs.Shape(new createjs.Graphics().beginFill("#0000ff").drawRect(675, 20, 60, 110));
	containerJogoLixo.addChild(lixeiraPapel);

	lixeiraVidro = new createjs.Shape(new createjs.Graphics().beginFill("#00ff00").drawRect(450, 20, 60, 110));
	containerJogoLixo.addChild(lixeiraVidro);

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
		}
	}
	
	else if(lixo.tipo == "metal"){
		//Checagem de colisão
		var ponto = lixo.localToLocal(0,0,lixeiraMetal); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (lixeiraMetal.hitTest(ponto.x, ponto.y)) 
		{
			containerJogoLixo.removeChild(lixo);
		}
	}
	
	else if(lixo.tipo == "papel"){
		//Checagem de colisão
		var ponto = lixo.localToLocal(0,0,lixeiraPapel); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (lixeiraPapel.hitTest(ponto.x, ponto.y)) 
		{
			containerJogoLixo.removeChild(lixo);
		}
	}
	
	else if(lixo.tipo == "plastico"){
		//Checagem de colisão
		var ponto = lixo.localToLocal(0,0,lixeiraPlastico); //Posição do projétil relativo ao alvo
		
		//Checagem se este ponto está por cima de algum pixel do alvo
		if (lixeiraPlastico.hitTest(ponto.x, ponto.y)) 
		{
			containerJogoLixo.removeChild(lixo);
		}
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
					lixo = new createjs.Shape(new createjs.Graphics().beginFill("#ffff00").drawRect(0, 0, 25, 35));
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
			//lixo.rotation = -10 + parseInt(Math.random()*19);
			containerJogoLixo.addChild(lixo);

			//ondulação do vento na água
			createjs.Tween.get(lixo).to({ rotation : 10} , 2500, createjs.Ease.getPowOut(3)).call(loopLixo);

			//Os atributos Xoriginal e Yoriginal ja fazem isso
			lixo.on("click", function(evt){
			lastPosX = evt.target.Xoriginal;
			lastPosY = evt.target.Yoriginal;
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
				createjs.Tween.get(evt.target, {override : true}).to({ x : evt.target.Xoriginal, y : evt.target.Yoriginal} , 2500, createjs.Ease.getPowOut(2));
			}
			console.log("Soltou"); 
			});
		}else{
			flag = false;
		}
		
	}
}

function loopLixo(evt){
	if( evt.target.rotation == 10){
		createjs.Tween.get(evt.target).to({ rotation : -10} , 2500, createjs.Ease.getPowOut(3)).call(loopLixo);
	}
	
	if(evt.target.rotation == -10){
		createjs.Tween.get(evt.target).to({ rotation : 10} , 2500, createjs.Ease.getPowOut(3)).call(loopLixo);
	}
}

function criaIsaura(){
	
	var data = {
		framerate: 10,
		images: ["pisca.png"],
		frames: {
			width:524, height:400
		},
		animations: {
			pisca: 0,
			sim: [0, 75, "idle"],
			nao: []
		}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");

	return animation;
}