const canvas = document.getElementsByClassName('canvas-body')[0];
modelSize = canvas.offsetWidth>canvas.offsetHeight?canvas.offsetHeight:canvas.offsetWidth;
modelWidth = (modelSize/2)/canvas.offsetWidth;
modelHeight = (modelSize/2)/canvas.offsetHeight;

topLeft = { x: -1*modelWidth, y: modelHeight };
boxWidth = 0.4 * modelWidth
boxHeight = 0.4 * modelHeight

const ModelData = [
  // Top Bar
  {
    colorRaw: "#0E75BD",
    coordinates: [
     [topLeft.x, topLeft.y],
     [topLeft.x + boxWidth, topLeft.y - boxHeight],
     [topLeft.x + 4*boxWidth, topLeft.y],
     [topLeft.x + 5*boxWidth, topLeft.y - boxHeight],
    ]
  },
  // 'S' Left Top Bar
  {
    colorRaw: '#25A9E0',
    coordinates: [
      [topLeft.x, topLeft.y],
      [topLeft.x, topLeft.y - 2*boxHeight],
      [topLeft.x + boxWidth, topLeft.y - boxHeight],
      [topLeft.x + boxWidth, topLeft.y - 3*boxHeight],
    ]
  },
  // 'S' Middle Bar
  {
    colorRaw: '#262161',
    coordinates: [
      [topLeft.x + boxWidth, topLeft.y - 2*boxHeight],
      [topLeft.x + boxWidth, topLeft.y - 3*boxHeight],
      [topLeft.x + 2*boxWidth, topLeft.y - 2*boxHeight],
      [topLeft.x + 3*boxWidth, topLeft.y - 3*boxHeight],
    ]
  },
  // 'S' Bottom Bar
  {
    colorRaw: "#262161",
    coordinates: [
      [topLeft.x, topLeft.y - 4*boxHeight],
      [topLeft.x + boxWidth, topLeft.y - 5*boxHeight],
      [topLeft.x + 2*boxWidth, topLeft.y - 4*boxHeight],
      [topLeft.x + 3*boxWidth, topLeft.y - 5*boxHeight],
    ]
  },
  // 'T' Bar
  {
    colorRaw: "#283890",
    coordinates: [
      [topLeft.x + 2*boxWidth, topLeft.y - boxHeight],
      [topLeft.x + 2*boxWidth, topLeft.y - 4*boxHeight],
      [topLeft.x + 3*boxWidth, topLeft.y - boxHeight],
      [topLeft.x + 3*boxWidth, topLeft.y - 5*boxHeight],
    ]
  },
  // 'E' Middle Bar
  {
    colorRaw: "#262161",
    coordinates: [
      [topLeft.x + 3*boxWidth, topLeft.y - 2*boxHeight],
      [topLeft.x + 3*boxWidth, topLeft.y - 3*boxHeight],
      [topLeft.x + 4*boxWidth, topLeft.y - 2*boxHeight],
      [topLeft.x + 5*boxWidth, topLeft.y - 3*boxHeight],
    ]
  },
  // 'E' Bottom Bar
  {
    colorRaw: "#262161",
    coordinates: [
      [topLeft.x + 3*boxWidth, topLeft.y - 4*boxHeight],
      [topLeft.x + 3*boxWidth, topLeft.y - 5*boxHeight],
      [topLeft.x + 4*boxWidth, topLeft.y - 4*boxHeight],
      [topLeft.x + 5*boxWidth, topLeft.y - 5*boxHeight],
    ]
  },
  // 'I' Bar
  {
    colorRaw: "#283890",
    coordinates: [
      [topLeft.x + 4*boxWidth, topLeft.y - boxHeight],
      [topLeft.x + 4*boxWidth, topLeft.y - 4*boxHeight],
      [topLeft.x + 5*boxWidth, topLeft.y - boxHeight],
      [topLeft.x + 5*boxWidth, topLeft.y - 5*boxHeight],
    ]
  },
  // Background
  {
    colorRaw: "#FFFFFF",
    coordinates: [
      [-1*modelWidth, -1*modelHeight],
      [-1*modelWidth, modelHeight],
      [modelWidth, -1*modelHeight],
      [modelWidth, modelHeight],
    ]
  }
]