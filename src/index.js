var gl;
var shaderProgram;

var reset = false;
var line = false;
var modelArr = [];
var isDrawing = false;
var isShiftHeld = false;

main();

// document.getElementById("glcanvas").addEventListener("click", printMousePos);
document.getElementById("glcanvas").addEventListener("mousedown", startDrawing);
document.getElementById("glcanvas").addEventListener("mousemove", drawing);
document.getElementById("glcanvas").addEventListener("mouseup", finishDrawing);
document.addEventListener('keydown', (e) => isShiftHeld = e.shiftKey);
document.addEventListener('keyup', (e) => isShiftHeld = e.shiftKey);

//
// FUNCTIONS
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
  const coor = getGlCoordinates(event);
  console.log(coor);
}

function startDrawing(e) {
  if (drawMode !== '') {
    isDrawing = true;
    const color = document.getElementById('obj-color-picker').value;

    const model = new Model(drawMode.toUpperCase(), color);
    modelArr.push(model);
    const coor = getGlCoordinates(e);
    switch (drawMode) {
      case 'line':
      case 'square':
      case 'rectangle':
        model.addPoint(coor.x, coor.y);
        break;
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
        break;
      case 'square':
      case 'rectangle':
        while (model.getCoordinates().length > 1) {
          model.popPoint();
        }
        if (!isShiftHeld) {
          model.addPoint(model.getCoordinates()[0][0], coor.y);
          model.addPoint(coor.x, model.getCoordinates()[0][1]);
          model.addPoint(coor.x, coor.y);
        } else {
          const distanceToCursor = Math.max(
            coor.x - model.getCoordinates()[0][0],
            coor.y - model.getCoordinates()[0][1],
          );
          model.addPoint(model.getCoordinates()[0][0], model.getCoordinates()[0][1] - distanceToCursor);
          model.addPoint(model.getCoordinates()[0][0] + distanceToCursor, model.getCoordinates()[0][1]);
          model.addPoint(model.getCoordinates()[0][0] + distanceToCursor, model.getCoordinates()[0][1] - distanceToCursor);
        }
    }
    renderProgram(gl, shaderProgram, modelArr);
  }
}

function finishDrawing(e) {
  if (isDrawing) {
    const model = modelArr[modelArr.length - 1];
    const coor = getGlCoordinates(e);
    switch (drawMode) {
      case 'line':
        while (model.getCoordinates().length >= 2) {
          model.popPoint();
        }
        model.addPoint(coor.x, coor.y);
        break;
      case 'square':
      case 'rectangle':
        while (model.getCoordinates().length > 1) {
          model.popPoint();
        }
        if (!isShiftHeld) {
          model.addPoint(model.getCoordinates()[0][0], coor.y);
          model.addPoint(coor.x, model.getCoordinates()[0][1]);
          model.addPoint(coor.x, coor.y);
        } else {
          const distanceToCursor = Math.max(
            coor.x - model.getCoordinates()[0][0],
            coor.y - model.getCoordinates()[0][1],
          );
          model.addPoint(model.getCoordinates()[0][0], model.getCoordinates()[0][1] - distanceToCursor);
          model.addPoint(model.getCoordinates()[0][0] + distanceToCursor, model.getCoordinates()[0][1]);
          model.addPoint(model.getCoordinates()[0][0] + distanceToCursor, model.getCoordinates()[0][1] - distanceToCursor);
        }
    }

    document.getElementById('glcanvas').classList.remove('cursor-draw');
    drawMode = ''

    renderProgram(gl, shaderProgram, modelArr);

    // add entry to models pane
    const pane = document.querySelector('.right.models-pane');
    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const colorInput = document.createElement('input');
    const colorLabel = document.createElement('label');
    const deleteButton = document.createElement('button');

    li1.innerHTML = `type: ${model.getModelType()}`;
    li2.appendChild(colorLabel);
    li2.appendChild(colorInput);
    li3.appendChild(deleteButton);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    pane.appendChild(ul);

    colorInput.type = 'color';
    colorInput.name = `model-color-${modelArr.length}`
    colorInput.classList.add('model-color');
    colorInput.id = colorInput.name;
    colorInput.value = model.getRawColor();
    colorInput.model = model;
    colorInput.addEventListener('change', e => {
      model.changeColor(e.target.value);
      renderProgram(gl, shaderProgram, modelArr);
    });

    colorLabel.htmlFor = colorInput.name;
    colorLabel.innerHTML = 'color: ';

    deleteButton.innerHTML = 'delete';
    deleteButton.id = `model-delete-${modelArr.length}`
    deleteButton.addEventListener('click', () => {
      pane.removeChild(ul);
      const idx = modelArr.indexOf(model);
      modelArr.splice(idx, 1);
      renderProgram(gl, shaderProgram, modelArr);
    });
  }
  isDrawing = false;
}
