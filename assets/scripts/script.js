window.onload = loadStartPage();

//Loads the start page and hides canvas
function loadStartPage(){
    document.getElementById("gamePage").style.display= "none";
    document.getElementById("transButton").onclick = function() {loadCanvasLevel()};
} 

var countdownTimer;
var seconds;
//timer for each level
function timer(){
    var remainingSeconds = seconds;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;  
    }
    document.getElementById('timer').innerHTML = remainingSeconds + " seconds";
    if (seconds == 0) {
        clearInterval(countdownTimer);
        loadTransitional();
    } else {
        seconds--;
    }
}

function updateTimer(){
    seconds = 60;
    countdownTimer = setInterval('timer()', 1000);
}

function pauseTimer(){
    debugger;
    var text = document.getElementById("pause").innerHTML;
    if(text === "Pause"){
        document.getElementById("pause").innerHTML = "Resume";
        clearInterval(countdownTimer);
    }
    else{
        document.getElementById("pause").innerHTML = "Pause";
        countdownTimer = setInterval('timer()', 1000);
    }
    
}

//loads transitional page
function loadTransitional(){
    var level = "1";
    loadStartPage();
    document.getElementById("startPage").style.display= "block";
    document.getElementById("title").innerHTML="Level # " + level + "";
    document.getElementById("transButton").innerHTML = "Next";
    document.getElementById("transButton").onclick = function() {loadCanvasLevel()};
}

function loadCanvasLevel(){
    
    //Logic to check level and load appropriately
    //if level == 1
    loadCanvas();
}

function loadFinishPage(){

}


//Loads the canvas and hides start page
function loadCanvas() { 
    updateTimer();
    document.getElementById("startPage").style.display= "none";
    document.getElementById("gamePage").style.display= "block";
    var c = document.getElementById("main");
    c.width = '1000';
    c.height = '640';
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier
    //addShapes();
    animate();  
}


/* 
* Objects
*/

//Moon
var moon = {

    x:95,
    y:100,
    vx:3,
    vy:5,
    draw: function() {
        
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 25, 1.75*Math.PI, Math.PI*0.25, true);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x+7, this.y, 20, 1.68*Math.PI, 0.32*Math.PI, true);
        ctx.stroke();
        ctx.closePath();       
    }

};

//Star
var star = {
	x:50,
	y:50,
	nPoints:6,
	outerRadius:25,
	innerRadius:10,

	vx:5,
	vy:2,

	draw: function(){
		ctx.beginPath();
		    ctx.fillStyle = "blue";    	
        for (var ixVertex = 0; ixVertex <= 2 * 6; ++ixVertex) {
            var angle = ixVertex * Math.PI / 6 - Math.PI / 2;
            var radius = ixVertex % 2 == 0 ? 25 : 10;
            ctx.lineTo(this.x + radius * Math.cos(angle), this.y + radius * Math.sin(angle));
        }
        ctx.fill();
	}
}

function addShapes(){

}

//Animation
function animate(){
    var shapes = new Array(star,moon);
    var width = 1000;
    var height = 640;
	window.ctx.clearRect(0,0,width,height);

    for (var i=0; i < shapes.length; i++){
        var current = shapes[i];
        current.draw();
        current.x+=current.vx;
        current.y+=current.vy;
        if (current.x + current.vx > width || current.x + current.vx < 0){
            current.vx = -current.vx;
        }
        if (current.y + current.vy > height || current.y + current.vy < 0){
            current.vy = -current.vy;
        }
    }
    /*
    star.draw();
    
    //star.x+=10;
    star.x+=star.vx;
    star.y+=star.vy;
    if (star.x > ctx.width){
    	star.x = ctx.width;
    }
    
    if (star.x + star.vx > width || star.x + star.vx < 0){
        star.vx = -star.vx;
    }
    if (star.y + star.vy > height || star.y + star.vy < 0){
        star.vy = -star.vy;
    }*/
    // This will run animate() every 33 ms
    setTimeout(animate, 33);

}


