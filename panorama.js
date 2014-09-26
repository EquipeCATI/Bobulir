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

	var bitmap = new createjs.Bitmap("cenarios/teste.jpg"); //Containers não possuem width e height definido, por isso estou pegando os da imagem
	dragContainer.width = bitmap.image.width;
	dragContainer.height = bitmap.image.height;
	dragContainer.maxPositionX = - (dragContainer.width - stage.canvas.width); //Limites de posicionamento dele
	dragContainer.maxPositionY = - (dragContainer.height - stage.canvas.height);
	
	dragContainer.y = dragContainer.maxPositionY; //Só para começar no canto esquerdo de baixo
	dragContainer.addChild(bitmap);
	dragContainer.addChild(criaRelogio());
	dragContainer.addChild(criaBela());
}

function criaRelogio(){
	
	var data = {
		framerate: 10,
		images: ["Sprites/relogio.png"],
		frames: {
			width:100, height:100
		},
		animations: {
			idle:0,
			run:[0, 15, "idle", 0.5]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 1300;
	animation.y = 800;
	
	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
    var audioPath = "audio/";
    var manifest = [
        {id:"poim", src:"poim.mp3"},
    ];
 
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerManifest(manifest, audioPath);
	
	animation.on("click", function move(evt){
		animation.gotoAndPlay("run");
		createjs.Sound.play("poim");
	});
	
	return animation;
}

function criaBela(){
	var data = {
		framerate: 10,
		images: ["Sprites/bela.png"],
		frames: {
			width:150, height:150
		},
		animations: {
			idle: 0,
			run: [0, 19, "idle", 0.5]
		}
	};
	
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "idle");
	animation.x = 1800;
	animation.y = 1000;

	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
    var audioPath = "audio/";
    var manifest = [
        {id:"magia", src:"magia.mp3"},
    ];
 
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerManifest(manifest, audioPath);
	
	animation.on("click", function move(evt){
		animation.gotoAndPlay("run");
		createjs.Sound.play("magia");
	});
	
	return animation;
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
	if (positionX <= 0 && positionX >= dragContainer.maxPositionX)
		dragContainer.x = event.stageX - offset.x;

	if (positionY <= 0 && positionY >= dragContainer.maxPositionY)
		dragContainer.y = event.stageY - offset.y;
}

// Update the stage
function tick(event) {
	stage.update();
}
