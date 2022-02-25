var gl;
var shaderProgram;

var reset = false;
var line = false;
var modelArr = [];
var isDrawing = false;

main();

document.getElementById('obj-color-picker').addEventListener('change', colorChangeListener);
document.querySelector('.tools-pane > .line').addEventListener('click', drawLine);

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  // Change here to resize canvas
  canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  gl = canvas.getContext('webgl');

  gl.clearColor(0.95, 0.90, 0.85, 0.9);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);

  // If we don't have a GL context, give up now
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program
  const vsSource = `attribute vec3 coordinates;
    attribute vec3 color;
    varying vec3 vColor;
    void main(void) {
        gl_Position = vec4(coordinates, 1.0);
        vColor = color;
  }`;

  // Fragment shader program
  const fsSource = `precision mediump float;
    varying vec3 vColor;
    void main(void) {
    gl_FragColor = vec4(vColor, 1.);
  }`;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Render model
  renderProgram(gl, shaderProgram, modelArr)
}

function printMousePos(event) {
  console.log("clientX: " + event.clientX + " - clientY: " + event.clientY);
}

function startDrawing(e) {
  if (drawMode !== '') {
    isDrawing = true;
    const color = hexToColorArray(document.getElementById('obj-color-picker').value);

    const model = new Model(drawMode.toUpperCase());
    modelArr.push(model);
    const coor = getGlCoordinates(e);
    switch (drawMode) {
      case 'line':
        model.addPoint(coor.x, coor.y, color);
    }
    renderProgram(gl, shaderProgram, modelArr);
  }
}

function drawing(e) {
  if (isDrawing) {
    const model = modelArr[modelArr.length - 1];
    const coor = getGlCoordinates(e);
    switch (drawMode) {
      case 'line':
        while (model.getCoordinates().length >= 2) {
          model.popPoint();
        }
        model.addPoint(coor.x, coor.y);
    }
    renderProgram(gl, shaderProgram, modelArr);
  }
}

function finishDrawing(e) {
  if (isDrawing) {
    const color = hexToColorArray(document.getElementById('obj-color-picker').value);
    const model = modelArr[modelArr.length - 1];
    const coor = getGlCoordinates(e);
    switch (drawMode) {
      case 'line':
        while (model.getCoordinates().length >= 2) {
          model.popPoint();
        }
        model.addPoint(coor.x, coor.y, color);
    }

    document.getElementById('glcanvas').classList.remove('cursor-draw');
    drawMode = ''

    console.log(model);
    renderProgram(gl, shaderProgram, modelArr);
  }
  isDrawing = false;
}

// document.getElementById("glcanvas").addEventListener("click", printMousePos);
document.getElementById("glcanvas").addEventListener("mousedown", startDrawing);
document.getElementById("glcanvas").addEventListener("mousemove", drawing);
document.getElementById("glcanvas").addEventListener("mouseup", finishDrawing);

