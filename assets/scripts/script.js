window.onload = loadStartPage();

var currScore = 200;
var seconds = 59;
var countdownTimer = 0;
var ani;
var c = document.getElementById("main");
c.width = '1000';
c.height = '640';
window.ctx = c.getContext("2d"); 
// spawn a new object every 1000ms
var spawnRate = 1500;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var spawnedBlackHoles = [];

var newArr;

var blackholes = [];
// save the starting time (used to calc elapsed time)
var startTime = Date.now();
var highScores = [];
var gamePaused = false;

//Loads the start page and hides canvas
function loadStartPage(){
    populateStorage();
    document.getElementById("gamePage").style.display= "none";
    //document.getElementById("score").innerHTML = "High Score:" + localStorage.getItem('highScore');
    document.getElementById("transButton").onclick = function() {loadCanvasLevel()};
} 

function populateStorage() {

    localStorage.setItem('highScore', '0');
    localStorage.setItem('score', '200');
    localStorage.setItem('level', '1');
}



function updateTimer(){
    countdownTimer = setInterval('timer()', 100);
}

//timer for each level
function timer(){
    //var remainingSeconds = seconds;
    if (seconds < 10) {
        seconds = "0" + seconds;  
    }
    document.getElementById('timer').innerHTML = seconds + " seconds";
    if (seconds == 0) {
        clearInterval(countdownTimer);
        document.getElementById('timer').innerHTML =  "60 seconds";
        seconds = 59;
        loadTransitional();
    } else {
        seconds--;
    }
}


function pauseTimer(){
    var text = document.getElementById("pause").innerHTML;
    if(text === "Pause"){
        document.getElementById("pause").innerHTML = "Resume";
        clearInterval(countdownTimer);
    }
    else{
        document.getElementById("pause").innerHTML = "Pause";
        countdownTimer = setInterval('timer()', 1000);
    }
    pauseGame();
    
}

//loads transitional page
function loadTransitional(){
    var currLevel = localStorage.getItem('level');
    loadStartPage();
    document.getElementById("startPage").style.display= "block";
    document.getElementById("title").innerHTML="Level # " + currLevel + "";
    document.getElementById("score").innerHTML= "Score: " + currScore;
    if (currLevel == '1'){
        document.getElementById("transButton").innerHTML = "Next";
        document.getElementById("transButton").onclick = function() {
        localStorage.setItem('level', '2');
        loadCanvasLevel()};
    }
    else{
        document.getElementById("transButton").innerHTML = "Finish";
        document.getElementById("transButton").onclick = function() {
           document.getElementById("title").innerHTML= "Black Hole Mystery";
           document.getElementById("transButton").innerHTML = "Start";
           highscoreUpdate();
           document.getElementById("transButton").onclick = function() {
            localStorage.setItem('level', '1');
            currScore = 200;
            clearCanvas();
            loadCanvasLevel()};
    }
    }
    
}
function highscoreUpdate(){
    highScores.push(currScore);
    highScores.sort(function(a, b){return b-a});
    var update = " ";
    for (var i =0; i < highScores.length; i++){
        update +=   highScores[i] + "; "
    }
    document.getElementById("score").innerHTML= "High Score: " + update;


}

function loadCanvasLevel(){
    
    var currLevel = localStorage.getItem('level');
    if (currLevel == '1'){
        loadCanvas();
    }
    else{
        localStorage.setItem('score', String(currScore));
        clearCanvas();
        loadCanvas();
        
    }
    
}

function loadFinishPage(){

}


//Loads the canvas and hides start page
function loadCanvas() {
    var currLevel = localStorage.getItem('level');
   
    
    //clearCanvas();
    updateTimer();
    document.getElementById("startPage").style.display= "none";
    document.getElementById("gamePage").style.display= "block";
    document.getElementById("level").innerHTML = "Level " + localStorage.getItem('level');
    document.getElementById("levelScore").innerHTML = "Score:  " + localStorage.getItem('score');
    
    // Dealing with a global context is easier
    //addShapes();
    loadImg();  
}




/* 
* Objects
*/

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

