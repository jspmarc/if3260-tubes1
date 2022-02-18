var gl;
var shaderProgram;

var reset = false;
var line = false;
var modelArr = [];
const model = new Model();

main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
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

  // Add points to the model
  model.addPoint(0.0, 0.0, [1.0, 1.0, 0.0]);
  model.addPoint(0.0, 1.0, [1.0, 0.0, 0.0]);
  model.addPoint(1.0, 1.0, [0.0, 1.0, 0.0]);
  model.addPoint(1.0, 0.0, [0.0, 0.0, 1.0]);
  modelArr.push(model);

  // Render model
  renderProgram(gl, shaderProgram, modelArr)
}

function modifyPoint() {
  reset ? model.changePoint(0, 0, 0) : model.changePoint(0, 0.2, 0.2);
  reset = !reset;

  renderProgram(gl, shaderProgram, modelArr)
}

function drawLine() {
  line = !line;
  model.changeType(line ? 'LINE' : 'SQUARE')

  renderProgram(gl, shaderProgram, modelArr)
}

function removeAPoint(idx) {
  model.deletePoint(idx);

  renderProgram(gl, shaderProgram, modelArr)
}

function addNewModel() {
  const model2 = new Model();
  
  model2.addPoint(-1, -1, [1.0, 0, 0]);
  model2.addPoint(0, 0, [1.0, 0.0, 0.0]);
  model2.addPoint(0, -1.0, [1.0, 0.0, 0.0]);

  modelArr.push(model2);

  renderProgram(gl, shaderProgram, modelArr);
}
