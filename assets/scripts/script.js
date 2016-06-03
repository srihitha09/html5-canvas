window.onload = function() {
    
    var c = document.getElementById("main");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier
    var height = 1000;
    var width = 640;
    
    moon.draw();
    
    
} // window.onload



// Let's create a draw function for the canvas
var moon = {

    x:95,
    y:50,
    draw: function() {
        
        // Draw here
        /*ctx.beginPath();
        ctx.arc(this.x, this.y, 25, 1.5*Math.PI, 0.5*Math.PI, true);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x+9, this.y, 25, 1.4*Math.PI, 0.6*Math.PI, true);
        ctx.stroke();*/
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 25, 1.75*Math.PI, Math.PI*0.25, true);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x+7, this.y, 20, 1.68*Math.PI, 0.32*Math.PI, true);
        ctx.stroke();
        ctx.closePath();
        
        /*var grd=ctx.createLinearGradient(0,0,170,0);
        grd.addColorStop(0,"black");
        grd.addColorStop(1,"white");
        ctx.fillStyle=grd;
        ctx.fill();*/
        

        
    }

};

