import Node from './Node';
import dictionary from './words.json';

export default class Trie {

  constructor() {
    this.root = new Node('');
    this.wordCount = 0;
  }

  insert(word) {
    const arrayOfLetters = [...word];
    let currNode = this.root;

    arrayOfLetters.forEach((letter) => {
      if (!currNode.children[letter]) {
        currNode.children[letter] = new Node(letter);
      }
      currNode = currNode.children[letter];
    });

    if (!currNode.isWord) {
      currNode.isWord = true;
      this.wordCount += 1;
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
    const suggestionsArray = [];

    // traverse the array until we reach the last letter's node
    for (let i = 0; i < arrayOfLetters.length && currNode; i++) {
      currNode = currNode.children[arrayOfLetters[i]];
    }

    // currNode now refers to the last leter in our word
    const searchTree = (currentWord, currentNode) => {
      const keys = Object.keys(currentNode.children);

      keys.forEach((key) => {
        const child = currentNode.children[key];
        const wordBuilder = currentWord + child.letter;
        if (child.isWord) {
          suggestionsArray.push({ word: wordBuilder,
                                  hits: child.hitCounter,
                                  lastTouched: child.lastTouched });
        }
        searchTree(wordBuilder, child);
      });
    };

    // if the word we are suggesting is a word in the trie itself
    if (currNode && currNode.isWord) {
      suggestionsArray.push({ word: word,
                              hits: currNode.hitCounter,
                              lastTouched: currNode.lastTouched });
    }

    // this kicks off the recursive call
    if (currNode) {
      searchTree(word, currNode);
    }

    // this sorts by hits then by lastTouched
    suggestionsArray.sort((a, b) => {
      return b.hits - a.hits ||
             b.lastTouched - a.lastTouched;
    });

    // we need to pull out only the words from our sorted array
    return suggestionsArray.map((item) => {
      return item.word;
    });
  }

  select(word) {
    const arrayOfLetters = [...word];
    let currNode = this.root;

    arrayOfLetters.forEach(letter => {
      currNode = currNode.children[letter];
    });

    if (currNode) {
      currNode.hitCounter += 1;
      currNode.lastTouched = Date.now();
    }
  }

  populate() {
    dictionary.forEach((word) => {
      this.insert(word.toLowerCase());
    });
  }

}
