var drawMode = '';

function modifyPoint() {
  reset ? model.changePoint(0, 0, 0) : model.changePoint(0, 0.2, 0.2);
  reset = !reset;

  renderProgram(gl, shaderProgram, modelArr)
}

function drawLine(e) {
  line = !line;
  // model.changeType(line ? 'LINE' : 'SQUARE')
  document.getElementById('glcanvas').classList.add('cursor-draw');
  selectDrawTool = true;
  drawMode = 'line';

  renderProgram(gl, shaderProgram, modelArr)
}

function drawRectangle(e) {
  line = !line;
  model.changeType(line ? 'LINE' : 'SQUARE')
  printMousePos(e);

  renderProgram(gl, shaderProgram, modelArr)
}

function drawPolygon(e) {
  line = !line;
  model.changeType(line ? 'LINE' : 'SQUARE')
  printMousePos(e);

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

/**
 * @param {string} hex hex-color starting with '#'
 * @returns {Array<numbers>}
 */
function hexToColorArray(hex) {
  const numsOnly = hex.slice(1);
  const components = numsOnly.match(/.{1,2}/g).map(c => parseInt(c, 16));
  return components.map(c => c/255);
}

/**
 * Change the color of an object.
 * TODO: For now will change the color of all objects.
 * @param {Event} e 
 */
function colorChangeListener(e) {
  const newColor = hexToColorArray(e.target.value);
  modelArr.forEach(model => model.changeColor(newColor));

  renderProgram(gl, shaderProgram, modelArr);
}

/**
 * @param {Event} e an event on the canvas HTML object
* @returns {{x: number, y: number}} 
 */
function getGlCoordinates(e) {
  const canvas = e.target;
  const rect = canvas.getBoundingClientRect();
  const scale = {
    x: canvas.width / rect.width,
    y: canvas.height / rect.height,
  }
  const pos = {
    x: (e.clientX - rect.left) * scale.x,
    y: (e.clientY - rect.top) * scale.y,
  }
  const coor = {
    x : pos.x / gl.canvas.width  *  2 - 1,
    y : pos.y / gl.canvas.height * -2 + 1,
  };

  return coor;
}
