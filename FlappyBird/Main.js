var Bird;
var pipes = [];
var gameOverbool = false;
var score = 0;



function setup() {
	createCanvas(225,400);
	background(50,50,100);
	createP("Flappy Bird     by Sayan");
	bird = new Bird();
	pipes[0] = new Pipe();
	noLoop();
}



var count = 0;
var interval = 100;
var string ;


function draw() {
	if((frameCount%interval === 0)&&!gameOverbool)
	{
		pipes.push(new Pipe());
		bird.gravity+=0.03;
		bird.lift-=0.3;

		if(Pipe.gapmax > 50){
			Pipe.gapmax--;
		}
		if(interval > 30){
			interval -= 1;
		}
		if(bird.multiplier<0.97){
			bird.multiplier+=0.002;
		}

	}
	background(0);
	bird.show();
	bird.update();


	//pipes
	for (var i = 0; i < pipes.length; i++) {
		var pipe = pipes[i];
		pipe.show();
		pipe.update();
		if(pipe.passed(bird)){
			score++;
		}

		if(pipe.x<0){
			pipes.splice(i,1);
			i--;
		}
		if(pipe.touch(bird) && !gameOverbool){
			gameOver();
		}
	}




	string = "Score : "+ score;
	len = string.length;
	fill(255);
	stroke(0);
	strokeWeight(1);
	textSize(16);
	text(string , width - (8*len) , 16);


}

function keyPressed(){
	if(!gameOverbool){
		loop();
	}
	if(key === 'R'){
		location.reload();
	}
	 bird.jump();

}
function touchStarted(){
	if(!gameOverbool){
		loop();
	}
	bird.jump();
}
function gameOver(){
		gameOverbool = true;
		bird.vel = 0;
		bird.gravity=0;
		bird.lift =0;
		for (var i = 0; i < pipes.length; i++) {
			pipes[i].speed = 0;
		}
		createP("Game Over!");
		createP("Score : "+score);
	}
