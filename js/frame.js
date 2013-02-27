"use strict"

var paper;

var flapWidth = 12;
var frameWidth = 40;

var devices = {
	"iPhone 5": {
		width: 58.57,
		height: 128.83,
		depth: 7.60,
		screenWidth: 51.70,
		screenHeight: 90.39,
		screenOffsetX: 3.43,
		screenOffsetY: 16.72
	},
	"iPhone 4S": {
		width: 58.55,
		height: 115.15,
		depth: 9.34,
		screenWidth: 49.92,
		screenHeight: 74.88,
		screenOffsetX: 4.31,
		screenOffsetY: 20.13
	},
	"iPad Mini": {
		width: 134.7,
		height: 200.1,
		depth: 7.20,
		screenWidth: 121.3,
		screenHeight: 161.2,
		screenOffsetX: 6.7,
		screenOffsetY: 19.4
	}	
};

var parameters = {
	"device": "iPhone 4S",
	"download": function() {
		$("svg path").attr('stroke-width', ".1px");

		var svgData = $("svg")
			.attr("title", "frame")
			.attr("version", 1.1)
			.attr("xmlns", "http://www.w3.org/2000/svg")
			.parent().html();

		$("svg path").attr('stroke-width', ".5px");

		var blob = new Blob([svgData], {type: "image/svg+xml"});
		saveAs(blob, "frame.svg");
	}
}


function displayControls() {
	var gui = new dat.GUI();
	
	var deviceController = gui.add(parameters, 'device', ["iPhone 4S", "iPhone 5", "iPad Mini" ]);
	gui.add(parameters, 'download');

	deviceController.onFinishChange(function(value) {
	  displayFrame();
	});

}

function centerFrame() {

	$("#container").css('left', window.innerWidth/2 - $("#container").width() /2 );
	$("#container").css('top', window.innerHeight/2 - $("#container").height() /2 );

}

function displayFrame() {

	var currentDevice = devices[parameters.device];

	$("#container").html("");

	paper = Raphael("container", in2pt(12), in2pt(8));

	var outerTemplate = paper.path( buildOuterPath(currentDevice));
	outerTemplate.attr("stroke", "#f00");
	outerTemplate.attr("stroke-width", ".5");

	var innerTemplate = paper.path( buildSeams(currentDevice));
	innerTemplate.attr("stroke", "#00f");
	innerTemplate.attr("stroke-dasharray", "--");
	innerTemplate.attr("stroke-width", ".5");

	var templateSet = paper.set();
	templateSet.push(
		outerTemplate,
		innerTemplate
	);
	templateSet.transform("t10,10");

	console.log( templateSet.getBBox().width + 20);

	var frame = paper.path( buildFrame(currentDevice));
	frame.attr("stroke", "#f00");
	frame.attr("stroke-width", ".5");

	var frameGuide = paper.path( buildFrameGuide(currentDevice));
	frameGuide.attr("stroke", "#0f0");
	frameGuide.attr("stroke-dasharray", "--");
	frameGuide.attr("stroke-width", ".5");

	var frameSet = paper.set();
	frameSet.push(
		frame,
		frameGuide
	);
	frameSet.transform("t" + (20 + templateSet.getBBox().width) + ",10");	

	var drawingSet = paper.set();
	drawingSet.push(
		templateSet,
		frameSet
	);

	paper.setSize(drawingSet.getBBox().width + 20, drawingSet.getBBox().height + 20);

	// Resize Containers

	$("#container").width(drawingSet.getBBox().width + 20);
	$("#container").height(drawingSet.getBBox().height + 20);

	centerFrame();

	//template.attr("stroke-width", ".1");

	/*
	var containerDiv = d3.select('#container');

	

	var svg = containerDiv.append('svg:svg')
		.attr("width", in2pt(12))
		.attr("height", in2pt(8));		

	var templateGroup = svg.append("svg:g")
		.attr("transform", "translate(" + in2pt(.25) + "," + in2pt(.25) + ")");

	var pathString = buildOuterPath(currentDevice);

	var outerPath = templateGroup.append("svg:path")
		.attr("d", pathString)
		.style("stroke-width", 1)
		.style("stroke", "red")
		.style("fill", "none");				

	var pathString = buildSeams(currentDevice);
		
	var seamPaths = templateGroup.append("svg:path")
		.attr("d", pathString)
		.style("stroke-width", 1)
		.style("stroke", "blue")
		.style("stroke-dasharray", "4,4")
		.style("fill", "none");	

	var frameGroup = svg.append("svg:g")
		.attr("transform", "translate(" + in2pt(6) + "," + in2pt(.25) + ")");	


	var pathString = buildFrame(currentDevice);

	var outerPath = frameGroup.append("svg:path")
		.attr("d", pathString)
		.style("stroke-width", 1)
		.style("stroke", "red")
		.style("fill", "none");	

	*/

}

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

