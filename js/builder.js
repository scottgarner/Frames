"use strict"

// Build paths

function buildFrame(device) {

	var topLine = segmentPath({x: 0, y: 0}, {x: parameters.frameWidth + device.screenWidth + parameters.frameWidth, y: 0}, 9);

	var variations = [
		{"x": 0, 'y': 3},
		{"x": 0, 'y': -1},		
	];

	var topLine = distortPoint(
		topLine,
		1,
		{"x": parameters.variationOne, 'y': parameters.variationTwo},
		{'x': parameters.controlOne, 'y': parameters.controlTwo},
		{'x': parameters.controlThree, 'y': parameters.controlFour}
	);

	var topLine = distortPoint(
		topLine,
		2,
		{"x": parameters.variationThree, 'y': parameters.variationFour},
		{'x': parameters.controlFive, 'y': parameters.controlSix},
		{'x': parameters.controlSeven, 'y': parameters.controlEight}
	);

	var topLine = distortPoint(
		topLine,
		3,
		{"x": parameters.variationOne, 'y': parameters.variationTwo},
		{'x': parameters.controlOne, 'y': parameters.controlTwo},
		{'x': parameters.controlThree, 'y': parameters.controlFour}
	);

	var topLine = distortPoint(
		topLine,
		4,
		{"x": parameters.variationThree, 'y': parameters.variationFour},
		{'x': parameters.controlFive, 'y': parameters.controlSix},
		{'x': parameters.controlSeven, 'y': parameters.controlEight}
	);	

	var bottomLine = segmentPath({x: parameters.frameWidth + device.screenWidth + parameters.frameWidth, y: parameters.frameWidth + device.screenHeight + parameters.frameWidth}, {x: 0, y: parameters.frameWidth + device.screenHeight + parameters.frameWidth}, 9);

	var bottomLine = distortPoint(
		bottomLine,
		1,
		{"x": -parameters.variationOne, 'y': -parameters.variationTwo},
		{'x': -parameters.controlOne, 'y': -parameters.controlTwo},
		{'x': -parameters.controlThree, 'y': -parameters.controlFour}
	);

	var bottomLine = distortPoint(
		bottomLine,
		2,
		{"x": -parameters.variationThree, 'y': -parameters.variationFour},
		{'x': -parameters.controlFive, 'y': -parameters.controlSix},
		{'x': -parameters.controlSeven, 'y': -parameters.controlEight}
	);	

	var bottomLine = distortPoint(
		bottomLine,
		3,
		{"x": -parameters.variationOne, 'y': -parameters.variationTwo},
		{'x': -parameters.controlOne, 'y': -parameters.controlTwo},
		{'x': -parameters.controlThree, 'y': -parameters.controlFour}
	);

	var bottomLine = distortPoint(
		bottomLine,
		4,
		{"x": -parameters.variationThree, 'y': -parameters.variationFour},
		{'x': -parameters.controlFive, 'y': -parameters.controlSix},
		{'x': -parameters.controlSeven, 'y': -parameters.controlEight}
	);	

	var rightLine = segmentPath({x: parameters.frameWidth + device.screenWidth + parameters.frameWidth, y: 0}, {x: parameters.frameWidth + device.screenWidth + parameters.frameWidth, y: parameters.frameWidth + device.screenHeight + parameters.frameWidth}, 9);

	var rightLine = distortPoint(
		rightLine,
		1,
		{"y": parameters.variationOne,    'x': -parameters.variationTwo},
		{'y': parameters.controlOne, 'x': -parameters.controlTwo},
		{'y': parameters.controlThree, 'x': -parameters.controlFour}
	);

	var rightLine = distortPoint(
		rightLine,
		2,
		{"y": parameters.variationThree,    'x': -parameters.variationFour},
		{'y': parameters.controlFive, 'x': -parameters.controlSix},
		{'y': parameters.controlSeven, 'x': -parameters.controlEight}
	);	

	var rightLine = distortPoint(
		rightLine,
		3,
		{"y": parameters.variationOne,    'x': -parameters.variationTwo},
		{'y': parameters.controlOne, 'x': -parameters.controlTwo},
		{'y': parameters.controlThree, 'x': -parameters.controlFour}
	);	

	var rightLine = distortPoint(
		rightLine,
		4,
		{"y": parameters.variationThree,    'x': -parameters.variationFour},
		{'y': parameters.controlFive, 'x': -parameters.controlSix},
		{'y': parameters.controlSeven, 'x': -parameters.controlEight}
	);		

	var leftLine = segmentPath({x: 0, y: parameters.frameWidth + device.screenHeight + parameters.frameWidth}, {x: 0, y: 0}, 9);

	var leftLine = distortPoint(
		leftLine,
		1,
		{"y": -parameters.variationOne,    'x': parameters.variationTwo},
		{'y': -parameters.controlOne, 'x': parameters.controlTwo},
		{'y': -parameters.controlThree, 'x': parameters.controlFour}
	);

	var leftLine = distortPoint(
		leftLine,
		2,
		{"y": -parameters.variationThree,    'x': parameters.variationFour},
		{'y': -parameters.controlFive, 'x': parameters.controlSix},
		{'y': -parameters.controlSeven, 'x': parameters.controlEight}
	);		

	var leftLine = distortPoint(
		leftLine,
		3,
		{"y": -parameters.variationOne,    'x': parameters.variationTwo},
		{'y': -parameters.controlOne, 'x': parameters.controlTwo},
		{'y': -parameters.controlThree, 'x': parameters.controlFour}
	);	

	var leftLine = distortPoint(
		leftLine,
		4,
		{"y": -parameters.variationThree,    'x': parameters.variationFour},
		{'y': -parameters.controlFive, 'x': parameters.controlSix},
		{'y': -parameters.controlSeven, 'x': parameters.controlEight}
	);		

	var outerFrame = [];

	outerFrame = outerFrame.concat(topLine);
	outerFrame = outerFrame.concat(rightLine);
	outerFrame = outerFrame.concat(bottomLine);
	outerFrame = outerFrame.concat(leftLine);

	var innerFrame = [
		{x: parameters.frameWidth, y:parameters.frameWidth},
		{x: parameters.frameWidth + device.screenWidth, y:parameters.frameWidth},
		{x: parameters.frameWidth + device.screenWidth, y:parameters.frameWidth + device.screenHeight},
		{x: parameters.frameWidth, y:parameters.frameWidth + device.screenHeight},

	]

	// var standPath = [
	// 	{x: parameters.frameWidth, y:parameters.frameWidth},
	// 	{x: parameters.frameWidth + device.screenWidth, y:parameters.frameWidth + device.screenHeight/2},
	// 	{x: parameters.frameWidth, y:parameters.frameWidth + device.screenHeight},
	// ];

	// var standSeamPath = [
	// 	{
	// 		x: parameters.frameWidth ,
	// 		y: parameters.frameWidth + device.screenHeight/2
	// 	},	
	// 	{
	// 		x: parameters.frameWidth + device.screenWidth ,
	// 		y: parameters.frameWidth + device.screenHeight/2
	// 	},					
	// ]	

	return pathToString(outerFrame) + "Z" + pathToString(innerFrame) + "Z"; // + pathToString(standPath) + dashedPathToString(standSeamPath);

}

