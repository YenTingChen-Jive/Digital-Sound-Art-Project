let table;
let table2;
var circles = [];
var width, height;
var star_length;
var star_dist;
let table_r, table_c;

function preload() {
	// load table
	table = loadTable("../../input.csv", "csv", "header");
	table2 = loadTable("../../setting.csv", "csv", "header");
}

function setup() {
	// frame rate
	frameRate(20);

	// get width and height of meme
	width = table2.getString(0, 0);
	height = table2.getString(0, 1);

	//background
	createCanvas(width, height);
	background(0, 7, 33);

	// set star size
	if (width >= height) {
		star_length = width;
	} else {
		star_length = height;
	}

	// set star distance
	star_dist = star_length * 0.001;

	// table_iteration
	table_r = 0;
	table_c = 0;
}
function draw_spot() {
	// get the coordinate from table
	if (table_r < table.getRowCount() && table_c < table.getColumnCount()) {
		row_set = int(table.getString(table_r, table_c));
		col_set = int(table.getString(table_r, table_c + 1));
	}
	table_r++;

	// star parameter
	var circle = {
		row: row_set,
		col: col_set,
		diameter: int(random(star_length * 0.005, star_length * 0.01)),
		full: random(150, 255),
		t: random(TAU),
	};

	// check overlap
	var overlapping = false;
	for (var j = 0; j < circles.length; j++) {
		var other = circles[j];
		var d = dist(circle.row, circle.col, other.row, other.col);
		if (d < circle.diameter + other.diameter + star_dist) {
			overlapping = true;
		}

		// redraw (twinkle effect)
		other.t += 0.1;
		noStroke();
		fill(255, 255, 255, circle.full);
		drawingContext.shadowBlur = 5;
		drawingContext.shadowColor = "rgba(255, 255, 255, 0.5)";
		var scale = other.diameter + sin(other.t) * 2;
		ellipse(other.col, other.row, scale, scale);
	}

	// new star
	if (!overlapping) {
		circles.push(circle);
		noStroke();
		fill(255, 255, 255, circle.full);
		drawingContext.shadowBlur = 5;
		drawingContext.shadowColor = "rgba(255, 255, 255, 0.5)";
		var scale = circle.diameter + sin(circle.t) * 2;
		ellipse(circle.col, circle.row, scale, scale);
	}
}
function draw() {
	// update background
	background(0, 7, 33);

	// draw
	for (var i = 0; i < 5; i++) {
		draw_spot();
	}
}