var sunShape = {
    x:500,
    y:300,
    vx:3,
    vy:5,

    draw: function(){
         ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI*2, true);
        ctx.fillStyle = '#ff9900';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x-17, this.y);
        ctx.lineTo(this.x-30, this.y);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x+17, this.y);
        ctx.lineTo(this.x+30, this.y);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y+16);
        ctx.lineTo(this.x, this.y+30);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x-10, this.y-13);
        ctx.lineTo(this.x-20,this.y-25);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x+10, this.y-13);
        ctx.lineTo(this.x+20, this.y-25);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x-10, this.y+13);
        ctx.lineTo(this.x-20, this.y+25);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x+10, this.y+13);
        ctx.lineTo(this.x+20, this.y+25);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y-16);
        ctx.lineTo(this.x, this.y-30);
        ctx.stroke();
        ctx.closePath();
        
    }
};

var planet = {
    x:400,
    y:300,
    vx:1,
    vy:4,

    draw: function(){
       ctx.beginPath();
        ctx.arc(this.x, this.y, 17, 0, Math.PI*2, true);
        ctx.fillStyle = '#00e600';
        ctx.fill();
        
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 12, 0, Math.PI*2, true);
        ctx.fillStyle = '#009900';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        
        ctx.beginPath();
        ctx.moveTo(this.x-17, this.y);
        ctx.lineTo(this.x-30, this.y);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x+17, this.y);
        ctx.lineTo(this.x+30, this.y);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y+16);
        ctx.lineTo(this.x, this.y+30);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y-16);
        ctx.lineTo(this.x, this.y-30);
        ctx.stroke();
        ctx.closePath();
        
}
};

var ufo = {
    
    x:95,
    y:100,
    radius:15,
    vx:1,
    vy:2,

    draw: function(){
    
    // draw circle which will be stretched into an oval
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#000066';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();  
    ctx.moveTo(this.x+10, this.y+10);
    ctx.lineTo(this.x+12, this.y+20);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.moveTo(this.x-10, this.y+12);
    ctx.lineTo(this.x-12, this.y+20);
    ctx.stroke();
    ctx.closePath();
  
    ctx.beginPath();
    ctx.arc(this.x, this.y-13, this.radius/2, 0, Math.PI, true);

    ctx.strokeStyle = '#000066';

    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';

    // restore to original state
    //ctx.restore();
}
};

var rocket = {
    
    x:95,
    y:500,
    vx:1,
    vy:2,

    draw: function(){
    
     ctx.rect(this.x,this.y,20,35);
     ctx.fillStyle = '#cc0000'
     ctx.fill();
        ctx.stroke();
    
    ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+10, this.y-20);
    ctx.stroke();
    ctx.closePath();
   
    ctx.beginPath();
    ctx.moveTo(this.x+21, this.y);
        ctx.lineTo(this.x+10, this.y-20);
        ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();  
    ctx.moveTo(this.x+16, this.y+35);
    ctx.lineTo(this.x+25, this.y+40);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();  
    ctx.moveTo(this.x+3, this.y+35);
    ctx.lineTo(this.x-5, this.y+40);
    ctx.stroke();
    ctx.closePath();
}
};





function addShapes(){


}

function loadImg(){
    
    var black = new Image();
    black.src = 'assets/images/black.svg';
    var blue = new Image();
    blue.src = 'assets/images/blue.svg';
    var purple = new Image();
    purple.src = 'assets/images/purple.svg';

    blackholes.push(black);
    blackholes.push(blue);
    blackholes.push(purple);

    animate();
}

function spawnRandomObject() {

    /*determine frequency of black hole colors
        in the blackholes array, black = 0, blue = 1, purple = 2
        we want black holes to appear 75% of the time*/
    var color;
    if (Math.floor((Math.random()*100)+1) <= 75){
        color = 1;
    }
    else{
        if (Math.floor((Math.random()*100)+1) <= 75){
            color = 2;
        }
        else {
            color = 0;
        }
    }

    
    // create the new object
    var blackhole = {
        color: color,
        // set x randomly 
        x: Math.random() * (1000 - 50),
        
        y: Math.random() * (640 - 50),
        // give random image
        image: blackholes[color]
    }
    if (isOverlapping(blackhole, spawnedBlackHoles)!=true){
        // add the new black hole to the array of spawned holes
        spawnedBlackHoles.push(blackhole);
        updateSpawned(spawnedBlackHoles);
             
    }

}
ctx.drawImage(black, 100, 100);
function updateSpawned(spawnedBlackHoles){
    newArr = spawnedBlackHoles;
}

