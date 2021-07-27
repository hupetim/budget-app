

const formatNumber = (value, type) => {
  let string = '';
  value = Math.abs(value);
  /*
   * 1. + or - before number
   * 2. comma separating the thousands
   * 3. exactly 2 deicmal points
  */

  // 1. Vorzeichen hinzufügen
  type === 'inc' ? string = '+ ' : string = '- ';

  // value am Kommazeichen aufteilen
  const valueSplit = value.toFixed(2).toString().split('.');

  // 2. Tausender Punkte
  const numbers = valueSplit[0].split('').reverse();
  const newNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      newNumbers.push('.');
    }
    newNumbers.push(numbers[i]);
  }
  string += newNumbers.reverse().join('');

  // 3. 2 Nachkommastellen
  string += ',' + valueSplit[1] + ' €';

  return string;
};

const getInput = () => {
  return {
    type:  document.querySelector('.input__type').value, // 'inc' oder 'exp'
    desc:  document.querySelector('.input__desc').value, // string
    value: parseFloat(document.querySelector('.input__value').value) // number
  };
};

const clearForms = () => {
  document.querySelector('.input__desc').value = '';
  document.querySelector('.input__desc').focus();
  document.querySelector('.input__value').value = '';
};

const addListItem = (obj, type) => {
  let parentElement;
  let html = '<div class="item" id="%ID%"><div class="item__desc">%DESC%</div><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><ion-icon name="close-circle-outline"></ion-icon></button></div></div>';

  if (type === 'inc') {
    html = html.replace('%ID%', 'inc-' + obj.id);
    parentElement = document.querySelector('.income__list');
  } else if (type === 'exp') {
    html = html.replace('%ID%', 'exp-' + obj.id);
    parentElement = document.querySelector('.expenses__list');
  }

  html = html.replace('%DESC%', obj.desc);
  html = html.replace('%VALUE%', formatNumber(obj.value, type));

  parentElement.insertAdjacentHTML('beforeend', html);
};

const deleteListItem = (id) => {
  const el = document.getElementById(id);
  el.parentNode.removeChild(el);
};

const displayBudget = (budget, totalInc, totalExp) => {
  let type;
  budget >= 0 ? type = 'inc' : type = 'exp';

  document.querySelector('.budget__value').textContent = formatNumber(budget, type);
  document.querySelector('.budget__income--value').textContent = formatNumber(totalInc, 'inc');
  document.querySelector('.budget__expenses--value').textContent = formatNumber(totalExp, 'exp');
};

const toggleClassRed = () => {
  document.querySelector('.input__type').classList.toggle('red-focus');
  document.querySelector('.input__desc').classList.toggle('red-focus');
  document.querySelector('.input__value').classList.toggle('red-focus');
  document.querySelector('.input__btn').classList.toggle('red-focus');
  document.querySelector('.input__btn').classList.toggle('red');
};


export { formatNumber, getInput, clearForms, addListItem, deleteListItem, displayBudget, toggleClassRed };