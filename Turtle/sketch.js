
var bool = true;
var preX;
var preY;

function dorandom(){
	if(bool) return;
	randX = floor(   map(  floor( noise(turtle.pos.x/100,turtle.pos.y/100,frameCount/100)*2 ),0,1,-1,1  )  );
	randY = floor(   map(  floor( noise(turtle.pos.x/100,turtle.pos.y/100,frameCount/100)*2 ),0,1,-1,1  )  );
	randr = random(0,2);
	turtle.move(randX,randY);
	turtle.stop(floor(randr));
}
var turtle;
var mem;
var memsl;
function setup() {
	createCanvas(800,600);

	mem = 10;
	background(0);
	memsl = createSlider(0,30,10);
	memsl.position(325,150);
	mem = memsl.value();
	turtle = new Turtle();
	preX = turtle.pos.x;
	preY = turtle.pos.y;
}
function draw() {
	mem = memsl.value();

	// background(0);
	turtle.show();
	turtle.update();
	dorandom();
	if(frameCount%6==0){
		background(0,mem);
	}

}
function keyPressed(){

	if(key === ' '){
		bool = !bool;
	}
	if(keyCode ===LEFT_ARROW){
		console.log("left");
		turtle.move(-1,0);
	}
	if(keyCode ===RIGHT_ARROW){
		console.log("right");
		turtle.move(1,0);
	}
	if(keyCode ===UP_ARROW){
		console.log("up");
		turtle.move(0,-1);
	}
	if(keyCode ===DOWN_ARROW){
		console.log("down");
		turtle.move(0,1);
	}
}
function keyReleased(){

	if(keyCode ===LEFT_ARROW || keyCode === RIGHT_ARROW){
		console.log("side stop");
		turtle.stop(0);
	}
	if(keyCode ===DOWN_ARROW || keyCode === UP_ARROW){
		console.log("up down stop");
		turtle.stop(1);
	}
}
