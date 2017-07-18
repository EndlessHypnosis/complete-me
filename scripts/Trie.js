import Node from './Node';
const util = require('util');

export default class Trie {
  constructor() {
    this.root = new Node('');
  }

  insert (word) {
    // console.log(this.root);
    let wordAsArray = [...word];

    let firstLetter = wordAsArray[0];

    // check if root node has the starting letter of our word
    if (this.root.children[firstLetter]) {
      console.log('root has child:', firstLetter);

      let currNode = this.root.children[firstLetter];

      for (let i = 1; i < wordAsArray.length; i++) {

        if (currNode.children[wordAsArray[i]]) {
          // the next letter also exists
          currNode = currNode.children[wordAsArray[i]];
        } else {
          // the next letter didn't exist as a child node
          currNode.children[wordAsArray[i]] = new Node(wordAsArray[i]);
          currNode = currNode.children[wordAsArray[i]];

          if (i === wordAsArray.length - 1) {
            currNode.isWord = true;
          }
        }

      }



    } else {
      console.log('root does NOT have child:', firstLetter);
      this.root.children[firstLetter] = new Node(firstLetter);

      let currNode = this.root.children[firstLetter];

      // console.log('wordAsArray length:', wordAsArray.length);

      for (let i = 1; i < wordAsArray.length; i++) {
        // console.log('currNode', currNode);
        currNode.children[wordAsArray[i]] = new Node(wordAsArray[i])
        currNode = currNode.children[wordAsArray[i]];

        if (i === wordAsArray.length - 1) {
          // we are at the last index (the final letter)
          // need to set isWord property to true
          currNode.isWord = true;
        }

      }
    }

    // this stringify version is better format.
    console.log('TRIE:', JSON.stringify(this.root, null, 4));
    // console.log('ROOT:', util.inspect(this.root, {showHidden: false, depth: null}))

  }
}
