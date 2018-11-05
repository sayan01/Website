var gapmax= 150;
var gapmin = gapmax/2;
function Pipe(){
	this.x=width;
	this.speed=2;
	this.topend = random(width/6,5*width/6);
	this. gap = random (gapmin,gapmax);


	this.top=0;
	this.bottom= this.topend+this.gap;
	this.bottomheight = height - this.bottom;


	this.show = function(){
		// rectMode(CENTER);
		fill(255);
		stroke(255);
		strokeWeight(10);
		//top
		line(this.x,this.top,     this.x,this.topend);
		//bottom
		line(this.x,this.bottom,     this.x, height );
	};
	var color = -1;var hue;
	this.flash = function(){
		if(frameCount%7==0){

			hue = floor(map (color,-1,1,0,255) );
			color*=-1;
			
		}
		stroke(255,hue,hue);
		//top
		line(this.x,this.top,     this.x,this.topend);
		//bottom
		line(this.x,this.bottom,     this.x, height );
	};
	this.update = function(){
		this.x -= this.speed;
	};
	this.pass = false;
	this.passed = function(bird){
		if ( bird.x > this.x && !this.pass){
			this.pass = true;
			return true;
		}
		else return false;
	};

  	this.touch = function(bird){
		var bx = bird.x +bird.r;
		var bybottom = bird.y + bird.r;
		var bytop = bird.y - bird.r;
		var px = this.x - 5;
		var pxend = this.x+10;
		var ptopend = this.topend;
		var pbottom = this.bottom;
		if( (  bytop <= ptopend  ||  bybottom>=pbottom )    &&   (bx >= px && bx <= pxend)){
			this.flash();
			return true;
		}
		else return false;

	};
}