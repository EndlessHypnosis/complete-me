export default class Node {

  constructor (letter) {
    this.letter = letter;
    this.isWord = false;
    this.children = {};
    this.hitCounter = 0;
    this.lastTouched = new Date(1990, 1, 1);
  }

}