function distortPath(path, offset) {

	var variation = {'x': 0, 'y': 3};
	var controlStart = {'x': 6, 'y': 2};
	var controlEnd = {'x': 4, 'y': 4};

	path[offset].y +=3;
	path[offset].controlPointStart = {'x': path[offset-1].x + 6 ,'y': path[offset-1].y + 2 };
	path[offset].controlPointEnd = {'x': path[offset].x + 4 ,'y': path[offset].y + 8 };

	path[path.length - 1 - offset].y +=3 ;
	path[path.length - offset].controlPointStart = {'x': path[path.length - 1 - offset].x -4 ,'y': path[path.length - 1 - offset].y  + 8};
	path[path.length - offset].controlPointEnd = {'x': path[path.length - offset].x - 6,'y': path[path.length - offset].y + 2 };

	return path;
}

// Build paths

function buildFrame(device) {

	var topLine = segmentPath({x: 0, y: 0}, {x: frameWidth + device.screenWidth + frameWidth, y: 0}, 9);

	var topLine = distortPath(topLine, 1);



	topLine[3].y +=3;
	topLine[5].y +=3;

	topLine[4].controlPointStart = {'x': topLine[3].x + 16 ,'y': topLine[3].y + 8 };
	topLine[4].controlPointEnd = {'x': topLine[4].x - 8 ,'y': topLine[4].y  };

	topLine[5].controlPointStart = {'x': topLine[4].x + 8 ,'y': topLine[4].y };
	topLine[5].controlPointEnd = {'x': topLine[5].x - 16,'y': topLine[5].y + 8 };

	var bottomLine = segmentPath({x: frameWidth + device.screenWidth + frameWidth, y: frameWidth + device.screenHeight + frameWidth}, {x: 0, y: frameWidth + device.screenHeight + frameWidth}, 9);

	bottomLine[1].y -=3;
	bottomLine[1].controlPointStart = {'x': bottomLine[0].x - 6 ,'y': bottomLine[0].y - 2 };
	bottomLine[1].controlPointEnd = {'x': bottomLine[1].x - 4 ,'y': bottomLine[1].y - 8 };

	bottomLine[7].y -=3 ;
	bottomLine[8].controlPointStart = {'x': bottomLine[7].x +4 ,'y': bottomLine[7].y  - 8};
	bottomLine[8].controlPointEnd = {'x': bottomLine[8].x + 6,'y': bottomLine[8].y - 2 };

	bottomLine[3].y -=3;
	bottomLine[5].y -=3;

	bottomLine[4].controlPointStart = {'x': bottomLine[3].x - 16 ,'y': bottomLine[3].y - 8 };
	bottomLine[4].controlPointEnd = {'x': bottomLine[4].x + 8 ,'y': bottomLine[4].y  };

	bottomLine[5].controlPointStart = {'x': bottomLine[4].x - 8 ,'y': bottomLine[4].y };
	bottomLine[5].controlPointEnd = {'x': bottomLine[5].x + 16,'y': bottomLine[5].y - 8};

	var rightLine = segmentPath({x: frameWidth + device.screenWidth + frameWidth, y: 0}, {x: frameWidth + device.screenWidth + frameWidth, y: frameWidth + device.screenHeight + frameWidth}, 9);

	rightLine[1].x -=3;
	rightLine[7].x -=3;
	rightLine[3].x -=3;
	rightLine[5].x -=3;	

	var leftLine = segmentPath({x: 0, y: frameWidth + device.screenHeight + frameWidth}, {x: 0, y: 0}, 9);

	leftLine[1].x +=3;
	leftLine[7].x +=3;
	leftLine[3].x +=3;
	leftLine[5].x +=3;

	var outerFrame = [];

	outerFrame = outerFrame.concat(topLine);
	outerFrame = outerFrame.concat(rightLine);
	outerFrame = outerFrame.concat(bottomLine);
	outerFrame = outerFrame.concat(leftLine);

	var innerFrame = [
		{x: frameWidth, y:frameWidth},
		{x: frameWidth + device.screenWidth, y:frameWidth},
		{x: frameWidth + device.screenWidth, y:frameWidth + device.screenHeight},
		{x: frameWidth, y:frameWidth + device.screenHeight},

	]

	return pathToString(outerFrame) + "Z" + pathToString(innerFrame) + "Z";

}

