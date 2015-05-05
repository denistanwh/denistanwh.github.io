function runCOne() {
	
	var dateFirst = [];
	var dataLast = [];
function addAxesAndLegendCOne (svg, xAxis, yAxis, margin, chartWidth, chartHeight, textAxes) {
	
	var axes = svg.append('g')
		.attr('clip-path', 'url(#axes-clip)');

	axes.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + chartHeight + ')')
		.call(xAxis);

	axes.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', -46)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text(textAxes);

}

function drawPathsCOne (svg, data, x, y, yTwo, titletext) {
	
var upperOuterArea = d3.svg.area()
	.interpolate('basis')
	.x (function (d) { return x(d.date) || 1; })
	.defined(function(d) { return !isNaN(d.date); })
	.y0(function (d) { return yTwo(d.Hi95); })
	.defined(function(d) { return !isNaN(d.Hi95); })
	.y1(function (d) { return yTwo(d.Hi80); })
	.defined(function(d) { return !isNaN(d.Hi80); });

var upperInnerArea = d3.svg.area()
	.interpolate('basis')
	.x (function (d) { return x(d.date) || 1; })
	.defined(function(d) { return !isNaN(d.date); })
	.y0(function (d) { return yTwo(d.Hi80); })
	.defined(function(d) { return !isNaN(d.Hi80); })
	.y1(function (d) { return yTwo(d.for); })
	.defined(function(d) { return !isNaN(d.for); });
	
var plotFig = d3.svg.line()
	.interpolate('basis')
	.x (function (d) { return x(d.date) || 1; })
	.defined(function(d) { return !isNaN(d.date); })
	.y(function (d) { return y(d.dat); })
	.defined(function(d) { return !isNaN(d.dat); });

var plotFigTwo = d3.svg.line()
	.interpolate('basis')
	.x (function (d) { return x(d.date) || 1; })
	.defined(function(d) { return !isNaN(d.date); })
	.y(function (d) { return yTwo(d.for); })
	.defined(function(d) { return !isNaN(d.for); });

var lowerInnerArea = d3.svg.area()
	.interpolate('basis')
	.x (function (d) { return x(d.date) || 1; })
	.defined(function(d) { return !isNaN(d.date); })
	.y0(function (d) { return yTwo(d.for); })
	.defined(function(d) { return !isNaN(d.for); })
	.y1(function (d) { return yTwo(d.Lo80); })
	.defined(function(d) { return !isNaN(d.Lo80); });

var lowerOuterArea = d3.svg.area()
	.interpolate('basis')
	.x (function (d) { return x(d.date) || 1; })
	.defined(function(d) { return !isNaN(d.date); })
	.y0(function (d) { return yTwo(d.Lo80); })
	.defined(function(d) { return !isNaN(d.Lo80); })
	.y1(function (d) { return yTwo(d.Lo95); })
	.defined(function(d) { return !isNaN(d.Lo95); });

	svg.datum(data);
		
	svg.append('path')
		.attr('class', 'area upper outer')
		.attr('d', upperOuterArea)
		.attr('clip-path', 'url(#rect-clip)')
		.attr("fill", "rgba(100, 200, 100, 0.8)")
		.attr("stroke", "rgba(100, 200, 100, 0.8)");

	svg.append('path')
		.attr('class', 'area lower outer')
		.attr('d', lowerOuterArea)
		.attr('clip-path', 'url(#rect-clip)')
		.attr("fill", "rgba(100, 200, 100, 0.8)")
		.attr("stroke", "rgba(100, 200, 100, 0.8)");

	svg.append('path')
		.attr('class', 'area upper inner')
		.attr('d', upperInnerArea)
		.attr('clip-path', 'url(#rect-clip)')
		.attr("fill", "rgba(100, 100, 100, 0.8)")
		.attr("stroke", "rgba(100, 100, 100, 0.8)");

	svg.append('path')
		.attr('class', 'area lower inner')
		.attr('d', lowerInnerArea)
		.attr('clip-path', 'url(#rect-clip)')
		.attr("fill", "rgba(100, 100, 100, 0.8)")
		.attr("stroke", "rgba(100, 100, 100, 0.8)");
		
	svg.append('path')
		.attr('class', 'figure')
		.attr('d', plotFig)
		.attr('clip-path', 'url(#rect-clip)')
		.attr("fill", "none")
		.attr("stroke", "#abe3ce")
		.attr("stroke-width", "2");
		
	svg.append('path')
		.attr('class', 'figure')
		.attr('d', plotFigTwo)
		.attr('clip-path', 'url(#rect-clip)')
		.attr("fill", "none")
		.attr("stroke", "#000000")
		.attr("stroke-width", "2");
		
	svg.append('text')
		.attr('x', 750)
		.attr('y', 30)
		.attr('font-family', 'Open Sans')
		.attr('font-size', '14px')
		.text(titletext);
}

