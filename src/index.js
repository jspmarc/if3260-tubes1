var gl;
var programInfo;

var reset = false;
var line = false;

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
  Model.addPoint(1.0, 1.0, [1.0, 1.0, 1.0, 1.0]);
  Model.addPoint(-1.0, 1.0, [1.0, 0.0, 0.0, 1.0]);
  Model.addPoint(1.0, -1.0, [0.0, 1.0, 0.0, 1.0]);
  Model.addPoint(-1.0, -1.0, [0.0, 0.0, 1.0, 1.0]);

  // Render model
  Model.render(gl, programInfo, false);
}

function modifyPoint() {
  reset ? Model.changePoint(0, 1, 1) : Model.changePoint(0, 2, 2, null);

  reset = !reset;

  Model.render(gl, programInfo, line);
}

function rotateModel() {
  Model.rotate(Math.PI/4);

  Model.render(gl, programInfo, line);
}

function drawLine() {
  line = !line;

  Model.render(gl, programInfo, line);
}
