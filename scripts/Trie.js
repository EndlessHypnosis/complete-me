import Node from './Node';
const util = require('util');

export default class Trie {
  constructor() {
    this.root = new Node('');
    this.wordCount = 0;
  }

  insert (word) {
    let wordAsArray = [...word];
    let firstLetter = wordAsArray[0];

    // check if root node has the starting letter of our word
    if (this.root.children[firstLetter]) {
      // root had the first letter as a child, so traverse
      let currNode = this.root.children[firstLetter];

      for (let i = 1; i < wordAsArray.length; i++) {

        if (currNode.children[wordAsArray[i]]) {
          // the next letter also exists
          currNode = currNode.children[wordAsArray[i]];
        } else {
          // the next letter didn't exist as a child node
          currNode.children[wordAsArray[i]] = new Node(wordAsArray[i]);
          currNode = currNode.children[wordAsArray[i]];
        }

      }
      // once we leave the for loop, we know the currNode = the last letter
      if (!currNode.isWord) {
        this.wordCount++;
        currNode.isWord = true;
      }

    } else {
      // root did not have the first letter as a child, so just build out a simple tree
      this.root.children[firstLetter] = new Node(firstLetter);

      let currNode = this.root.children[firstLetter];

      for (let i = 1; i < wordAsArray.length; i++) {

        currNode.children[wordAsArray[i]] = new Node(wordAsArray[i])
        currNode = currNode.children[wordAsArray[i]];

        if (i === wordAsArray.length - 1) {
          // we are at the last index (the final letter)
          // need to set isWord property to true
          if (!currNode.isWord) {
            this.wordCount++;
            currNode.isWord = true;
          }
        }

      }
    }

    // this stringify version is better format.
    // console.log('TRIE:', JSON.stringify(this.root, null, 4));
    // console.log('ROOT:', util.inspect(this.root, {showHidden: false, depth: null}))

  }

  count () {
    return this.wordCount;
  }






  suggest(word) {
    let wordAsArray = [...word];
    //let dynamicWord = word;
    let currNode = this.root;
    let suggestionsArray = [];

    for (let i = 0; i < wordAsArray.length; i++) {
      currNode = currNode.children[wordAsArray[i]]
    }

    console.log('CURR NODE:', currNode);

    // currNode now refers to the last leter in our word
// for (let k in tree.children) {

          var allWordsHelper = function(word, currNode) {
            let keys = Object.keys(currNode.children);
            // console.log('KEYS:', keys);
            for (let k = 0; k < keys.length; k++) {
              // console.log('CURR NODE:', currNode);
              const child = currNode.children[keys[k]]
              var newString = word + child.letter;
              if (child.isWord) {
                suggestionsArray.push(newString);
              }
              allWordsHelper(newString, child);
            }
          };


          if (currNode.isWord) {
            suggestionsArray.push(word)
          }

      // grab all the children keys
      // let keysOfRemainingTree = Object.keys(currNode.children)

      // if (keysOfRemainingTree.length > 0) {
      // if (currNode.children) {
        allWordsHelper(word, currNode);
      // }


      console.log('suggestionsArray:', suggestionsArray);
      return suggestionsArray;




  }













}
