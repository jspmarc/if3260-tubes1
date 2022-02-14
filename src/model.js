class Model {
  #positions = [];
  #colors = [];
  #rotation = 0;

  constructor() {}

  /**
   * Add a point to the model
   * @param {number} x 
   * @param {number} y 
   * @param {Array<number>} color 
   */
  addPoint(x, y, color) {
    this.#positions.push([x,y]);
    this.#colors.push(color)
  }

  /**
   * Modify a point
   * @param {number} idx  
   * @param {number?} newX  
   * @param {number?} newY 
   * @param {Array<number>?} newColor 
   * @returns 
   */
  changePoint(idx, newX, newY, newColor){
    var [curX, curY] = this.#positions[idx];
    this.#positions[idx] = [newX ?? curX, newY ?? curY];
    this.#colors[idx] = newColor ?? this.#colors[idx];
  }

  /**
   * Rotate the model
   * @param {number} rotation 
   * @returns 
   */
  rotate(rotation) {
    this.#rotation += rotation;
  }

  /**
   * Create a buffer for the model.
   * @param {WebGLRenderingContextBase} gl
   * @returns 
   */
  getBuffer(gl) { 
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat(...this.#positions)), gl.STATIC_DRAW);
  
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat(...this.#colors)), gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
      color: colorBuffer,
    };
  }

  /**
   * Render Model into canvas
   * @param {WebGLRenderingContextBase} gl 
   * @param {Object} programInfo
   * @param {boolean} isLine 
   */
  render(gl, programInfo, isLine){
    drawScene(gl, programInfo, this.getBuffer(gl), isLine, this.#rotation);
  }
}