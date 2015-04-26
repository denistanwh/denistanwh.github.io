function runCFive() {
function addAxesAndLegendCFive (svg, xAxis, yAxis, margin, chartWidth, chartHeight) {

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
			.attr('y', 6)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text('');


}

function drawPathsCFive (svg, data, x, y) {
var plotFig = d3.svg.line()
	.interpolate('basis')
	.x (function (d) { return x(d.date) || 1; })
	.defined(function(d) { return !isNaN(d.date); })
	.y(function (d) { return y(d.dat); })
	.defined(function(d) { return !isNaN(d.dat); });


	svg.datum(data);

	svg.append('path')
		.attr('class', 'figure')
		.attr('d', plotFig)
		.attr('clip-path', 'url(#rect-clip)');

}

function startTransitions (svg, chartWidth, chartHeight, rectClip, x) {
	rectClip
		.transition().duration(30000).attr('width', chartWidth);

}

function makeChartCFive (data) {
	var svgWidth  = 960,
		svgHeight = 150,
		margin = { top: 20, right: 20, bottom: 40, left: 60 },
		chartWidth  = svgWidth  - margin.left - margin.right,
		chartHeight = svgHeight - margin.top  - margin.bottom;

	var x = d3.time.scale().range([0, chartWidth])
			.domain([dateFirst, dateLast]),
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

	addAxesAndLegendCFive(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
	drawPathsCFive(svg, data, x, y);
	startTransitions(svg, chartWidth, chartHeight, rectClip, x);
}

var parseDate  = d3.time.format('%Y-%m-%d').parse;

d3.csv('data/Tokyo-predict-90.csv', function (rawData) {

	var dataSix = rawData.map(function (d) {
		return {
			date: parseDate(d.Date),
			dat: Math.round(d.Forecast),
		};
	});
	
	dateLast = d3.extent(dataSix, function(d) {
		return d.date;
	})[1];

	d3.csv('data/Tokyo-original.csv', function (rawData) {

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

	makeChartCFive(dataOne);
	makeChartCFive(dataSix);
	makeChartCFive(dataTwo);
	makeChartCFive(dataThree);
	makeChartCFive(dataFour);
	makeChartCFive(dataFive);
	});
});

};