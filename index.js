
// document.write("It works.");

const Node = require('./scripts/Node.js').default;
const Trie = require('./scripts/Trie.js').default;

var txtInsert = document.querySelector('#txt-insert');
var txtSuggest = document.querySelector('#txt-suggest');
var lblCount = document.querySelector('#lbl-count');
var btnInsert = document.querySelector('#btn-insert');
// var btnSuggest = document.querySelector('#btn-suggest');
var btnPopulate = document.querySelector('#btn-populate');
var btnCount = document.querySelector('#btn-count');
var divSuggest = document.querySelector('#div-suggest');


btnInsert.addEventListener('click', insertWord);
// btnSuggest.addEventListener('click', suggestWord);
btnPopulate.addEventListener('click', populate);
btnCount.addEventListener('click', count);
txtSuggest.addEventListener('input', suggestWord);



var completeMe;


document.addEventListener("DOMContentLoaded", function(){
  completeMe = new Trie();
});



function populate() {
  completeMe.populate();
  console.log('Dictionary Has Been Populated with ', completeMe.count(), ' words.');
  // should match 274911
}


function insertWord() {
  console.log('Inserted word: ', txtInsert.value);
  completeMe.insert(txtInsert.value)

  // console.log('curr count', completeMe.count());
  // console.log('curr count', completeMe.suggest('an'));

}

function suggestWord() {

  if (txtSuggest.value.length === 0) {
    $(divSuggest).empty();
  } else {


    var suggestions = completeMe.suggest(txtSuggest.value)
    // console.log('Suggestions: ', suggestions);

    $(divSuggest).empty();

    for (let i = 0; i < 15; i++) {
      if (suggestions[i]) {

        var suggestItem = document.createElement("button");
        suggestItem.id = `${suggestions[i]}`;
        suggestItem.className = 'suggest-btn'
        suggestItem.value = `${suggestions[i]}`;
        suggestItem.innerText = `${suggestions[i]}`;
        // console.log('new button:', suggestItem);

        suggestItem.addEventListener('click', function(event) {
          select(event);
        });

        divSuggest.append(suggestItem);
      }
    }

  }

}

function select(event) {
  console.log('Select word: ', event.target.id);
  completeMe.select(event.target.id);
  // $(divSuggest).empty();
  // txtSuggest.value = '';
  suggestWord();
}



function count() {
  console.log('Number of words in Trie: ', completeMe.count());

  lblCount.innerText = completeMe.count();
}








//
