window.onload = function() {
    
    var c = document.getElementById("main");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier
    
    //draw();
    
    animate();
    
} // window.onload