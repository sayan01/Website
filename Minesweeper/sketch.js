/*jshint esversion: 6 */
var grid;
var grid_size;
var canvas_size;
var sc;
var gameOver;
function setup() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    canvas_size = 800;
    createCanvas(canvas_size , canvas_size);
    grid_size = 10;
    isgameOver = false;
    grid = [[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2],[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2]];
    sc = canvas_size / grid_size;
    setgrid();

    //reset button
    button = createButton('reset',5);
    button.position(300, 800);
    button.size(170,100);
    button.style('font-size','300%');
    button.mouseReleased(function(){
        setgrid();
        loop();
    });

}

function draw() {
    background(51);
    display();
}

function setgrid(){
    for(i = 0; i< grid_size;i++){
        for(j = 0;j<grid_size;j++){
                grid[i][j] = -2;
        }
    }
    for(i = 0; i < grid_size * random(1, 3) ; i++ ){
        x = floor(random(0, grid_size));
        y = floor(random(0, grid_size));
        if(grid[x][y] != -2){
            i--; continue;
        }
        grid[x][y] = -1;
    }
}
//function to display the grid
function display(){
    for(i = 0;i<grid_size;i++){
        for(j=0;j<grid_size;j++){
            push();
            translate(i*sc ,j*sc );
            stroke(250);
            strokeWeight(3);
            rectMode(CENTER);
            if(grid[i][j]  < 0 && grid[i][j] !== -5){
                fill(65,51,60);
                rect(sc/2, sc/2, sc-10, sc-10, 15, 15, 15, 15);
            }
            else if(grid[i][j] >= 0 ) {
                fill(200);
                rect(sc/2, sc/2, sc-10, sc-10, 15, 15, 15, 15);
                fill(25);
                textSize(32);
                textFont('Helvetica');
                textAlign(CENTER, CENTER);
                text(grid[i][j]+"", sc/2, sc/2);
            }
            else {                     // if ( grid[i][j] === -5 )
                fill(220,50,50);
                rect(sc/2, sc/2, sc-10, sc-10, 15, 15, 15, 15);
            }
            pop();
        }
    }
}
// Function to perform actions based on user input
function mouseClicked(){
    event.preventDefault();
    mx = mouseX;
    my = mouseY;

    if(mx>canvas_size || my > canvas_size){return;}
    
    x = floor(mx / sc);
    y = floor(my / sc);

    if (mouseButton === RIGHT) {
         console.log("Right");
    }

    if(grid[x][y] === -2){
        grid[x][y] = findValue(x,y) ;
    }
    if(grid[x][y] === -1){
        grid[x][y] = -5;
        gameOver();
    }
}
//function to stop game after game over
function gameOver(){
    for(var i = 0; i < grid_size; i++){
        for(var j = 0; j < grid_size; j++){
            if(grid[i][j] === -1)
                grid[i][j] = -5;
        }
    }
    noLoop();
}
//function to calculate values of helper boxes
function findValue(x,y){
    var c = 0;
    for(var i = x-1; i <= x+1 && i < grid_size; i++){
        if(i<0) continue;
        for(var j = y-1; j <= y+1 && j < grid_size; j++){
            if(j<0) continue;
            if(grid[i][j] == -1 || grid[i][j] == -5 ) c++;
        }
    }
    return c;
}

// 0 : not bomb and no adjacent bomb (opened) (white)
// 1-9 : not bomb, but N adjacent bombs (opened) (N written on white)
// -1 : unopened bomb
// -2 : unopend not bomb
// -5 : opened bomb