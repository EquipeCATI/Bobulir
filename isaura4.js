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

	lixeiraVidro = new createjs.Shape(new createjs.Graphics().beginFill("#00ff00").drawRect(450, 20, 50, 90));
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
	//criando o lixo
	for(var i = 0; i<12; i++){
		console.log(" "+i);
		var rand = parseInt(Math.random()*4)
		switch(rand){
			case 0:
				lixo = new createjs.Shape(new createjs.Graphics().beginFill("#00ff00").drawCircle(0, 0, 30));
				lixo.tipo = "vidro";
			break;
			case 1:
				lixo = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawCircle(0, 0, 30));
				lixo.tipo = "plastico";
			break;
			case 2:
				lixo = new createjs.Shape(new createjs.Graphics().beginFill("#ffff00").drawCircle(0, 0, 30));
				lixo.tipo = "metal";
			break;
			case 3:
				lixo = new createjs.Shape(new createjs.Graphics().beginFill("#0000ff").drawCircle(0, 0, 30));
				lixo.tipo = "papel";
			break;
			default:
				alert("erro!");
		}

		lixo.x = 20 + 40*i;
		lixo.y = 120 + 20*i;
		lixo.Xoriginal = lixo.x; //
		lixo.Yoriginal = lixo.y;
		containerJogoLixo.addChild(lixo);

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
	}
}