function getSpawned(){
    return newArr;
    for (i=0; i<newArr.length; i++){
        alert(newArr[i]);
    }
}

function animate(){
    window.ctx.fillStyle = "black";
    window.ctx.fillRect(0,0,width,height);
        var shapes = new Array(star,moon, sunShape, planet, ufo, rocket);


    var width = 1000;
    var height = 640;

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    ctx.clearRect(0,0,width,height);

    for (var i = 0; i < spawnedBlackHoles.length; i++) {
        var currentHole = spawnedBlackHoles[i];
        
        //draw the black hole
        ctx.drawImage(currentHole.image, currentHole.x, currentHole.y);
        hitTest(spawnedBlackHoles);
        //var c = document.getElementById("main");

        //clearRect(spawnedBlackHoles[i].x, spawnedBlackHoles[i].y, 50+spawnedBlackHoles[i].x, 50+spawnedBlackHoles[i].y);
        //alert("hit "+ e.clientX + " " + e.clientY);


    }

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

    // This will run animate() every 33 ms
    clearInterval(ani);
    ani = setTimeout(animate, 33);

};

/*check if black holes are overlapping with each other */

function isOverlapping(currentHole, spawnedBlackHoles){
    for (var i=0; i < spawnedBlackHoles.length; i++){
        if (currentHole.x + 50 > spawnedBlackHoles[i].x 
        && currentHole.x < spawnedBlackHoles[i].x + 50
        && currentHole.y + 50 > spawnedBlackHoles[i].y
        && currentHole.y < spawnedBlackHoles[i].y + 50)
        {
            return true;
        }
    }
}

function collides(spawnedBlackHoles, x, y) {
    var isCollision = false;
    for (var i = 0; i<spawnedBlackHoles.length; i++) {
        var left = spawnedBlackHoles[i].x, right = spawnedBlackHoles[i].x+50;
        var top = spawnedBlackHoles[i].y, bottom = spawnedBlackHoles[i].y+50;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = true;
        
            updatepoints(spawnedBlackHoles[i]);
            spawnedBlackHoles.splice(i, 1);
            //clear the black hole from the canvas when it's clicked on
            ctx.clearRect(left, top, right, bottom);
            
         
        }
    }
    return currentHole;
}

function updatepoints(blackholeClicked){
    if (blackholeClicked.color == 1){
        currScore += 5;
        
    }
    else if (blackholeClicked.color == 2){
        currScore += 10;
        
    }
    else{
        currScore += 20;
    }

    localStorage.setItem('score', String(currScore));
    document.getElementById("levelScore").innerHTML = "Score:  " + localStorage.getItem('score');


}

var hasListener = false;

/*checks if the black hole is clicked on */
function hitTest(currentHole){
    if (hasListener!=true){
        var canvas = document.getElementById('main');
        
        canvas.addEventListener('click', function(e){
            var mousePos = getMousePos(canvas, e);

        //call collides function
        var currentHole = collides(spawnedBlackHoles, mousePos.x, mousePos.y);
        
        //remove black hole
        /*for (i=0; i<spawnedBlackHoles.length; i++){
            if (spawnedBlackHoles[i]==currentHole){
                spawnedBlackHoles.splice(i, 1);
                return false;
            }
        }*/
        
        });
        
    }
    hasListener = true;

}
/* get the mouse position relative to the canvas */
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
function pauseGame(){
    if (!gamePaused) {
    ani = clearTimeout(ani);
    gamePaused = true;
  } else if (gamePaused) {
    ani = setTimeout(animate, 33);
    gamePaused = false;
  }
}

function clearCanvas() {
    blackholes.length = 0;
    newArr.length = 0;
    ctx.clearRect(0, 0, 1000, 640);
};
