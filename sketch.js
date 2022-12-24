let table, table_setting2;
var star_array = [];
var img_width, img_height;
var f;
var star_length, star_dist;
var table_r, table_setting_r;
var star_size_lower, star_size_upper;

let bg;
var ran_center_x, ran_center_y;
let sel_sound, sel_music;
var choice_sound, choice_music;

var bgm_audio = [];
var bgm_img = [];
var bgm_name = [];
var bgm_now_name;
var bgm_now_i;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function preload() {
	soundFormats("wav", "mp3");
	// load table
	table = loadTable("start.csv", "csv");
	table_setting2 = loadTable("setting2.csv", "csv");
	bg = loadImage("bg/bg.jpg");
}

function add_bgm() {
	for (var i = 0; i < table_setting2.getRowCount(); i++) {
		bgm_name.push(table_setting2.getString(i, 0));
		bgm_audio.push(loadSound("music/" + table_setting2.getString(i, 0)));
		bgm_img.push(table_setting2.getString(i, 1));
	}
	bgm_now_name = table_setting2.getString(0, 0);
	bgm_now_i = 1;
	choice_sound = "chicken";
	choice_music = "Canon_in_d";
}

function setup() {
	// get all bgm
	add_bgm();

	// frame rate
	frameRate(30);

	// table_iteration
	table_r = 1;
	table_setting_r = 0;

	// random center
	ran_center_x = windowWidth / 3;
	ran_center_y = windowHeight / 3;

	//background
	createCanvas(windowWidth, windowHeight);
	noFill();
	stroke(255, 45);
	radius = width;
	background(0);

	// select box
	textSize(40);
	sel_sound = createSelect();
	sel_sound.position(20, 20);
	sel_sound.size(100, 40);
	sel_sound.option("chicken");
	sel_sound.option("pika");
	sel_sound.option("teacher");
	sel_sound.option("yee");
	sel_sound.changed(mySelectEvent1);

	sel_music = createSelect();
	sel_music.position(140, 20);
	sel_music.size(100, 40);
	sel_music.option("Canon_in_d");
	sel_music.option("Elise");
	sel_music.option("Star");
	sel_music.option("Mariage");
	sel_music.option("JingleBell");
	sel_music.changed(mySelectEvent2);
}

