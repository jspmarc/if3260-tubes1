var gl;
var programInfo;

var reset = false;
var line = false;
const model = new Model();

main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program
  const fsSource = `
    varying lowp vec4 vColor;
    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVertexColor and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // Add points to the model
  model.addPoint(1.0, 1.0, [1.0, 1.0, 1.0, 1.0]);
  model.addPoint(-1.0, 1.0, [1.0, 0.0, 0.0, 1.0]);
  model.addPoint(1.0, -1.0, [0.0, 1.0, 0.0, 1.0]);
  model.addPoint(-1.0, -1.0, [0.0, 0.0, 1.0, 1.0]);

  // Render model
  model.render(gl, programInfo, false);
}

function modifyPoint() {
  reset ? model.changePoint(0, 1, 1) : model.changePoint(0, 2, 2, null);
  reset = !reset;

  model.render(gl, programInfo, line);
}

function rotateModel() {
  model.rotate(Math.PI/4);

  model.render(gl, programInfo, line);
}

function drawLine() {
  line = !line;

  model.render(gl, programInfo, line);
}
