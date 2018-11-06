var ang;
var tree = [];
var start;
var startinglen;
var maxlim;
var newLine;
function setup() {
	sliderangle = createSlider(0,100,15);
	sliderangle.position(20,20);
	
	sliderheight = createSlider(20,300,100);
	sliderheight.position(20,50);

	slidermaxlimit = createSlider(0,15,10);
	slidermaxlimit.position(20,80);

	slidernewSize = createSlider(0,99,75);
	slidernewSize.position(20,110);


	createCanvas(800,600);
	background(51);
		


}
function draw() {
	background(51);
	fill (255);
	noStroke();
	textSize(12);
	text("angle",sliderangle.x + sliderangle.width,20);
	text("height",sliderheight.x + sliderheight.width,50);
	text("maxlimit",slidermaxlimit.x + slidermaxlimit.width,80);
	text("newSize",slidernewSize.x + slidernewSize.width,110);

	ang = map(sliderangle.value(),0,100,0,PI);

	startinglen = sliderheight.value();

	maxlim = slidermaxlimit.value();

	newLine = slidernewSize.value();

	translate(width/2,height);
	drawLine(startinglen,1);

}

function drawLine(length,count){
	//draw line
	// console.log(newAng);
	var weight = floor(  map(length,0,startinglen,1,10)  );
	stroke(255);
	strokeWeight(weight);
	line(0,0,0,-length);
	// call itself
	var newL = length*newLine/100;
	if(count<maxlim){
		translate ( 0, -length);
		push();
		rotate(ang);
		drawLine( newL,count+1 );
		pop();
		push();
		rotate(-ang);
		drawLine( newL,count+1 );
		pop();
	}

}