function draw_star() {
	if (table_r < table.getRowCount()) {
		if (table_r == 0) {
			// get img_width and img_height of meme
			img_width = int(table.getString(0, 0));
			img_height = int(table.getString(0, 1));
			print(img_width, img_height);

			// set star size
			if (img_width >= img_height) {
				star_length = img_width;
			} else {
				star_length = img_height;
			}

			star_size_upper = star_length * 0.015;
			star_size_lower = star_length * 0.007;
			star_dist = star_length * 0.00005;

			table_r++;
		}
		//get star coordinate
		row_set = int(table.getString(table_r, 0));
		col_set = int(table.getString(table_r, 1));
		table_r++;
	} else {
		table_r = 0;
	}

	// center coordinate
	row_set += ran_center_y;
	col_set += ran_center_x;

	// random star parameter
	star_size = random(star_size_lower, star_size_upper);
	var star = {
		r: int(random(255, 255)),
		g: int(random(255, 255)),
		b: int(random(255, 255)),
		full: 255,

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

		//delete
		noStroke();
		fill(0);
		quad(
			other.a_upx,
			other.a_upy - sin(other.t) * f,
			other.a_rightx + sin(other.t) * f,
			other.a_righty,
			other.a_downx,
			other.a_downy,
			other.a_leftx - sin(other.t) * f,
			other.a_lefty + sin(other.t) * f
		);
		quad(
			other.b_upx,
			other.b_upy - sin(other.t) * f,
			other.b_rightx + sin(other.t) * f,
			other.b_righty,
			other.b_downx,
			other.b_downy + sin(other.t) * f,
			other.b_leftx - sin(other.t) * f,
			other.b_lefty
		);

		// redraw stars already exist
		f = 1.5;
		other.t += 0.03;
		noStroke();
		fill(255, 255, 255, other.full);
		quad(
			other.a_upx,
			other.a_upy - sin(other.t) * f,
			other.a_rightx + sin(other.t) * f,
			other.a_righty,
			other.a_downx,
			other.a_downy,
			other.a_leftx - sin(other.t) * f,
			other.a_lefty + sin(other.t) * f
		);
		quad(
			other.b_upx,
			other.b_upy - sin(other.t) * f,
			other.b_rightx + sin(other.t) * f,
			other.b_righty,
			other.b_downx,
			other.b_downy + sin(other.t) * f,
			other.b_leftx - sin(other.t) * f,
			other.b_lefty
		);
	}

	// if no overlap, draw a new star
	if (!overlapping) {
		star_array.push(star);
		noStroke();
		fill(star.r, star.g, star.b, star.full);
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
}

radius = 0;
r = 0;
g = 137;
b = 108;

function draw_background() {
	var center_x, center_y, noiseFactor, x, y;
	center_x = mouseX;
	center_y = mouseY;
	stroke(r, g, b, 30);
	noFill();
	beginShape();
	TOTAL_DEGREES = getRandomInt(361);

	for (var i = 0, _pj_a = TOTAL_DEGREES; i < _pj_a; i += 1) {
		noiseFactor = noise(i * 0.02, Number.parseFloat(frameCount) / 140);
		x = center_x + radius * cos(radians(i)) * noiseFactor;
		y = center_y + radius * sin(radians(i)) * noiseFactor;
		r = random(0, 120);
		g = random(137, 200);
		b = random(50, 166);
		stroke(r, g, b, 30);
		noFill();
		curveVertex(x, y);
	}

	endShape();
	radius -= 1;

	if (radius === -600) {
		radius += 1200;
	}
}

function draw() {
	// update background

	draw_background();

	// draw star
	for (var i = 0; i < 10; i++) {
		draw_star();
	}
}

function mySelectEvent1() {
	choice_sound = sel_sound.value();
	bgm_now_name = choice_sound + "_" + choice_music + ".wav";
	print("bgm changed to " + bgm_now_name);

	let index = 0;
	for (var i = 0; i < bgm_name.length; i++) {
		if (bgm_name[i] === bgm_now_name) {
			index = i;
			break;
		}
	}

	// open new csv
	var filename_in = bgm_img[index];
	print("meme:" + filename_in);

	// load table
	table = loadTable("csv/" + filename_in + ".csv", "csv");

	//reset
	star_array = [];

	// new random center
	ran_center_x = random(5, windowWidth / 3);
	ran_center_y = random(5, windowHeight / 3);
	table_r = 0;

	// stop music
	if (bgm_audio[bgm_now_i].isPlaying()) {
		bgm_audio[bgm_now_i].stop();
	}

	bgm_now_i = index;
	bgm_audio[index].play();

	background(0);
}

function mySelectEvent2() {
	choice_music = sel_music.value();
	bgm_now_name = choice_sound + "_" + choice_music + ".wav";
	print("bgm changed to " + bgm_now_name);

	let index = 0;
	for (var i = 0; i < bgm_name.length; i++) {
		if (bgm_name[i] === bgm_now_name) {
			index = i;
			print("break");
			break;
		}
	}

	// open new csv
	var filename_in = bgm_img[index];
	print("meme:" + filename_in);

	// load table
	table = loadTable("csv/" + filename_in + ".csv", "csv");
	print("reading" + "csv/" + filename_in);

	//reset
	star_array = [];

	// new random center
	ran_center_x = random(5, windowWidth / 3);
	ran_center_y = random(5, windowHeight / 3);
	table_r = 0;

	// stop music
	if (bgm_audio[bgm_now_i].isPlaying()) {
		bgm_audio[bgm_now_i].stop();
	}

	bgm_now_i = index;
	bgm_audio[index].play();

	background(0);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
