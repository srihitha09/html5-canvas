window.onload = loadStartPage();

var seconds = 60;
var countdownTimer = 0;
var ani;

//Loads the start page and hides canvas
function loadStartPage(){
    populateStorage();
    document.getElementById("gamePage").style.display= "none";
    document.getElementById("transButton").onclick = function() {loadCanvasLevel()};
} 

function populateStorage() {
  localStorage.setItem('score', '0');
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
        seconds = 60;
        loadTransitional();
    } else {
        seconds--;
    }
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
    var currLevel = localStorage.getItem('level');
    loadStartPage();
    document.getElementById("startPage").style.display= "block";
    document.getElementById("title").innerHTML="Level # " + currLevel + "";
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
           document.getElementById("transButton").onclick = function() {
            
            loadStartPage()};
    }
    }
    
}

function loadCanvasLevel(){
    
    var currLevel = localStorage.getItem('level');
    if (currLevel == '1'){
        loadCanvas();
    }
    else{
        loadCanvas();
    }
    
}

function loadFinishPage(){

}


//Loads the canvas and hides start page
function loadCanvas() { 
    updateTimer();
    document.getElementById("startPage").style.display= "none";
    document.getElementById("gamePage").style.display= "block";
    document.getElementById("level").innerHTML = "Level " + localStorage.getItem('level');
    document.getElementById("levelScore").innerHTML = "Score:  " + localStorage.getItem('score');
    var c = document.getElementById("main");
    c.width = '1000';
    c.height = '640';
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier
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
        color = 0;
    }
    else{
        if (Math.floor((Math.random()*100)+1) <= 75){
            color = 1;
        }
        else {
            color = 2;
        }
    }

    
    // create the new object
    var blackhole = {
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
        var shapes = new Array(star,moon);


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
        
            spawnedBlackHoles.splice(i, 1);
            //clear the black hole from the canvas when it's clicked on
            ctx.clearRect(left, top, right, bottom);
         
        }
    }
    return currentHole;
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
