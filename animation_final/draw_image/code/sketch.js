let table, table2;
var star_array = [];
var shooting_array = [];
var width, height;
var f;
var star_length, star_dist, num_shooting;
var table_r, table_c;
var star_size_lower, star_size_upper;

function preload() {
	// load table
	table = loadTable("../../input.csv", "csv", "header");
	table2 = loadTable("../../setting.csv", "csv", "header");
}

function setup() {
	// frame rate
	frameRate(30);

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

	star_size_upper = star_length * 0.013;
	star_size_lower = star_length * 0.007;

	// set star distance
	star_dist = star_length * 0.0005;

	// table_iteration
	table_r = 0;
	table_c = 0;

	// number of shooting star
	num_shooting = 2;
}

function draw_spot() {
	/* normal star */
	// get the coordinate from table
	if (table_r < table.getRowCount() && table_c < table.getColumnCount()) {
		row_set = int(table.getString(table_r, table_c));
		col_set = int(table.getString(table_r, table_c + 1));
	}
	table_r++;

	// random star parameter
	star_size = random(star_size_lower, star_size_upper);
	var star = {
		r: int(random(255, 255)),
		g: int(random(255, 255)),
		b: int(random(255, 255)),
		full: int(random(50, 255)),

		t: random(TAU),
		size: star_size,
		row: row_set,
		col: col_set,

		a_upx: col_set,
		a_upy: row_set - star_size,
		a_rightx: col_set + star_size / 5,
		a_righty: row_set,
		a_downx: col_set,
		a_downy: row_set + star_size,
		a_leftx: col_set - star_size / 5,
		a_lefty: row_set,

		b_upx: col_set,
		b_upy: row_set - star_size / 5,
		b_rightx: col_set + star_size,
		b_righty: row_set,
		b_downx: col_set,
		b_downy: row_set + star_size / 5,
		b_leftx: col_set - star_size,
		b_lefty: row_set,
	};

	// avoid overlap
	var overlapping = false;
	for (var j = 0; j < star_array.length; j++) {
		var other = star_array[j];
		var d = dist(row_set, col_set, other.row, other.col);
		if (d < star_size + other.size + star_dist) {
			overlapping = true;
		}

		// redraw stars
		f1 = 0.7;
		f2 = 3;
		other.t += 0.1;
		noStroke();
		fill(other.r, other.g, other.b, other.full);
		drawingContext.shadowBlur = 5 + sin(other.t) * f2;
		drawingContext.shadowColor = "rgba(other.r, other.g, other.b, 0.7)";
		quad(
			other.a_upx,
			other.a_upy - sin(other.t) * f1,
			other.a_rightx + sin(other.t) * f1,
			other.a_righty,
			other.a_downx,
			other.a_downy,
			other.a_leftx - sin(other.t) * f1,
			other.a_lefty + sin(other.t) * f1
		);
		quad(
			other.b_upx,
			other.b_upy - sin(other.t) * f1,
			other.b_rightx + sin(other.t) * f1,
			other.b_righty,
			other.b_downx,
			other.b_downy + sin(other.t) * f1,
			other.b_leftx - sin(other.t) * f1,
			other.b_lefty
		);
	}

	// new star
	if (!overlapping) {
		star_array.push(star);
		noStroke();
		fill(star.r, star.g, star.b, star.full);
		drawingContext.shadowBlur = 5;
		drawingContext.shadowColor = "rgba(star.r, star.g, star.b, 0.5)";
		quad(
			star.a_upx,
			star.a_upy,
			star.a_rightx,
			star.a_righty,
			star.a_downx,
			star.a_downy,
			star.a_leftx,
			star.a_lefty
		);
		quad(
			star.b_upx,
			star.b_upy,
			star.b_rightx,
			star.b_righty,
			star.b_downx,
			star.b_downy,
			star.b_leftx,
			star.b_lefty
		);
	}

	/* Shooting star */
	var shooting = {
		r: int(random(0, 255)),
		g: int(random(0, 255)),
		b: int(random(0, 255)),
		row: random(0, height / 2),
		col: random(0, width / 2),
		diameter: int(random(star_length * 0.01, star_length * 0.03)),
		full: int(random(0, 120)),
		t: random(TAU),
		dx: 3,
		dy: 4,
	};

	// shooting star
	if (shooting_array.length <= num_shooting) {
		shooting_array.push(shooting);
		noStroke();
		fill(shooting.r, shooting.g, shooting.b, shooting.full);
		drawingContext.shadowBlur = 5;
		drawingContext.shadowColor = "rgba(255, 255, 255, 0.5)";
		ellipse(
			shooting.col,
			shooting.row,
			shooting.diameter,
			shooting.diameter
		);

		// traj
		stroke(255, 255, 255, 10);
		strokeWeight(3);
		line(shooting.col, shooting.row, shooting.col - 50, shooting.row - 50);
	}

	// redraw shooting star
	for (var j = 0; j < shooting_array.length; j++) {
		var other = shooting_array[j];
		other.row += other.dy;
		other.col += other.dx;
		if (other.row >= height - 1 || other.col >= width - 1) {
			other.row = random(0, height);
			other.col = random(0, width);
		}

		// twinkle
		f1 = 0.7;
		f2 = 5;
		other.t += 0.1;
		noStroke();
		fill(other.r, other.g, other.b, other.full);
		drawingContext.shadowBlur = 5 + sin(other.t) * f2;
		drawingContext.shadowColor = "rgba(255, 255, 255, 0.5)";
		var scale = shooting.diameter + sin(shooting.t) * f2;
		ellipse(other.col, other.row, scale, scale);

		// traj
		stroke(255, 255, 255, 10);
		strokeWeight(3);
		line(
			other.col,
			other.row,
			other.col - other.dx * 10,
			other.row - other.dy * 10
		);
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
