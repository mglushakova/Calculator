'use strict';

let buttons = [
  'AC', '±', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '−',
  '1', '2', '3', '+',
  '0', ',', '='
];

let calculator = new Calculator({
  elem: document.querySelector('#calculator'),
  template: _.template(document.getElementById('calculator-template').innerHTML.trim()),
  buttons: buttons
});
