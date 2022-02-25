var indices = [];

class Model {
  #coordinates = [];
  #colors = [];
  #type = "SQUARE";

  constructor(type="SQUARE") {
    this.#type = type;
  }

  /**
   * Add a point to the model
   * @param {number} x 
   * @param {number} y 
   * @param {Array<number>} color 
   */
  addPoint(x, y, color=[0,0,0]) {
    this.#coordinates.push([x,y,0]);
    this.#colors.push(color);

    indices.push(indices.length);
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
    var [curX, curY] = this.#coordinates[idx];
    this.#coordinates[idx] = [newX ?? curX, newY ?? curY, 0];
    this.#colors[idx] = newColor ?? this.#colors[idx];
  }

  /**
   * Remove point
   * @param {number} idx 
   */
  deletePoint(idx) {
    this.#coordinates.splice(idx, 1);
    this.#colors.splice(idx, 1);
    indices.pop()
  }

  popPoint() {
    this.#coordinates.pop();
    this.#colors.pop();
    indices.pop();
  }

  /**
   * Reset model
   * @param {number} index 
   */
  reset() {
    indices.splice(this.#coordinates.length * -1);
    this.#coordinates = [];
    this.#colors = [];
  }

  /**
   * Change model type
   * @param {String} type 
   */
  changeType(type) {
    this.#type = type;
  }

  /**
   * Get model type
   * @returns {String}
   */
  getModelType() {
    return this.#type;
  }

  /**
   * Get model total indices
   * @returns {number}
   */
  getTotalIndices() {
    return this.#coordinates.length;
  }


  /**
   * Get model coordinates
   * @returns {number}
   */
  getCoordinates() {
    return this.#coordinates;
  }

  /**
   * Get model info
   * @returns 
   */
  getModelInfo(){
    return {
      coordinates: [].concat(...this.#coordinates),
      colors: [].concat(...this.#colors),
    }
  }

  /**
   * @param {Array<number>} newColor 
   */
  changeColor(newColor) {
    for (let i = 0; i < this.#colors.length; ++i) {
      this.#colors[i] = newColor;
    }
  }
}