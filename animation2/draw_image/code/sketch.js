let table;
let table2;
var circles = [];
var circles_con = [];
var width, height;

function preload() {
	table = loadTable("../../input.csv", "csv", "header");
	table2 = loadTable("../../setting.csv", "csv", "header");
}

function setup() {
	width = table2.getString(0, 0);
	height = table2.getString(0, 1);

	createCanvas(width, height);
	background(0, 0, 0);

	// set star size
	if (width >= height) {
		star_length = width;
	} else {
		star_length = height;
	}

	// set star distance
	star_dist = star_length * 0.001;
}
function draw_spot() {
	// random circle parameter
	var circle = {
		row: int(random(0, height - 1)),
		col: int(random(0, width - 1)),
		diameter: int(random(star_length * 0.01, star_length * 0.02)),
		r: 0,
		g: random(0, 255),
		b: random(0, 255),
		full: random(0, 150),
	};

	// overlap

	var overlapping = false;
	for (var j = 0; j < circles.length; j++) {
		var other = circles[j];
		var d = dist(circle.row, circle.col, other.row, other.col);
		if (d < circle.diameter + other.diameter) {
			overlapping = true;
		}
	}

	var overlapping_con = false;
	for (var j = 0; j < circles_con.length; j++) {
		var other = circles_con[j];
		var d = dist(circle.row, circle.col, other.row, other.col);
		if (d < circle.diameter + other.diameter - 5) {
			overlapping_con = true;
		}
	}

	if (int(table.getString(circle.row, circle.col)) == 0) {
		if (!overlapping) {
			circles.push(circle);
			noStroke();
			fill(0, random(244, 255), random(244, 255), 255);
			ellipse(circle.col, circle.row, circle.diameter, circle.diameter);
		}
	} else {
		if (!overlapping_con) {
			circles_con.push(circle);
			noStroke();
			fill(circle.r, circle.g, circle.b, circle.full);
			ellipse(circle.col, circle.row, circle.diameter, circle.diameter);
		}
	}
}
function draw() {
	// update background
	// background(255, 255, 255);

	for (var i = 0; i < 30; i++) {
		draw_spot();
	}
}

function mousePressed() {
	// click to reset
	//background(0, 0, 0);
}
