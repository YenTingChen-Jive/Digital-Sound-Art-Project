let table;
let x, y;
let r, g, b;
let diameter;
function preload() {
	table = loadTable("../../input.csv", "csv", "header");
}

function setup() {
	createCanvas(500, 500);
	background(0, 0, 0);
	x = 0;
	y = 0;
	diameter = 1;
	row = 100;
	col = 100;
	r = 100;
	g = 0;
	b = 100;
	full = 255;
}

function random_color() {
	r = random(0, 255);
	g = random(0, 255);
	b = random(0, 255);
	full = random(0, 122);
}
function random_pos() {
	diameter = random(3, 5);
	row = int(random(0, 149));
	col = int(random(0, 149));
}
function draw_dot() {
	random_color();
	random_pos();
	if (int(table.getString(row, col)) != 0) {
		noStroke();
		fill(r, g, b, full);
		ellipse(col, row, diameter, diameter);
	}
}

function draw() {
	// update background
	// background(255, 255, 255);

	// draw circle with x,y in csv

	draw_dot();
	draw_dot();
	draw_dot();
	draw_dot();
	draw_dot();
	draw_dot();
	draw_dot();
	draw_dot();
	draw_dot();
	draw_dot();
}

function mousePressed() {
	// click to reset
	//background(0, 0, 0);
}
