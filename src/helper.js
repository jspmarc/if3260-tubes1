var drawMode = '';

function modifyPoint() {
  reset ? model.changePoint(0, 0, 0) : model.changePoint(0, 0.2, 0.2);
  reset = !reset;

  renderProgram(gl, shaderProgram, modelArr)
}

function drawObject(mode) {
  document.getElementById('glcanvas').classList.add('cursor-draw');
  selectDrawTool = true;
  drawMode = mode;

  renderProgram(gl, shaderProgram, modelArr)
}

function removeAPoint(idx) {
  model.deletePoint(idx);

  renderProgram(gl, shaderProgram, modelArr)
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
 * @param {Event} e an event on the canvas HTML object
* @returns {{x: number, y: number}} 
 */
function getCursorGlCoordinates(e) {
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

/**
 * Draw an input file
 * @param {File} input 
 */
function drawInput(input) {
  resetCanvas();

  let reader = new FileReader();
  reader.onload = function(e) {
    var content = e.target.result;
    var data = JSON.parse(content); // parse json 

    data.forEach(input => {
      const modelObj = new Model(input.type, input.color);
      input.coordinates.forEach(coordinate => {
        modelObj.addPoint(coordinate[0], coordinate[1]);
      })
      modelObj.addToModelsPane();
      modelArr.push(modelObj);
    })
  
    renderProgram(gl, shaderProgram, modelArr)
  }

  reader.readAsText(input);
}

/**
 * Draw STEI Logo using WebGL
 */
function drawSTEILogo() {
  resetCanvas();

  ModelData.forEach(model => {
    const modelObj = new Model();
    model.coordinates.forEach(coordinate => {
      modelObj.addPoint(coordinate[0], coordinate[1]);
    })
    modelObj.changeColor(model.colorRaw);
    modelObj.addToModelsPane();
    modelArr.push(modelObj);
  })

  renderProgram(gl, shaderProgram, modelArr)
}

/**
 * Reset the canvas
 */
function resetCanvas() {
  modelArr = [];

  const pane = document.querySelector('.right.models-pane');
  pane.innerHTML = "";

  renderProgram(gl, shaderProgram, modelArr)
}

function download() {
  if (modelArr.length === 0) return;

  var data = JSON.stringify(modelArr.map(model => model.toObject()))

  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data));
  element.setAttribute('download', "model.json");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
