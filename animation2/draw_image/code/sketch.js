let table;
let table2;
var circles = [];
var width, height;

function preload() {
	table = loadTable("../../input.csv", "csv", "header");
	table2 = loadTable("../../setting.csv", "csv", "header");
}

function setup() {
	createCanvas(500, 500);
	background(0, 0, 0);
	width = table2.getString(0, 0);
	height = table2.getString(0, 1);
	print(width);
	print(height);
}
function draw_spot() {
	// random circle parameter
	var circle = {
		row: int(random(0, height - 1)),
		col: int(random(0, width - 1)),
		diameter: random(8, 13),
		r: random(0, 255),
		g: 0,
		b: random(0, 255),
		full: random(0, 150),
	};

	var overlapping = false;
	for (var j = 0; j < circles.length; j++) {
		var other = circles[j];
		var d = dist(circle.row, circle.col, other.row, other.col);
		if (d < circle.diameter + other.diameter - 13) {
			overlapping = true;
		}
	}

	if (!overlapping) {
		if (int(table.getString(circle.row, circle.col)) != 0) {
			circles.push(circle);
			noStroke();
			fill(circle.r, circle.g, circle.b, circle.full);
			ellipse(circle.col, circle.row, circle.diameter, circle.diameter);
		}
	}
	if (int(table.getString(circle.row, circle.col)) == 0) {
		circles.push(circle);
		noStroke();
		fill(255, 255, 255, 255);
		//ellipse(circle.col, circle.row, 8, 8);
		rect(circle.col, circle.row, 6, 6);
	}
}
function draw() {
	// update background
	// background(255, 255, 255);
	draw_spot();
	draw_spot();
	draw_spot();
	draw_spot();
	draw_spot();
	draw_spot();
	draw_spot();
	draw_spot();
	draw_spot();
	draw_spot();
	draw_spot();
}

function mousePressed() {
	// click to reset
	//background(0, 0, 0);
}
