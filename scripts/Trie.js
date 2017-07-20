import Node from './Node';
import dictionary from './words';

export default class Trie {

  constructor() {
    this.root = new Node('');
    this.wordCount = 0;
  }

  insert(word) {
    const arrayOfLetters = [...word];
    let currNode = this.root;

    arrayOfLetters.forEach(letter => {
      if (!currNode.children[letter]) {
        currNode.children[letter] = new Node(letter);
      }
      currNode = currNode.children[letter];
    })

    if (!currNode.isWord) {
      currNode.isWord = true;
      this.wordCount++;
    }

    // view the entire tree
    // console.log('TRIE:', JSON.stringify(this.root, null, 4));
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    const arrayOfLetters = [...word];
    let currNode = this.root;
    let suggestionsArray = [];

    for (let i = 0; i < arrayOfLetters.length && currNode; i++) {
      currNode = currNode.children[arrayOfLetters[i]];
    }

    // currNode now refers to the last leter in our word
    const searchTree = (word, currNode) => {
      const keys = Object.keys(currNode.children);

      keys.forEach(key => {
        const child = currNode.children[key];
        const wordBuilder = word + child.letter;
        if (child.isWord) {
          suggestionsArray.push({ word: wordBuilder,
                                  hits: child.hitCounter,
                                  lastTouched: child.lastTouched});
        }
        searchTree(wordBuilder, child);
      })
    }

    // if the word we are suggesting is a word in the trie itself
    if (currNode && currNode.isWord) {
      suggestionsArray.push({ word: word,
                              hits: currNode.hitCounter,
                              lastTouched: currNode.lastTouched});
    }

    // this kicks off the recursive call
    if (currNode) {
      searchTree(word, currNode);
    }

    // this sorts by hits then by lastTouched
    suggestionsArray.sort((a, b) => {
      return  b.hits - a.hits ||
              b.lastTouched - a.lastTouched;
    })

    // we need to pull out only the words from our sorted array
    const suggestArray = suggestionsArray.map(item => {
      return item.word;
    })

    return suggestArray;
  }

  select(word) {
    const arrayOfLetters = [...word];
    let currNode = this.root;

    arrayOfLetters.forEach(letter => {
      currNode = currNode.children[letter];
    })

    currNode.hitCounter++;
    currNode.lastTouched = Date.now();
  }

  populate() {
    dictionary.forEach(word => {
      this.insert(word.toLowerCase());
    })
  }

}
