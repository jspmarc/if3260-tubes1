const helpPane = document.querySelector('.tools-pane > #help > span');
// const originalText = helpPane.innerHTML;
document.getElementById('line-tool').addEventListener('mouseover', () => {
  helpPane.innerHTML = `A tool to be used to draw a line.
To use this tool, <b>press and hold your primary mouse button</b> on the canvas to draw a line.`;
});
document.getElementById('rectangle-tool').addEventListener('mouseover', () => {
  helpPane.innerHTML = `A tool to be used to draw a rectangle or square.
To use this tool, <b>press and hold your primary mouse button</b> on the canvas to draw a rectangle.
Do the same while <b>pressing and holding shift</b> to draw a square.`;
});
document.getElementById('polygon-tool').addEventListener('mouseover', () => {
  helpPane.innerHTML = `A tool to be used to draw a polygon.
To use this tool, first edit the amount of vertices (defaults to 5, minimum of 3).
And then, <b>click your primary mouse button</b> on the canvas to start drawing the polygon.
`;
});
document.getElementById('vertex-count-picker').addEventListener('mouseover', () => {
  helpPane.innerHTML = `A tool to determine the amount of vertices when drawing a polygon.
Choose a number, minimum of 3, as the amount of vertices.`;
});
document.getElementById('vertex-count-picker-label').addEventListener('mouseover', () => {
  helpPane.innerHTML = `A tool to determine the amount of vertices when drawing a polygon.
Choose a number, minimum of 3, as the amount of vertices.`;
});
document.getElementById('reset-tool').addEventListener('mouseover', () => {
  helpPane.innerHTML = `Reset the canvas to a blank canvas.`;
});
document.getElementById('obj-color-picker').addEventListener('mouseover', () => {
  helpPane.innerHTML = `A tool to choose the color of your next object.`;
});
document.getElementById('example-1-tool').addEventListener('mouseover', () => {
  helpPane.innerHTML = `Example drawing`;
});
document.getElementById('example-2-tool').addEventListener('mouseover', () => {
  helpPane.innerHTML = `Example drawing`;
});
