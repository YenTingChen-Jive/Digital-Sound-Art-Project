let table, table2;
var star_array = [];
var shooting_array = [];
var img_width, img_height;
var f;
var star_length, star_dist, num_shooting;
var table_r, table2_r;
var star_size_lower, star_size_upper;
var bgm = [];
var bgm_current;
let bg;
var ran_center_x, ran_center_y;
var amp;

function preload() {
  // load table
  table = loadTable("csv/yee2.csv", "csv");
  table2 = loadTable("setting.csv", "csv");

  bgm.push(loadSound("music/1.mp3"));
  bgm.push(loadSound("music/2.mp3"));
  bgm.push(loadSound("music/3.mp3"));
  bgm.push(loadSound("music/4.mp3"));

  bg = loadImage("bg/bg.jpg");
}

function setup() {
  // play music
  bgm[0].play();

  // frame rate
  frameRate(25);

  // table_iteration
  table_r = 0;
  table2_r = 0;

  //background
  createCanvas(windowWidth, windowHeight);
  background(bg);

  // number of shooting star
  num_shooting = 5;
  bgm_current = 0;

  // random center
  ran_center_x = random(100, 500);
  ran_center_y = random(100, 500);

  // amplitude
  amp = new p5.Amplitude();
}

function draw_spot() {
  if (table_r < table.getRowCount()) {
    if (table_r == 0) {
      print(table_r);
      /* reset new */
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

      star_size_upper = star_length * 0.01;
      star_size_lower = star_length * 0.005;
      star_dist = star_length * 0.00005;

      /* reset new */
      table_r++;
    }
    row_set = int(table.getString(table_r, 0));
    col_set = int(table.getString(table_r, 1));
  }
  table_r++;

  //center
  row_set += ran_center_y;
  col_set += ran_center_y;

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

    angle: random(0, 0.02),

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
  // volume map to all star
  let vol = amp.getLevel() * 1000;
  let vol_color = map(vol, 0, 30, 100, 255);

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

      fill(255, 255, 255, other.full);


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
    drawingContext.shadowColor = "rgba(star.r, star.g, star.b, 0.7)";

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
    r: 255, // int(random(0, 255))
    g: 255,
    b: 255,
    row: random(0, windowHeight / 2),
    col: random(0, windowWidth),
    diameter: int(random(star_length * 0.005, star_length * 0.01)),
    full: int(random(60, 100)),
    t: random(TAU),
    dx: 3,
    dy: 4,
  };

  // shooting star
  if (shooting_array.length <= num_shooting) {
    shooting_array.push(shooting);
    noStroke();
    fill(shooting.r, shooting.g, shooting.b, shooting.full);
    drawingContext.shadowBlur = 2;
    drawingContext.shadowColor = "rgba(255, 255, 255, 0.5)";
    //ellipse(shooting.col, shooting.row, shooting.diameter, shooting.diameter);

    // traj
    stroke(255, 255, 255, 10);
    strokeWeight(3);
    //line(shooting.col, shooting.row, shooting.col - 50, shooting.row - 50);
  }

  // redraw shooting star
  for (var j = 0; j < shooting_array.length; j++) {
    var other = shooting_array[j];
    other.row += other.dy;
    other.col += other.dx;
    if (other.row >= windowHeight - 1 || other.col >= windowWidth - 1) {
      other.row = random(0, img_height / 2);
      other.col = random(0, img_width);
    }

    // twinkle
    f1 = 0.7;
    f2 = 1.5;
    other.t += 0.1;
    noStroke();
    fill(other.r, other.g, other.b, other.full);
    drawingContext.shadowBlur = 2 + sin(other.t) * f2;
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
  background(bg);

  // draw
  for (var i = 0; i < 5; i++) {
    draw_spot();
  }
}

function mousePressed() {
  // get next image name
  if (table2_r + 1 < table2.getRowCount()) {
    table2_r += 1;
  } else {
    table2_r = 0;
  }

  // play music
  if (bgm[bgm_current].isPlaying()) {
    // stop prev music
    bgm[bgm_current].stop();

    // change new music
    var sound_in = table2.getString(table2_r, 1);
    print("sound: " + sound_in);
    bgm_current = int(sound_in) - 1;

    // play new bgm
    bgm[bgm_current].play();
  } else {
    bgm[0].play();
    bgm_current = 0;
  }

  // open new csv
  var filename_in = table2.getString(table2_r, 0);
  print("meme:" + filename_in);

  // load table
  table = loadTable("csv/" + filename_in + ".csv", "csv");

  //reset
  background(0, 7, 33);
  star_array = [];
  shooting_array = [];

  // new random center
  ran_center_x = random(100, windowWidth / 2);
  ran_center_y = random(100, windowHeight / 2);

  // prevent default
  return false;
}

function mouseReleased() {
  table_r = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
