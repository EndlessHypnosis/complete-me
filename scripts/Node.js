export default class Node {

  constructor (letter) {
    this.letter = letter;
    this.isWord = false;
    this.children = {};
  }

}
