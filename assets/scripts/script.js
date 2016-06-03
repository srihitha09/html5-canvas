window.onload = function() {
    
    var c = document.getElementById("main");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier
    
    //draw();
    
    animate();
    
} // window.onload

var star = {
	x:50,
	y:50,
	nPoints:6,
	outerRadius:25,
	innerRadius:10,

	vx:10,
	vy:5,

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

function animate(){
	    var width = 1000;
    var height = 640;
	window.ctx.clearRect(0,0,width,height);
    star.draw();
    
    //star.x+=10;
    star.x+=star.vx;
    star.y+=star.vy;
    /*if (star.x > ctx.width){
    	star.x = ctx.width;
    }*/
    
    if (star.x + star.vx > width || star.x + star.vx < 0){
        star.vx = -star.vx;
    }
    if (star.y + star.vy > height || star.y + star.vy < 0){
        star.vy = -star.vy;
    }
    // This will run animate() every 33 ms
    setTimeout(animate, 33);

}
