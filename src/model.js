var indices = [];

class Model {
  #coordinates = [];
  #colors = [];
  #colorRaw = '';
  #type = "SQUARE";

  constructor(type="SQUARE", colorRaw='#000000') {
    this.#type = type;
    this.#colorRaw = colorRaw;
  }

  /**
   * Add a point to the model
   * @param {number} x 
   * @param {number} y 
   */
  addPoint(x, y) {
    const color = hexToColorArray(this.#colorRaw);
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

  getRawColor() {
    return this.#colorRaw;
  }

  /**
   * @param {string} newColor hex value of new color
   */
  changeColor(newColor) {
    this.#colorRaw = newColor;
    const color = hexToColorArray(newColor);
    for (let i = 0; i < this.#colors.length; ++i) {
      this.#colors[i] = color;
    }
  }

  addToModelsPane() {
    // add entry to models pane
    const pane = document.querySelector('.right.models-pane');
    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const colorInput = document.createElement('input');
    const colorLabel = document.createElement('label');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    li1.innerHTML = `type: ${this.#type}`;
    li2.appendChild(colorLabel);
    li2.appendChild(colorInput);
    li3.appendChild(deleteButton);
    li3.appendChild(editButton);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    pane.appendChild(ul);

    colorInput.type = 'color';
    colorInput.name = `model-color-${modelArr.length}`
    colorInput.classList.add('model-color');
    colorInput.id = colorInput.name;
    colorInput.value = this.#colorRaw;
    colorInput.addEventListener('change', e => {
      this.changeColor(e.target.value);
      renderProgram(gl, shaderProgram, modelArr);
    });

    colorLabel.htmlFor = colorInput.name;
    colorLabel.innerHTML = 'color: ';

    deleteButton.innerHTML = 'delete';
    deleteButton.id = `model-delete-${modelArr.length}`
    deleteButton.addEventListener('click', () => {
      pane.removeChild(ul);
      const idx = modelArr.indexOf(this);
      modelArr.splice(idx, 1);
      renderProgram(gl, shaderProgram, modelArr);
    });

    editButton.innerHTML = 'edit';
    editButton.id = `model-edit-${modelArr.length}`
    editButton.addEventListener('click', () => {
      isEditing = true;
      document.getElementById('glcanvas').classList.add('cursor-draw');
      console.log(this.#type);
      document.getElementById("glcanvas").addEventListener("click", (e) => {
        if (isEditing){
          const coor = getCursorGlCoordinates(e);
          this.changePoint(this.getTotalIndices()-1,coor.x,coor.y);
          isEditing = false;
          document.getElementById('glcanvas').classList.remove('cursor-draw');
        }
        renderProgram(gl, shaderProgram, modelArr);
      });
    });
  }
}