function buildFrameGuide(device) {

	var outerFrame = [
		{x: parameters.frameWidth - device.screenOffsetX - parameters.flapWidth, y:parameters.frameWidth - device.screenOffsetY},
		{x: parameters.frameWidth - device.screenOffsetX + device.width + parameters.flapWidth, y:parameters.frameWidth - device.screenOffsetY},
		{x: parameters.frameWidth - device.screenOffsetX + device.width + parameters.flapWidth, y:parameters.frameWidth - device.screenOffsetY + device.height},
		{x: parameters.frameWidth - device.screenOffsetX - parameters.flapWidth, y:parameters.frameWidth - device.screenOffsetY + device.height }
	];

	var innerSeamOne = [
		{x: parameters.frameWidth - device.screenOffsetX + device.width, y:parameters.frameWidth - device.screenOffsetY},
		{x: parameters.frameWidth - device.screenOffsetX + device.width, y:parameters.frameWidth - device.screenOffsetY + device.height},
	];

	var innerSeamTwo = [
		{x: parameters.frameWidth - device.screenOffsetX, y:parameters.frameWidth - device.screenOffsetY},
		{x: parameters.frameWidth - device.screenOffsetX, y:parameters.frameWidth - device.screenOffsetY + device.height}
	];	

	return pathToString(outerFrame) + "Z" + pathToString(innerSeamOne) + pathToString(innerSeamTwo) ;
}

