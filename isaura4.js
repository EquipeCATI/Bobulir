var lixoVidro;
var lixoMetal;
var lixoPapel;
var lixoPlastico;
var placeHolder;
var pHContainer;
var tipoObj;
var lastPosX;
var lastPosY;
var lixo;

function carregaAssets(){
	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

	stage.enableMouseOver(20);  
	createjs.Ticker.on("tick", tick);

	stage.mouseMoveOutside = true;


	var lagoa = new createjs.Shape(new createjs.Graphics().beginFill("#6fc5ce").drawRect(0, 200, 800, 400));
	stage.addChild(lagoa);

	// Fazendo as lixeiras
	lixoVidro = new createjs.Shape(new createjs.Graphics().beginFill("#00ff00").drawRect(450, 20, 60, 110));
	stage.addChild(lixoVidro);

	lixoPlastico = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(525, 20, 60, 110));
	stage.addChild(lixoPlastico);

	lixoMetal = new createjs.Shape(new createjs.Graphics().beginFill("#ffff00").drawRect(600, 20, 60, 110));
	stage.addChild(lixoMetal);

	lixoPapel = new createjs.Shape(new createjs.Graphics().beginFill("#0000ff").drawRect(675, 20, 60, 110));
	stage.addChild(lixoPapel);

	lixoVidro = new createjs.Shape(new createjs.Graphics().beginFill("#00ff00").drawRect(450, 20, 50, 90));
	stage.addChild(lixoVidro);

	geraLixo();

	

	





}

function verificaLixeira(evt){

	//reconhecendo onde o obeto foi colocado.
		if((evt.stageX >= 450) && (evt.stageX <= 510) && (evt.stageY >= 20) && (evt.stageY <= 130)){
			console.log("Lixeira do Vidro");
			//reconhecendo se o tipo de objeto corresponde a lixeira certa.
			if(tipoObj == "vidro"){
				alert("Lixeira certa");
				stage.removeChild(lixo);

			}else{
					alert("Lixeira Errada");
			}
		}

		if((evt.stageX >= 525) && (evt.stageX <= 585) && (evt.stageY >= 20) && (evt.stageY <= 130)){
			console.log("Lixeira do Plástico");
			//reconhecendo se o tipo de objeto corresponde a lixeira certa.
			if(tipoObj == "plastico"){
				alert("Lixeira certa");
				stage.removeChild(pHContainer);

			}else{
					alert("Lixeira Errada");
			}
		}

		if((evt.stageX >= 600) && (evt.stageX <= 660) && (evt.stageY >= 20) && (evt.stageY <= 130)){
			console.log("Lixeira do Metal");
			//reconhecendo se o tipo de objeto corresponde a lixeira certa.
			if(tipoObj == "metal"){
				alert("Lixeira certa");
				stage.removeChild(pHContainer);

			}else{
					alert("Lixeira Errada");
			}
		}

		if((evt.stageX >= 675) && (evt.stageX <= 835) && (evt.stageY >= 20) && (evt.stageY <= 130)){
			console.log("Lixeira do Papel");
			//reconhecendo se o tipo de objeto corresponde a lixeira certa.
			if(tipoObj == "papel"){
				alert("Lixeira certa");
				stage.removeChild(pHContainer);

			}else{
					alert("Lixeira Errada");
			}
		}


}

function geraLixo(){
	//var lixo;
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
		lixo.Xoriginal = lixo.x;
		lixo.Yoriginal = lixo.y;
		stage.addChild(lixo);

		//listener para salvar posição inicial do lixo.
		lixo.on("click", function(evt){
			lastPosX = evt.target.Xoriginal;
			lastPosY = evt.target.Yoriginal;
		});

		//listener para fazer o "drag"
		lixo.on("pressmove",function(evt) {
				tipoObj = evt.target.tipo;

				evt.currentTarget.x = evt.stageX;
				evt.currentTarget.y = evt.stageY;
				 
		});

		//listener quando o botão é solto
		lixo.on("pressup", function(evt) { 
		/*
		switch(evt){
			case (evt.stageX >= 450) && (evt.stageX <= 510) && (evt.stageY >= 20) && (evt.stageY <= 130):
				console.log("Entre X e Y");
				//reconhecendo se o tipo de objeto corresponde a lixeira certa.
				if(tipoObj == "metal"){
					alert("Lixeira certa");
					stage.removeChild(pHContainer);
				}else{
					alert("Lixeira Errada");
				}
				break;
			
		}*/
		verificaLixeira(evt);

		if(lixo){
			evt.currentTarget.x = lastPosX;
			evt.currentTarget.y = lastPosY;
		}

		console.log("Soltou"); 
		});

	}
	



}