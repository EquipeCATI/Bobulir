var stage;
var dragContainer; //Cenário como todo

function init() {
	stage = new createjs.Stage("canvas");
	createjs.Ticker.addEventListener("tick", tick);

	//Área de detecção de toque do dragBox
	//Necessário porque, por padrão, o createJS detecta interações somente onde há pixels e nosso dragBox não contém nenhum.
	var rect = new createjs.Shape(new createjs.Graphics().beginFill("#00000").drawRect(0, 0, stage.canvas.width, stage.canvas.height));

	//Aqui está ele, sem o 'beginFill()'
	var dragBox = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, stage.canvas.width, stage.canvas.height));
	dragBox.hitArea = rect; //E aqui a atribuição de toque
	dragBox.addEventListener("mousedown", startDrag);
	stage.addChild(dragBox);

	//Cenário
	dragContainer = new createjs.Container();
	stage.addChild(dragContainer);

	var bitmap = new createjs.Bitmap("teste.jpg"); //Container não possuem width e height definido, por isso estou pegando os da imagem
	dragContainer.width = bitmap.image.width;
	dragContainer.height = bitmap.image.height;
	dragContainer.maxPositionX = -(dragContainer.width - stage.canvas.width); //Limites de posicionamento dele
	dragContainer.maxPositionY = -(dragContainer.height - stage.canvas.height);
	
	dragContainer.y = dragContainer.maxPositionY; //Só para começar no canto esquerdo de baixo
	dragContainer.addChild(bitmap);
}

var offset = new createjs.Point();
function startDrag(event) {
	offset.x = stage.mouseX - dragContainer.x;
	offset.y = stage.mouseY - dragContainer.y;
	event.addEventListener("mousemove", doDrag);
}

function doDrag(event) {
	var positionX = event.stageX - offset.x;
	var positionY = event.stageY - offset.y;
	console.log(dragContainer.maxPositionY)
	if(positionX <=0 && positionX >= dragContainer.maxPositionX)
		dragContainer.x = event.stageX - offset.x;
	
	if(positionY <=0 && positionY >= dragContainer.maxPositionY)
		dragContainer.y = event.stageY - offset.y;
}

// Update the stage
function tick(event) {
	stage.update();
}