function buildTemplate(device) {

	var outerPath = [
		{x: 0, y: 0},
		{
			x: parameters.flapWidth + device.depth + device.width + device.depth + parameters.flapWidth,
			y: 0 
		},
		{
			x: parameters.flapWidth + device.depth + device.width + device.depth + parameters.flapWidth,
			y: device.height
		},	
		{
			x: parameters.flapWidth + device.depth + device.width,
			y: device.height
		},	
		{
			x: parameters.flapWidth + device.depth + device.width,
			y: device.height + device.depth
		},		
		{
			x: parameters.flapWidth + device.depth,
			y: device.height + device.depth 
		},	
		{
			x: parameters.flapWidth + device.depth,
			y: device.height 
		},	
		{
			x: 0,
			y: device.height 
		},																				
	];


	return pathToString(outerPath) + "Z";
}

function buildTemplateSeams(device) {

	var seamPathOne = [
		{ 
			x: parameters.flapWidth, 
			y: 0
		},	
		{ 
			x: parameters.flapWidth, 
			y: device.height 
		}
	];

	var seamPathTwo= [
		{
			x: parameters.flapWidth + device.depth,
			y: 0
		},	
		{
			x: parameters.flapWidth + device.depth,
			y: device.height 
		},						
	]			

	var seamPathThree = [
		{
			x: parameters.flapWidth + device.depth + device.width,
			y: 0
		},	
		{
			x: parameters.flapWidth + device.depth + device.width,
			y: device.height 
		},						
	]	

	var seamPathFour = [
		{
			x: parameters.flapWidth + device.depth + device.width + device.depth,
			y: 0
		},	
		{
			x: parameters.flapWidth + device.depth + device.width + device.depth,
			y: device.height 
		},						
	]		

	var seamPathFive = [
		{
			x: parameters.flapWidth + device.depth ,
			y: device.height
		},	
		{
			x: parameters.flapWidth + device.depth + device.width ,
			y: device.height
		},						
	]	



	return dashedPathToString(seamPathOne)
		+ dashedPathToString(seamPathTwo)
		+ dashedPathToString(seamPathThree)
		+ dashedPathToString(seamPathFour)
		+ dashedPathToString(seamPathFive);	
		


}

// Path Functions

function dashedPathToString(path) {

	var vector = {};
	vector.x = path[1].x - path[0].x;
	vector.y = path[1].y - path[0].y;

	var pathLength = Math.sqrt((vector.x * vector.x) + (vector.y  * vector.y ));
	var originalPathLength = pathLength;

	vector.x /= pathLength;
	vector.y /= pathLength;

	var dashLength = 3.5;
	pathLength = Math.floor(pathLength/dashLength) * dashLength;
	var pathString = "";

	if (pathLength / dashLength % 2 == 0) pathLength -= dashLength;
	var offset = ( originalPathLength - pathLength) /2;

	for (var i = 0; i < pathLength/dashLength; i++) {

		if (i % 2 != 0) continue;	

		var segmentStartX =  path[0].x + (vector.x * offset) + (vector.x * ( dashLength ) * i);
		var segmentStartY =  path[0].y + (vector.y * offset) + (vector.y * ( dashLength ) * i);

		var segmentEndX =  path[0].x + (vector.x * offset) + (vector.x * ( dashLength ) * (i+1) );
		var segmentEndY =  path[0].y + (vector.y * offset) + (vector.y * ( dashLength ) * (i+1) );

		pathString += "M " + mm2pt(segmentStartX) + "," + mm2pt(segmentStartY) + " ";
		pathString += "L " + mm2pt(segmentEndX) + "," + mm2pt(segmentEndY) + " ";

	}

	return pathString;

};

