/*jshint esversion: 6 */
class Point{
    
    constructor(x,y,colour){
        this.x = x;
        this.y = y;
        this.colour = colour;
    }

    display(){
        stroke(this.colour);
        strokeWeight(2);
       point(this.x,this.y);
    }

}