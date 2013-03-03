"use strict"

var paper, drawingWidth, drawingHeight;

function init() {

	$(window).resize( function() { resizeFrame(); });

}

function displayControls() {
	var gui = new dat.GUI({ autoPlace: false });
	
	$('#controls').append(gui.domElement);

	var controller;
	var folder;
	
	folder = gui.addFolder('Settings');

	controller = folder.add(parameters, 'device', ["iPhone 4S", "iPhone 5", "iPad Mini" ])
		.onFinishChange(function(value) { displayFrame();});

	controller = folder.add(parameters, 'preset', ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight" ])
		.onFinishChange(function(value) {

			for (var key in frames[parameters.preset]) {

				parameters[key]   = frames[parameters.preset][key];	
			}
			
			displayFrame();
		});		

	folder.open();

	folder = gui.addFolder('Position Variance');

	folder.add(parameters, 'frameWidth', 24, 36).listen().onChange(function(value) { displayFrame();});

	folder.add(parameters, 'variationOne',   -4, 4).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'variationTwo',   -8, 8).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'variationThree', -4, 4).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'variationFour',  -8, 8).listen().onChange(function(value) { displayFrame();});

	folder = gui.addFolder('Control Points');

	folder.add(parameters, 'controlOne',   -12, 12).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'controlTwo',   -12, 12).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'controlThree', -12, 12).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'controlFour',  -12, 12).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'controlFive',  -12, 12).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'controlSix',   -12, 12).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'controlSeven', -12, 12).listen().onChange(function(value) { displayFrame();});
	folder.add(parameters, 'controlEight', -12, 12).listen().onChange(function(value) { displayFrame();});


	folder = gui.addFolder('Actions');

	folder.add(parameters, 'randomize');
	folder.add(parameters, 'download');

	folder.open();

}

function displayFrame() {

	var currentDevice = devices[parameters.device];

	$("#container").html("");

	paper = Raphael("container", 100, 100);

	var outerTemplate = paper.path( buildTemplate(currentDevice));
	outerTemplate.attr("stroke", "#f00");
	outerTemplate.attr("stroke-width", ".5");

	var innerTemplate = paper.path( buildTemplateSeams(currentDevice));
	innerTemplate.attr("stroke", "#f00");
	innerTemplate.attr("stroke-width", ".5");

	var templateSet = paper.set();
	templateSet.push(outerTemplate, innerTemplate);
	templateSet.transform("t10,10");

	var frame = paper.path( buildFrame(currentDevice));
	frame.attr("stroke", "#f00");
	frame.attr("stroke-width", ".5");

	var frameGuide = paper.path( buildFrameGuide(currentDevice));
	frameGuide.attr("stroke", "#0f0");
	frameGuide.attr("stroke-width", ".5");

	var frameSet = paper.set();
	frameSet.push(frame, frameGuide );
	frameSet.transform("t" + (20 + templateSet.getBBox().width - frameSet.getBBox().x) + "," + (10 - frameSet.getBBox().y));	

	var drawingSet = paper.set();
	drawingSet.push(templateSet, frameSet);

	// Resize Containers

	drawingWidth = drawingSet.getBBox().width + 20;
	drawingHeight = drawingSet.getBBox().height + 20;

	resizeFrame();

}

function resizeFrame() {

	var width = window.innerWidth - $("#controls").width() - 24;
	var height = (drawingHeight/drawingWidth) * width;

	if (height > window.innerHeight - 24) {
		height = window.innerHeight - 24;
		width = (drawingWidth/drawingHeight) * height;
	}

	paper.setSize(width, height);

	paper.setViewBox(0,0,drawingWidth, drawingHeight, false);

	$("#container").width(paper.width);
	$("#container").height(paper.height);

	$("#container").css('left', $("#controls").width() + 12 );
	$("#container").css('top', 12 );

}

