var arr,scale,size;
var player1turn;
var gameover;
var count;
var winner;
function setup() {
    size = 600;
    player1turn = true;
    gameover = false;
    count = 0;

    scale = size/3;
    createCanvas(size,size);

    arr = [1,2,3,4,5,6,7,8,9];
}

function draw() {
    background(51);
    for(i = 0;i < 9; i++){
        fill(51);
        strokeWeight(3);
        stroke(255);
        push();
        translate(((i%3)*scale),(floor((i/3))*scale));
        rect(0,0,scale,scale);
        if(arr[i] == 0){
            ellipse(scale/2, scale/2, scale/2, scale/2);
        }
        else if(arr[i] == -1){
            line(scale/4, scale/4, 3 * (scale/4),3 * (scale/4));
            line(3 * (scale/4), (scale/4), (scale/4), 3 * (scale/4));
        }
        pop();
    }
    if(gameover){
        //Draw the line
        x1 = (winner[0]%3)*scale + scale/2;
        y1 = (floor(winner[0]/3))*scale + scale/2;
        x2 = (winner[1]%3)*scale + scale/2;
        y2 = (floor(winner[1]/3))*scale + scale/2;
        strokeWeight(20);
        line(x1, y1, x2, y2);
    }
}

function mouseReleased(){
    if(gameover){   return; }
    mx = mouseX;
    my = mouseY;
    if(mx>size || my>size ){   return; }
    x = floor(mx/scale);
    y = floor(my/scale);
    ind = (y*3) + x;
    arr[ind] = (player1turn)?-1:0;
    player1turn = !player1turn;
    checkwon();
}

function checkwon(){
    if(count === 9) {
        gameover= true;
    }
	for( i = 0;i < 3;i++){
		if(arr[i] === (arr[i+3]) && arr[i] === (arr[i+6])){
            gameover = true;
            winner = [i,i+6];
		}
	}
		
		
	for( i =0;i<9;i+=3){
		if(arr[i] === (arr[i+1]) && arr[i] === (arr[i+2])){
            gameover = true;
            winner = [i,i+2];
		}
	}
		
	for( i = 0, b = 4; i < 3; i += 2, b -= 2){
		if(arr[i] === (arr[i+b]) && arr[i] === (arr[i+b+b])){
            gameover = true;
            winner = [i,i+b+b];
		}
	}
}