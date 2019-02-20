const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_GAP = 2;

var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 1,
				 1, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 3, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 2, 2, 3, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
				 1, 0, 0, 3, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
				 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,]
var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function returnTileTypeAtColRow(col,row){
	if(col >= 0 && col < TRACK_COLS &&
	   row >= 0 && row < TRACK_ROWS){
			var TrackIndexUnderCoord = rowColToArrayIndex(col,row);
	        return trackGrid[TrackIndexUnderCoord];
	   } else {
			return TRACK_WALL;
	   }
	
}

function carTrackHandling(whichCar){
		var carTrackCol = Math.floor(whichCar.x/TRACK_W);
		var carTrackRow = Math.floor(whichCar.y/TRACK_H);
		var TrackIndexUndercar = rowColToArrayIndex(carTrackCol,carTrackRow);
		
		if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && 
		   carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
		   var tileHere = returnTileTypeAtColRow( carTrackCol,carTrackRow );
		if(tileHere == TRACK_GOAL) {
			console.log(whichCar.name + " WINS!");
			loadLevel(levelOne);
		} else if(tileHere != TRACK_ROAD) {
			// next two lines added to fix a bug, mentioned in video 9.6
			// undoes the car movement which got it onto the wall
			whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
			whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
			whichCar.speed *= -0.5;
			}// end of TRACK found
		}// end of valid col and row
}// end of carTRACKHandling function

function rowColToArrayIndex(col, row){
		return col + TRACK_COLS * row;
}
function drawTracks(){
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++){
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++){
			var tileKindHere = trackGrid[arrayIndex];
			var useImg = trackPics[tileKindHere];
			canvasContext.drawImage(useImg, drawTileX,drawTileY);
			
			drawTileX += TRACK_W;
			arrayIndex++;
		}//end of for each col
		drawTileY += TRACK_H;
		drawTileX = 0;
	}//end of for each row
}


