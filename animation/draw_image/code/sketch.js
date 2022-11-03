let table;
let x, y;

function preload() {
	table = loadTable("../../input.csv", "csv", "header");
}

function setup() {
	createCanvas(1000, 1000);
	background(255, 255, 255);
	x = 0;
	y = 0;
	r = 0;
	c = 0;
}

function draw() {
	// update background
	// background(255, 255, 255);

	// Draw a circle
	noStroke();
	fill(10, 0, 10);
	ellipse(x, y, 2, 2);

	// draw circle with x,y in csv
	if (r < table.getRowCount() && c < table.getColumnCount()) {
		y = int(table.getString(r, c));
		x = int(table.getString(r, c + 1));
	}

	r++;
}

function mousePressed() {
	// click to reset
	//background(0, 0, 0);
}
