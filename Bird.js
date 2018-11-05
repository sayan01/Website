function Bird()
{
	this.x= width/2;
	this.y=height/2;
	this.vel = 0;
	this.gravity = 0.8;
	this.lift = -15;
	this.multiplier=0.9;
	this.r = 10;

	this.show = function()
	{
		var degree = map (this.vel,-15,15,-PI/2,PI/2);
		//beak
		push();
		translate(this.x,this.y);
		rotate(degree);
		fill(255);
		noStroke();
		// fill(255,99,71);
		triangle (7,-5,7,5,15,-3);
		
		//body
		// fill(225,225,20);
		ellipse(0,0,this.r*2,this.r*2);
		//eyes
		// fill(255);
		// ellipse(3,-3,4,4);
		// fill(0);
		// ellipse(3,-3,2,2);



		pop();


	};

	this.update = function(){
		this.vel += this. gravity;
		this.vel *= this.multiplier;
		this.y += this.vel;

		if (this.y>height){
			this.y = height;
			gameOver();
		}
		if(this.y<0){
			this.y = 0;
			gameOver();
		}


	};
	
	this.jump = function(){
			this.vel += this.lift;
			// console.log("Jumping");

	};
}
