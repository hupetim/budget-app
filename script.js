

import * as Model from './model.js';
import * as View from './view.js';



// *****  CONTROLLER  *****

const ctrlUpdateBudget = () => {
  // Budget neu berechnen
  Model.calcBudget();
  
  // neu Werte beziehen
  const budget = Model.data.budget;
  const totalInc = Model.data.total.inc;
  const totalExp = Model.data.total.exp;

  // UI updaten
  View.displayBudget(budget, totalInc, totalExp);
};

const ctrlAddItem = () => {
  // Input-Werte abrufen
  const input = View.getInput();

  // Werte aus Eingabe überprüfen
  if (input.desc !== '' && input.value !== 0 && !isNaN(input.value)) {
    // Item zum Daten-Modell hinzufügen
    const newItem = Model.addItem(input.type, input.desc, input.value);

    // Item in HTML UI einfügen
    View.addListItem(newItem, input.type);

    // Formular-Felder leeren
    View.clearForms();

    // Budget Werte und UI updaten
    ctrlUpdateBudget();
  };
};

const ctrlDeleteItem = (event) => {
  const itemId = event.target.parentNode.parentNode.parentNode.id;

  // Überprüfen, ob itemId einen Wert hat.
  // kann nur einen Wert haben, wenn auf den delete-btn geklickt wird,
  // wenn wo anders im '.content'-Bereich geklickt wird, ist itemId = ''
  if (itemId) {
    const type = itemId.split('-')[0];
    const id = itemId.split('-')[1];

    // Item aus Daten-Modell entfernen
    Model.deleteItem(type, id);

    // Item aus UI entfernen
    View.deleteListItem(itemId);

    // Budget Werte und UI updaten
    ctrlUpdateBudget();
  }
};

const setupEventListener = () => {
  document.querySelector('.content').addEventListener('click', ctrlDeleteItem);
  
  document.querySelector('.input__type').addEventListener('change', View.toggleClassRed);
  
  document.querySelector('.input__btn').addEventListener('click', ctrlAddItem);
  
  document.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      ctrlAddItem();
    }
  });
};

const init = (() => {
  console.log('Application has started');
  console.log(Model.data);
  View.displayBudget(0, 0, 0);
  setupEventListener();
})();