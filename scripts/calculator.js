'use strict';

class Calculator {
  constructor(options) {
    this._el = options.elem;
    this._template = options.template;
    this._buttonsArray = options.buttons;

    this._render();
    this._reset();

    this._screen = this._el.querySelector('.calculator-screen');

    this._methods = {
      '−': function(a, b) {
        return a - b;
      },
      '+': function(a, b) {
        return a + b;
      },
      '÷': function(a, b) {
        return a / b;
      },
      '×': function(a, b) {
        return a * b;
      },
    };

    this._el.onclick = this._onButtonClick.bind(this);
  }

  _render() {
    let html = this._template({
      buttons: this._buttonsArray
    });

    this._el.innerHTML = html;
  }

  _onButtonClick() {
    let buttonText = event.target.innerHTML;

    if (!event.target.classList.contains('button')) {
      return;
    }

    switch (buttonText) {
      case 'AC':
        this._reset();
        break;
      case '±':
        this._changeOperator();
        break;
      case '%':
        this._calculatePercent();
        break;
      case '=':
        this._calculate();
        break;
      case '÷':
      case '×':
      case '+':
      case '−':
        if (this._secondOperand) {
          this._calculate();
        }
        this._operator = buttonText;
        this._firstOperand = this._currentOperand;
        break;
      case ',':
        buttonText = '.';
      default:
        if (this._operator) {
          if (!this._secondOperand) {
            this._currentOperand = buttonText;
          } else {
            this._currentOperand += buttonText;
          }
          this._secondOperand = this._currentOperand;
        } else {
          this._currentOperand += buttonText;
        }
    }
    this._screen.textContent = this._currentOperand;
  }

  _reset() {
    this._currentOperand = '';
    this._firstOperand = '';
    this._secondOperand = '';
    this._operator = '';
  }

  _calculate() {
    if (!(this._firstOperand && this._secondOperand && this._operator)) {
      return;
    }

    let result = this._methods[this._operator](+this._firstOperand, +this._secondOperand);

    if (result == Infinity) {
      result = 'Не определено';
    }

    this._currentOperand = this._firstOperand = result;
    this._secondOperand = '';
  }

  _changeOperator() {
    if (!this._currentOperand) {
      return;
    }
    this._currentOperand = -(+this._currentOperand);

    if (this._secondOperand) {
      this._secondOperand = this._currentOperand;
    }
    this._screen.textContent = this._currentOperand;
  }

  _calculatePercent() {
    if (!this._currentOperand) {
      return;
    }
    if (this._secondOperand) {
      this._currentOperand = this._secondOperand = this._firstOperand / 100 * this._currentOperand;
    } else {
      this._currentOperand = this._firstOperand = this._currentOperand / 100;
    }

    this._screen.textContent = this._currentOperand;
  }
}
