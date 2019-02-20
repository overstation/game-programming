var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function(){
		canvas = document.getElementById('gameCanvas');
		canvasContext = canvas.getContext('2d');
		
		loadImages();
}

function imageLoadingDoneSoStartGame(){
		var framesPerSecond = 30;
		setInterval(updateAll, 1000/framesPerSecond);
		
		setupInput();
		
		loadLevel(levelOne);
}

function loadLevel(whichLevel){
	trackGrid = whichLevel.slice();
	greenCar.reset(otherCarPic, "Green Machine");
	blueCar.reset(carPic, "Storm");
}
function updateAll() {
		moveAll();
		drawAll();
}

function moveAll(){
		greenCar.move();
		blueCar.move();
}

function drawAll(){
	    drawTracks();
		greenCar.draw();
		blueCar.draw();
}



