var gl;
var shaderProgram;

var reset = false;
var line = false;
var modelArr = [];
var isDrawing = false;
var isEditing = false;
var isShiftHeld = false;
var canvasRatio = 0;

main();

document
  .getElementById("glcanvas")
  .addEventListener("click", handleCanvasClick);
document.getElementById("glcanvas").addEventListener("mousedown", startDrawing);
document.getElementById("glcanvas").addEventListener("mousemove", drawing);
document.getElementById("glcanvas").addEventListener("mouseup", finishDrawing);
document.addEventListener("keydown", (e) => (isShiftHeld = e.shiftKey));
document.addEventListener("keyup", (e) => (isShiftHeld = e.shiftKey));
document
  .getElementById("vertex-count-picker")
  .addEventListener("change", (e) => {
    if (isNaN(+e.target.value) || +e.target.value <= 2) e.target.value = 5;
  });

//
// FUNCTIONS
//
function main() {
  const canvas = document.querySelector("#glcanvas");
  // Change here to resize canvar
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  canvasRatio = canvas.clientWidth / canvas.clientHeight;
  gl = canvas.getContext("webgl");

  gl.clearColor(0.95, 0.9, 0.85, 0.9);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);

  // If we don't have a GL context, give up now
  if (!gl) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
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
  renderProgram(gl, shaderProgram, modelArr);
}

function startDrawing(e) {
  if (drawMode !== "" && drawMode.toLowerCase() !== "polygon") {
    isDrawing = true;
    const color = document.getElementById("obj-color-picker").value;

    const model = new Model(drawMode.toUpperCase(), color);
    modelArr.push(model);
    const coor = getCursorGlCoordinates(e);
    switch (drawMode) {
      case "line":
      case "square":
      case "rectangle":
        model.addPoint(coor.x, coor.y);
        break;
    }
    renderProgram(gl, shaderProgram, modelArr);
  }
}

function drawing(e) {
  if (isDrawing && drawMode.toLowerCase() !== "polygon") {
    const model = modelArr[modelArr.length - 1];
    const coor = getCursorGlCoordinates(e);
    while (model.getCoordinates().length > 1) {
      model.popPoint();
    }
    switch (drawMode) {
      case "line":
      case "polygon":
        model.addPoint(coor.x, coor.y);
        break;
      case "square":
      case "rectangle":
        if (!isShiftHeld) {
          model.addPoint(model.getCoordinates()[0][0], coor.y);
          model.addPoint(coor.x, model.getCoordinates()[0][1]);
          model.addPoint(coor.x, coor.y);
        } else {
          const distanceToCursor = Math.max(
            coor.x - model.getCoordinates()[0][0],
            coor.y - model.getCoordinates()[0][1]
          );
          const delta = {
            x: distanceToCursor,
            y: distanceToCursor * canvasRatio,
          };
          model.addPoint(
            model.getCoordinates()[0][0],
            model.getCoordinates()[0][1] - delta.y
          );
          model.addPoint(
            model.getCoordinates()[0][0] + delta.x,
            model.getCoordinates()[0][1]
          );
          model.addPoint(
            model.getCoordinates()[0][0] + delta.x,
            model.getCoordinates()[0][1] - delta.y
          );
        }
        break;
    }
    renderProgram(gl, shaderProgram, modelArr);
  } else if (isDrawing && drawMode.toLowerCase() === "polygon") {
    const model = modelArr[modelArr.length - 1];
    const coor = getCursorGlCoordinates(e);
    if (model.getCoordinates().length > 1) {
      model.popPoint();
    }
    model.addPoint(coor.x, coor.y);
    renderProgram(gl, shaderProgram, modelArr);
  }
}

function finishDrawing(e) {
  if (isDrawing && drawMode.toLowerCase() !== "polygon") {
    const model = modelArr[modelArr.length - 1];
    const coor = getCursorGlCoordinates(e);
    while (model.getCoordinates().length > 1) {
      model.popPoint();
    }
    switch (drawMode) {
      case "line":
        model.addPoint(coor.x, coor.y);
        break;
      case "square":
      case "rectangle":
        if (!isShiftHeld) {
          model.addPoint(model.getCoordinates()[0][0], coor.y);
          model.addPoint(coor.x, model.getCoordinates()[0][1]);
          model.addPoint(coor.x, coor.y);
        } else {
          const distanceToCursor = Math.max(
            coor.x - model.getCoordinates()[0][0],
            coor.y - model.getCoordinates()[0][1]
          );
          const delta = {
            x: distanceToCursor,
            y: distanceToCursor * canvasRatio,
          };
          model.addPoint(
            model.getCoordinates()[0][0],
            model.getCoordinates()[0][1] - delta.y
          );
          model.addPoint(
            model.getCoordinates()[0][0] + delta.x,
            model.getCoordinates()[0][1]
          );
          model.addPoint(
            model.getCoordinates()[0][0] + delta.x,
            model.getCoordinates()[0][1] - delta.y
          );
        }
        break;
    }

    document.getElementById("glcanvas").classList.remove("cursor-draw");
    drawMode = "";
    renderProgram(gl, shaderProgram, modelArr);
    model.addToModelsPane();
    isDrawing = false;
  }
}

function handleCanvasClick(event) {
  if (isDrawing || drawMode === "polygon") {
    let model;
    if (!isDrawing) {
      // first time
      const color = document.getElementById("obj-color-picker").value;
      model = new Model("LINE", color);
      modelArr.push(model);
    } else {
      model = modelArr[modelArr.length - 1];
    }
    const vertexCountPicker = document.getElementById("vertex-count-picker");
    const remainingVertices = +vertexCountPicker.value;
    const coor = getCursorGlCoordinates(event);

    model.addPoint(coor.x, coor.y);

    if (remainingVertices === 1) {
      isDrawing = false;
      drawMode = "";
      document.getElementById("glcanvas").classList.remove("cursor-draw");
      vertexCountPicker.value = 5;
      model.changeType("POLYGON");
      model.addToModelsPane();
    } else {
      isDrawing = true;
      vertexCountPicker.value = remainingVertices - 1;
    }
    renderProgram(gl, shaderProgram, modelArr);
  }
}

document.getElementById("file-input-tool").onchange = function (e) {
  drawInput(document.getElementById("file-input-tool").files[0]);
};