// Build paths

function buildFrameGuide(device) {

	var outerFrame = [
		{x: frameWidth - device.screenOffsetX - flapWidth, y:frameWidth - device.screenOffsetY},
		{x: frameWidth - device.screenOffsetX + device.width + flapWidth, y:frameWidth - device.screenOffsetY},
		{x: frameWidth - device.screenOffsetX + device.width + flapWidth, y:frameWidth - device.screenOffsetY + device.height + flapWidth},
		{x: frameWidth - device.screenOffsetX - flapWidth, y:frameWidth - device.screenOffsetY + device.height + flapWidth}
	];

	var innerFrame = [
		{x: frameWidth - device.screenOffsetX, y:frameWidth - device.screenOffsetY},
		{x: frameWidth - device.screenOffsetX + device.width, y:frameWidth - device.screenOffsetY},
		{x: frameWidth - device.screenOffsetX + device.width, y:frameWidth - device.screenOffsetY + device.height},
		{x: frameWidth - device.screenOffsetX, y:frameWidth - device.screenOffsetY + device.height}
	];

	return pathToString(outerFrame) + "Z" + pathToString(innerFrame) + "Z";

}

function buildOuterPath(device) {

	var outerPath = [
		{x: 0, y: 0},
		{
			x: flapWidth + device.depth + device.width + device.depth + flapWidth,
			y: 0 
		},
		{
			x: flapWidth + device.depth + device.width + device.depth + flapWidth,
			y: device.height
		},	
		{
			x: flapWidth + device.depth + device.width,
			y: device.height
		},	
		{
			x: flapWidth + device.depth + device.width,
			y: device.height + device.depth + flapWidth
		},		
		{
			x: flapWidth + device.depth,
			y: device.height + device.depth + flapWidth
		},	
		{
			x: flapWidth + device.depth,
			y: device.height 
		},	
		{
			x: 0,
			y: device.height 
		},																				
	];

	return pathToString(outerPath) + "Z";
}

function buildSeams(device) {

	var seamPathOne = [
		{
			x: flapWidth,
			y: 0
		},	
		{
			x: flapWidth,
			y: device.height
		},						
	]

	var seamPathTwo= [
		{
			x: flapWidth + device.depth,
			y: 0
		},	
		{
			x: flapWidth + device.depth,
			y: device.height
		},						
	]			

	var seamPathThree = [
		{
			x: flapWidth + device.depth + device.width,
			y: 0
		},	
		{
			x: flapWidth + device.depth + device.width,
			y: device.height
		},						
	]	

	var seamPathFour = [
		{
			x: flapWidth + device.depth + device.width + device.depth,
			y: 0
		},	
		{
			x: flapWidth + device.depth + device.width + device.depth,
			y: device.height
		},						
	]		

	var seamPathFive = [
		{
			x: flapWidth + device.depth,
			y: device.height
		},	
		{
			x: flapWidth + device.depth + device.width,
			y: device.height
		},						
	]

	var seamPathSix = [
		{
			x: flapWidth + device.depth,
			y: device.height + device.depth
		},	
		{
			x: flapWidth + device.depth + device.width,
			y: device.height + device.depth
		},						
	]											

	return pathToString(seamPathOne)
		+ pathToString(seamPathTwo)
		+ pathToString(seamPathThree)
		+ pathToString(seamPathFour)
		+ pathToString(seamPathFive)
		+ pathToString(seamPathSix);	
		


}

// Utility functions

/*
var pathToString = d3.svg.line()
		.x(function(d){return mm2pt(d.x);})
		.y(function(d){return mm2pt(d.y);})
		.interpolate("linear");
*/

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
function in2pt(ins) { return ins * 72; }