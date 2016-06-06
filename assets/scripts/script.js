window.onload = function() {
    
    var c = document.getElementById("main");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier
    //addShapes();
    loadImg();
    //window.ctx.fillStyle = "black";
    //window.ctx.fillRect(0,0,width,height);
    //animate();
    
} // window.onload

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
var spawnRate = 1000;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var spawnedBlackHoles = [];

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

    var t;
    // create the new object
    var blackhole = {
        // set this objects type
        type: t,
        // set x randomly 
        x: Math.random() * (1000 - 50),
        
        y: Math.random() * (640 - 50),
        // give random image
        image: blackholes[Math.floor(Math.random()*blackholes.length)]
    }
    if (isOverlapping(blackhole, spawnedBlackHoles)!=true){
        // add the new black hole to the array of spawned holes
        spawnedBlackHoles.push(blackhole);
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
    setTimeout(animate, 33);

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