function segmentPath(startPoint, endPoint, divsions) {
	
	divsions -=1;

	var vector = {};
	vector.x = endPoint.x - startPoint.x;
	vector.y = endPoint.y - startPoint.y;

	var vectorLength = Math.sqrt((vector.x * vector.x) + (vector.y  * vector.y ));

	vector.x /= vectorLength;
	vector.y /= vectorLength;

	var pointArray = [];

	for (var i = 0; i <= divsions; i++) {

		var newPoint = {
			'x': startPoint.x + (vector.x * (vectorLength / divsions ) * i),
			'y': startPoint.y + (vector.y * (vectorLength / divsions ) * i)
		}

		pointArray.push(newPoint);

	}

	return pointArray;

}

function distortPoint(path, offset, variation, controlStart, controlEnd) {

	var orientation = 0;
	if (path[0].x == path[path.length-1].x) orientation = 1;

	if (orientation == 0) {

		path[offset].x += variation.x;
		path[offset].y += variation.y;		

		path[path.length - 1 - offset].x -= variation.x ;
		path[path.length - 1 - offset].y += variation.y ;			

		path[offset].controlPointStart = {'x': path[offset-1].x + controlStart.x ,'y': path[offset-1].y + controlStart.y };
		path[offset].controlPointEnd = {'x': path[offset].x + controlEnd.x ,'y': path[offset].y + controlEnd.y };

		path[path.length - offset].controlPointStart = {'x': path[path.length - 1 - offset].x - controlEnd.x ,'y': path[path.length - 1 - offset].y  + controlEnd.y};
		path[path.length - offset].controlPointEnd = {'x': path[path.length - offset].x - controlStart.x,'y': path[path.length - offset].y + controlStart.y };

	} else {

		path[offset].x += variation.x;
		path[offset].y += variation.y;		

		path[path.length - 1 - offset].x += variation.x ;
		path[path.length - 1 - offset].y -= variation.y ;	

		path[offset].controlPointStart = {'x': path[offset-1].x + controlStart.x ,'y': path[offset-1].y + controlStart.y };
		path[offset].controlPointEnd = {'x': path[offset].x + controlEnd.x ,'y': path[offset].y + controlEnd.y };

		path[path.length - offset].controlPointStart = {'x': path[path.length - 1 - offset].x + controlEnd.x ,'y': path[path.length - 1 - offset].y  - controlEnd.y};
		path[path.length - offset].controlPointEnd = {'x': path[path.length - offset].x + controlStart.x,'y': path[path.length - offset].y - controlStart.y };

	}

	return path;
}


// Utility functions

function pathToString(coordinates) {

	var pathString = "";
	for (var i = 0; i< coordinates.length; i++) {
		var prefix = (i == 0) ? "M" : "L";

		if (coordinates[i].controlPointStart ) prefix = "C";

		pathString += prefix; 

		if (coordinates[i].controlPointStart ) {
			pathString += mm2pt(coordinates[i].controlPointStart.x) + "," + mm2pt(coordinates[i].controlPointStart.y) + " ";
			pathString += mm2pt(coordinates[i].controlPointEnd.x) + "," + mm2pt(coordinates[i].controlPointEnd.y) + " ";

		}

		pathString += mm2pt(coordinates[i].x) + "," + mm2pt(coordinates[i].y);

	}

	return pathString;

}
		
function mm2pt(mms) { return mms * 2.83464567; }