let canvas = undefined;

let resetCanvas = () => {
  let width = window.innerWidth;
  let height = window.innerHeight - 50;
  canvas = document.getElementById("my-canvas");
  canvas.width = width;
  canvas.height = height;

  // fill the canvas with white
  drawRectangle("white", 0, 0, canvas.width, canvas.height);
};

window.addEventListener("load", () => {
  resetCanvas();

  document.getElementById("clear-btn").addEventListener("click", () => {
    resetCanvas();
  });


  document.getElementById("random-btn").addEventListener("click", () => {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let width = Math.random() * 100;
    let height = Math.random() * 100;
    drawRectangle(color, x, y, width, height);
  });

  var pressTimer, longClick;

  function mouseUpCheck() {
    clearTimeout(pressTimer);
    window.removeEventListener('mouseup', mouseUpCheck);   
  }
  
  document.getElementById("random-btn").addEventListener('mousedown', function(){
    window.addEventListener('mouseup', mouseUpCheck);
    pressTimer = window.setTimeout(function() { longClick = true; alert('long click'); },2000);
  });
  
  document.getElementById("random-btn").addEventListener('click', function() {
    if (longClick) {
      event.stopPropagation();
      event.preventDefault();
      longClick = false;
      return;
    }
  
    alert('Please click to change color and shape');
  });

});

let drawRectangle = (color, x, y, width, height) => {
  if (canvas === undefined) {
    throw new Error("Uh-oh, you tried to use drawRectangle before the page loaded. Be sure to only call this from an event handler or timeout.");
  }
  let drawingObject = canvas.getContext("2d");
  drawingObject.fillStyle = color;
  drawingObject.fillRect(Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height));
};


