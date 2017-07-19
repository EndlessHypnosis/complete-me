export default class Node {

  constructor (letter) {
    this.letter = letter;
    this.isWord = false;
    this.children = {};
    this.hitCounter = 0;
    this.lastTouched = 0;
  }

}