function startTransitions (svg, chartWidth, chartHeight, rectClip, x) {
	rectClip
		.transition().duration(30000).attr('width', chartWidth);

}

function makeChartCOne (data, titletext, textAxes) {
	var svgWidth  = 960,
		svgHeight = 300,
		margin = { top: 20, right: 20, bottom: 40, left: 60 },
		chartWidth  = svgWidth  - margin.left - margin.right,
		chartHeight = svgHeight - margin.top  - margin.bottom;

	var x = d3.time.scale().range([0, chartWidth])
			.domain([dateFirst, dateLast]),
		yTwo = d3.scale.linear().range([chartHeight, 0])
			.domain([d3.extent(data, function (d) { return d.Lo95; })[0],d3.extent(data, function (d) { return d.Hi95; })[1]]),
		y = d3.scale.linear().range([chartHeight, 0])
			.domain(d3.extent(data, function (d) { return d.dat; }));

	var xAxis = d3.svg.axis().scale(x).orient('bottom')
				.innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
		yAxis = d3.svg.axis().scale(y).orient('left')
				.innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

	var svg = d3.select('body').append('svg')
		.attr('width',  svgWidth)
		.attr('height', svgHeight)
		.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// clipping to start chart hidden and slide it in later
	var rectClip = svg.append('clipPath')
		.attr('id', 'rect-clip')
		.append('rect')
			.attr('width', 0)
			.attr('height', chartHeight);

	addAxesAndLegendCOne(svg, xAxis, yAxis, margin, chartWidth, chartHeight, textAxes);
	drawPathsCOne(svg, data, x, y, yTwo, titletext);
	startTransitions(svg, chartWidth, chartHeight, rectClip, x);
}

var parseDate  = d3.time.format('%Y-%m-%d').parse;

d3.csv('data/Eugene-predict-365.csv', function (rawData) {

	var dataSix = rawData.map(function (d) {
		return {
			date: d3.time.format('%d/%m/%y').parse(d.Date),
			for: Math.round(d.Forecast),
			dat: Math.round(d.Actual),
			Lo80: Math.round(d.Lo80),
			Lo95: Math.round(d.Lo95),
			Hi80: Math.round(d.Hi80),
			Hi95: Math.round(d.Hi95),
		};
	});
	
	dateLast = d3.extent(dataSix, function(d) {
		return d.date;
	})[1];

	d3.csv('data/Eugene-original.csv', function (rawData) {

		var dataOne = rawData.map(function (d) {
			return {
				date: parseDate(d.day),
				dat: Math.round(d.MW),
			};
		});
		var dataTwo = rawData.map(function (d) {
			return {
				date: parseDate(d.day),
				dat: Math.round(d.Temp),
			};
		});
		var dataThree = rawData.map(function (d) {
			return {
				date: parseDate(d.day),
				dat: Math.round(d.Trend),
			};
		});
		var dataFour = rawData.map(function (d) {
			return {
				date: parseDate(d.day),
				dat: Math.round(d.Random),
			};
		});
		var dataFive = rawData.map(function (d) {
			return {
				date: parseDate(d.day),
				dat: Math.round(d.Seasonal),
			};
		});

		dateFirst = d3.extent(dataOne, function (d) {
			return d.date;
		})[0]
		
		var titletextOne = 'Energy Demand',
			titletextTwo = 'Prediction',
			titletextThree = 'Temperature',
			titletextFour = 'Trend',
			titletextFive = 'Random',
			titletextSix = 'Seasonal',
			textAxesOne = 'Eugene Daily Average Energy Demand (MW)',
			textAxesTwo = 'Eugene Daily Average Energy 365-Day Forecast (MW)',
			textAxesThree = 'Eugene Daily Average Temperature (C)',
			textAxesFour = 'Trend Component',
			textAxesFive = 'Random Component',
			textAxesSix = 'Seasonal Component';
		

	makeChartCOne(dataOne, titletextOne, textAxesOne);
	makeChartCOne(dataSix, titletextTwo, textAxesTwo);
	makeChartCOne(dataTwo, titletextThree, textAxesThree);
	makeChartCOne(dataThree, titletextFour, textAxesFour);
	makeChartCOne(dataFour, titletextFive, textAxesFive);
	makeChartCOne(dataFive, titletextSix, textAxesSix);
	});
});

};