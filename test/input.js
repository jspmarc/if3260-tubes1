var roadWidth = 0.25

const input = [
  // Buildings
  {
    "type": "SQUARE",
    "color": "#FF0000",
    "coordinates": [
      [-0.9, 0.9],
      [-0.9, 0.4],
      [-0.4, 0.9],
      [-0.4, 0.4],
    ]
  },
  {
    "type": "POLYGON",
    "color": "#00FF00",
    "coordinates": [
      [0, 0.9],
      [0.5, 0.9],
      [0.25, 0.4],
    ]
  },
  {
    "type": "POLYGON",
    "color": "#0000FF",
    "coordinates": [
      [0.6, 0.9],
      [0.6, 0.6],
      [0.775, 0.4],
      [0.95, 0.6],
      [0.95, 0.9],
    ]
  },
  {
    "type": "POLYGON",
    "color": "#00FFFF",
    "coordinates": [
      [-0.9, 0],
      [-0.9, -0.5],
      [0, -0.5],
      [-0.4, 0],
    ]
  },
  {
    "type": "POLYGON",
    "color": "#FF00FF",
    "coordinates": [
      [0.5, 0],
      [0.3, -0.15],
      [0.7, -0.3],
      [0.5, -0.45],
      [0.3, -0.3],
      [0.7, -0.15],
    ]
  },
  {
    "type": "SQUARE",
    "color": "#FFFF00",
    "coordinates": [
      [1, 0],
      [1, -0.5],
      [0.8, 0],
      [0.8, -0.5],
    ]
  },

  // Roads
  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [-1, 0.35],
      [-0.3, 0.35],
    ]
  },
  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [-1, 0.35 - roadWidth],
      [-0.3, 0.35 - roadWidth],
    ]
  },

  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [-0.3, 0.35],
      [-0.3, 1],
    ]
  },
  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [-0.3 + roadWidth, 0.35],
      [-0.3 + roadWidth, 1],
    ]
  },

  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [-0.05, 0.35],
      [1, 0.35],
    ]
  },
  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [-0.05, 0.35 - roadWidth],
      [1, 0.35 - roadWidth],
    ]
  },

  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [-0.3, 0.1],
      [0.2, -0.7],
    ]
  },
  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [-0.3 + roadWidth, 0.1],
      [0.2 + roadWidth, -0.7],
    ]
  },

  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [0.45, -0.7],
      [1, -0.7],
    ]
  },
  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [1, -0.7 - roadWidth],
      [-1, -0.7 - roadWidth],
    ]
  },

  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [0.2, -0.7],
      [-1, -0.7],
    ]
  },
  {
    "type": "LINE",
    "color": "#000000",
    "coordinates": [
      [1, -0.7 - roadWidth],
      [-1, -0.7 - roadWidth],
    ]
  },
]