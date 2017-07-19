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
    let currNode = this.root;
    let suggestionsArray = [];

    for (let i = 0; i < wordAsArray.length; i++) {
      currNode = currNode.children[wordAsArray[i]]
      //console.log('CURR NODE:', currNode);
    }

    // currNode now refers to the last leter in our word
    var traverseTheTrie = function(word, currNode) {
      let keys = Object.keys(currNode.children);
      for (let k = 0; k < keys.length; k++) {
        // console.log('CURRENT NODE:', currNode, 'KEYS:', keys);
        const child = currNode.children[keys[k]];
        let newString = word + child.letter;
        if (child.isWord) {
          suggestionsArray.push({ 'word': newString,
                                  'hits': child.hitCounter,
                                  'lastTouched': child.lastTouched});
        }
        traverseTheTrie(newString, child);
      }
    };

    if (currNode && currNode.isWord) {
      suggestionsArray.push({ 'word': word,
                              'hits': currNode.hitCounter,
                              'lastTouched': currNode.lastTouched});
    }

    if (currNode) {
      traverseTheTrie(word, currNode);
    }

    console.log('SA-PRESORT:', suggestionsArray);

    suggestionsArray.sort(function(a, b) {
      // return b.hits - a.hits;
      return b["hits"] - a["hits"] || b["lastTouched"] - a["lastTouched"];
    })

    console.log('SA-POSTSORT:', suggestionsArray);

    let suggestArray = suggestionsArray.map(function(item) {
      return item.word;
    })

    console.log('MAPPED:', suggestArray);



    //console.log('suggestionsArray:', suggestionsArray);
    return suggestArray;

  }

// select should really only call suggest with a flag to signify that the
// word we are suggesting needs to be 'flagged' as a select
// then in suggest, we need to sort the array returned...push the nodes to
// the array, then sort into

  select(word) {

    console.log('STUFF');
    let wordAsArray = [...word];
    let currNode = this.root;

    for (let i = 0; i < wordAsArray.length; i++) {
      currNode = currNode.children[wordAsArray[i]];
    }

    console.log(('CURR NODE:', currNode));
    currNode.hitCounter++;
    currNode.lastTouched = new Date();

  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }










}
