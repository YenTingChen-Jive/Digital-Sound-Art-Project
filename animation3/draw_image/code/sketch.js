let table;
let table2;
var star_array = [];
var star_array_contribute = [];
var width, height;
var f;
var star_length;
var star_dist;
function preload() {
	table = loadTable("../../input.csv", "csv", "header");
	table2 = loadTable("../../setting.csv", "csv", "header");
}

function setup() {
	// get width and height
	width = table2.getString(0, 0);
	height = table2.getString(0, 1);

	//background
	createCanvas(width, height);
	background(0, 7, 55);

	// set star size
	if ((width) => height) {
		star_length = width;
	} else {
		star_length = height;
	}

	star_dist = 2;
}
function draw_spot() {
	// refresh bg

	// random star parameter
	var star_pos = {
		row: int(random(0, height - 1)),
		col: int(random(0, width - 1)),
		size: int(random(star_length * 0.005, star_length * 0.01)),
	};

	var star = {
		r: 255,
		g: 255,
		b: 255,
		full: int(random(120, 255)),

		up_x1: star_pos.col,
		up_y1: star_pos.row - star_pos.size,
		up_x2: star_pos.col - star_pos.size / 10,
		up_y2: star_pos.row,
		up_x3: star_pos.col + star_pos.size / 10,
		up_y3: star_pos.row,

		down_x1: star_pos.col,
		down_y1: star_pos.row + star_pos.size,
		down_x2: star_pos.col - star_pos.size / 10,
		down_y2: star_pos.row,
		down_x3: star_pos.col + star_pos.size / 10,
		down_y3: star_pos.row,

		left_x1: star_pos.col,
		left_y1: star_pos.row - star_pos.size / 10,
		left_x2: star_pos.col - star_pos.size,
		left_y2: star_pos.row,
		left_x3: star_pos.col,
		left_y3: star_pos.row + star_pos.size / 10,

		right_x1: star_pos.col,
		right_y1: star_pos.row - star_pos.size / 10,
		right_x2: star_pos.col + star_pos.size,
		right_y2: star_pos.row,
		right_x3: star_pos.col,
		right_y3: star_pos.row + star_pos.size / 10,
	};

	//twinkle
	var overlapping = false;
	for (var j = 0; j < star_array.length; j++) {
		var other = star_array[j];
		var other_contri = star_array_contribute[j];
		var d = dist(star_pos.row, star_pos.col, other.row, other.col);
		if (d < star_pos.size + other.size + star_dist) {
			overlapping = true;
		}

		// redraw
		f = 2;
		t = random(TAU);
		noStroke();
		fill(255, 255, 255, star.full);
		drawingContext.shadowBlur = random(5, 15);
		drawingContext.shadowColor = "white";
		triangle(
			other_contri.up_x1,
			other_contri.up_y1 - sin(t) * f,
			other_contri.up_x2 - sin(t) * f,
			other_contri.up_y2,
			other_contri.up_x3 + sin(t) * f,
			other_contri.up_y3
		);
		triangle(
			other_contri.down_x1,
			other_contri.down_y1 + sin(t) * f,
			other_contri.down_x2 - sin(t) * f,
			other_contri.down_y2,
			other_contri.down_x3 + sin(t) * f,
			other_contri.down_y3
		);
		triangle(
			other_contri.right_x1,
			other_contri.right_y1 - sin(t) * f,
			other_contri.right_x2 - sin(t) * f,
			other_contri.right_y2,
			other_contri.right_x3,
			other_contri.right_y3 + sin(t) * f
		);
		triangle(
			other_contri.left_x1,
			other_contri.left_y1 - sin(t) * f,
			other_contri.left_x2 + sin(t) * f,
			other_contri.left_y2,
			other_contri.left_x3,
			other_contri.left_y3 + sin(t) * f
		);
	}

	// new star
	if (!overlapping) {
		if (int(table.getString(star_pos.row, star_pos.col)) == 0) {
			star_array.push(star_pos);
			star_array_contribute.push(star);
			noStroke();
			fill(255, 255, 255, star.full);
			drawingContext.shadowBlur = random(5, 15);
			drawingContext.shadowColor = "white";
			triangle(
				star.up_x1,
				star.up_y1,
				star.up_x2,
				star.up_y2,
				star.up_x3,
				star.up_y3
			);
			triangle(
				star.down_x1,
				star.down_y1,
				star.down_x2,
				star.down_y2,
				star.down_x3,
				star.down_y3
			);
			triangle(
				star.right_x1,
				star.right_y1,
				star.right_x2,
				star.right_y2,
				star.right_x3,
				star.right_y3
			);
			triangle(
				star.left_x1,
				star.left_y1,
				star.left_x2,
				star.left_y2,
				star.left_x3,
				star.left_y3
			);
		}
	}
}
function draw() {
	// update background
	background(0, 7, 55);
	for (var i = 0; i < 7; i++) {
		draw_spot();
	}
}

function mousePressed() {
	// click to reset
	//background(0, 0, 0);
}
