var bg=0;
var c = 1;
var ang=0;
var noo = 0;
var r = 10;
var di = true;
var dh = false;
var du = false;
var heart = [];
var img = null;
var iy=-100;
var ux = 200;
var ri = false;
var im = 0;
var pd = null;
var drawtext = false;
function setup() {
	createCanvas(720, 720);
	colorMode(HSB);
}

function draw() {
	translate(width/2, height/4);
	if(frameCount%5===0){
		if(bg == 5)c = -1;
		if(bg == 0)c = 1;
		bg+= c ;
	}
	colorMode(HSL,100,100,100);
	background(0,100,85+bg);
	// x	=	16sin^3(t)
	// y	=	13cos(t)-5cos(2t)-2cos(3t)-cos(4t).

	if(di){
		formI();
	}
	if(dh){
		formHeart();
	}
	if(du){
		formU();
	}
	if(ri){
		drawImage();
		if(img !=null){
			imageMode(CENTER);
			image(img, -25, 0);
		}
	}
	drawHeart();

	if(drawtext){
		drawText();
	}

}
function formHeart(){
	if(ang<TWO_PI){
		var t = ang;
		var x = 16 * sin(t) * sin(t) * sin(t);
		var y = -13 * cos(t) + 5 * cos(2*t) + 2 * cos(3*t) + cos (4*t);
		temp = p5.Vector.mult(createVector(x, y),r);
		heart.push(createVector(temp.x - 40, temp.y));
		ang+= radians(map(r,10,1,1,10));
	}
	else if (noo<8){
		noo++;
		ang = 0;
		r--;
	}else{
		drawtext = true;
	}
}
function drawHeart(){

	for(var points of heart){
		colorMode(HSL,100,100,100);
		stroke(0,100,70);
		strokeWeight(10);
		var p = points;
		point(p.x,p.y);
	}

}

function formI(){
	if(iy>120){
		di = false;
		du = true; 
		return;
	}
	heart.push(createVector(-300,iy));
	iy++;
}

function formU(){
	if(ux-200>100){
		du = false; 
		ri = true;
		return;
	}
	lx = map(ux,200,300,-2,2);
	ly = lx*lx*lx*lx;
	uy = map(ly,0,16,150,-100);
	heart.push(createVector(ux,uy));

	ux++;
}
var locations = ['assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/+.png','assets/x.png','assets/23.png'];
var timedelay = 700;
function drawImage(){
	if(pd == null){
		pd = new Date();
		return;
	}
	if(new Date()-pd < timedelay){
		return;
	}
	if(im > locations.length-1){
		dh = true;
		img = null;
		return;
	}
	img = loadImage(locations[im]);
	pd = new Date();
	im++; timedelay*=0.75;
	if(im == locations.length) timedelay = 2500;
}

function drawText(){
	colorMode(HSL,100,100,100);
	textAlign(CENTER, CENTER);
	strokeWeight(3);
	stroke(0,100,70);
	noFill();
	textSize(32);
	text("Sayan ♥ Shreosi\nforever", 0, 300);
}