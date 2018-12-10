/*jshint esversion: 6 */
var points;
var no_of_points;
var dot;
var pink;
var dot_color;
var perc;
var canvas_Size;
var slider_n;
var slider_p;
function setup() {
     canvas_Size = min(windowHeight,windowWidth);

    no_of_points = 3;
    perc = 0.5;
    colorMode(HSB);
    pink = color(350,200,150);
    createCanvas(canvas_Size,canvas_Size);

    
    
    background(51,0,10);
    points = [];
    for(var i = 0; i< no_of_points;i++){
        var ang = TWO_PI/no_of_points*i;
        points.push(   new Point( width/2 * cos(ang) , height/2 * sin(ang), pink )   );
    }
    translate(width/2, height/2);
    dot =  new Point(0,0 , color(255) )  ;

    for( i = 0;i < no_of_points;i++){
        points[i].display();
    }
}

function draw() {
    
    translate(width/2, height/2);
    for(var j = 0; j< 100;j++){
        dot.display();
        move();
    }
    
}

function move(){
    var ch = floor(random(0,no_of_points));
    dot.x = lerp(dot.x, points[ch].x, perc);
    dot.y = lerp(dot.y, points[ch].y, perc);
    val = map(ch, 0, no_of_points, 0, 255);
    dot.colour = color(val,50,100);
}