"use strict"

var parameters = {
	device: "iPhone 4S",
	preset: "One",

	frameWidth: 30,
	flapWidth: 12,

	variationOne: 0,
	variationTwo: 3,
	variationThree: 0,
	variationFour: 0,

	controlOne: 6,
	controlTwo: -5,
	controlThree: 4,
	controlFour: 12,
	controlFive: -6,
	controlSix: -8,
	controlSeven: -8,
	controlEight: 8,					

	download: function() {

		paper.setSize(drawingWidth, drawingHeight);
		$("svg path").attr('stroke-width', ".1px");


		var svgData = $("svg")
			.attr("title", "frame")
			.attr("version", 1.1)
			.attr("xmlns", "http://www.w3.org/2000/svg")
			.parent().html();

		var blob = new Blob([svgData], {type: "image/svg+xml"});
		saveAs(blob, "frame.svg");

		$("svg path").attr('stroke-width', ".5px");
		resizeFrame();

	},
	randomize: function() {

		parameters.variationOne = Math.round(Math.random() * 8 - 4);
		parameters.variationTwo = Math.round(Math.random() * 16 - 8);
		parameters.variationThree = Math.round(Math.random() * 8 - 4);
		parameters.variationFour = Math.round(Math.random() * 16 - 8);		

		parameters.controlOne = Math.round(Math.random() * 24 - 12);
		parameters.controlTwo = Math.round(Math.random() * 24 - 12);
		parameters.controlThree = Math.round(Math.random() * 24 - 12);
		parameters.controlFour = Math.round(Math.random() * 24 - 12);
		parameters.controlFive = Math.round(Math.random() * 24 - 12);
		parameters.controlSix = Math.round(Math.random() * 24 - 12);
		parameters.controlSeven = Math.round(Math.random() * 24 - 12);
		parameters.controlEight = Math.round(Math.random() * 24 - 12);

		displayFrame();
	}	
}