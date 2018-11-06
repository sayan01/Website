function Turtle(x,y){
this.pos = createVector();
this.r = 2;
this.pos.x = x || random(this.r,width-this.r);
this.pos.y = y || random(this.r,height-this.r);
this.vel = createVector(0,0);
this.show = function(){
	fill(255);
	noStroke();
	ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
};
this.update = function(){

	this.pos.add(this.vel);
	if(this.outOfBounds()){

		var newX = (this.pos.x + width) % width;
		var newY = (this.pos.y + height) % height;

		this.pos.x = (newX);
		this.pos.y = (newY);
	}

};
this.stop = function(k){
	if(k===0){
		this.vel.set(0,this.vel.y);
	}
	if(k===1){
		this.vel.set(this.vel.x,0);
	}
};

this.move = function(x,y){
	this.vel.add(createVector(x*10,10*y));
};
this.outOfBounds = function(){
	var xcor = this.pos.x;
	var ycor = this.pos.y;
	return ( xcor > width || xcor < 0 || ycor > height || ycor < 0);
};
}