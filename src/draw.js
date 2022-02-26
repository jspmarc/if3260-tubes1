/**
 * Create a buffer for the model.
 * @param {WebGLRenderingContextBase} gl
 * @returns 
 */
function initBuffer(gl, positions, colors, indices) { 
    
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  return {
    coorBuffer: positionBuffer,
    colorBuffer: colorBuffer,
    indicesBuffer: indexBuffer,
  };
}

/**
 * Bind coordinates and indices buffer
 * @param {WebGLRenderingContextBase} gl 
 * @param {WebGLProgram} shaderProgram 
 * @param {WebGLBuffer} coorBuffer 
 * @param {WebGLBuffer} indicesBuffer 
 */
function bindCoordinatesBuffer(gl, shaderProgram, coorBuffer, indicesBuffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, coorBuffer);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
  
  coorAttrib = gl.getAttribLocation(shaderProgram, 'coordinates')
  gl.vertexAttribPointer(coorAttrib, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coorAttrib);
}

/**
 * Bind color buffer
 * @param {WebGLRenderingContextBase} gl 
 * @param {WebGLProgram} shaderProgram 
 * @param {WebGLBuffer} colorBuffer 
 */
function bindColorBuffer(gl, shaderProgram, colorBuffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  colorAttrib = gl.getAttribLocation(shaderProgram, 'color')
  gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorAttrib);
}

/**
 * Render all models
 * @param {WebGLRenderingContextBase} gl 
 * @param {WebGLProgram} shaderProgram 
 * @param {Array<Model>} models 
 */
function renderProgram(gl, shaderProgram, models) {
  var coordinatesArr = [];
  var colorsArr = [];

  gl.useProgram(shaderProgram);
  
  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  models.forEach(model => {
    var { coordinates, colors } = model.getModelInfo();

    coordinatesArr = coordinatesArr.concat(coordinates);
    colorsArr = colorsArr.concat(colors);
  });

  var { coorBuffer, colorBuffer, indicesBuffer } = initBuffer(gl, coordinatesArr, colorsArr, indices);

  bindCoordinatesBuffer(gl, shaderProgram, coorBuffer, indicesBuffer);
  
  bindColorBuffer(gl, shaderProgram, colorBuffer);
  
  // Tell WebGL to use our program when drawing
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var offset = 0;
  models.forEach(model => {
    var totalIndices = model.getTotalIndices();
    let drawMode;

    if (model.getModelType() === 'LINE') {
      drawMode = gl.LINE_LOOP;
    } else if (model.getModelType() === 'POLYGON') {
      drawMode = gl.TRIANGLE_FAN;
    } else {
      drawMode = gl.TRIANGLE_STRIP;
    }
    gl.drawElements(drawMode, totalIndices, gl.UNSIGNED_SHORT, 2 * offset);

    offset += totalIndices;
  });
}