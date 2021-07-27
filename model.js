const data = {
  total: {
    inc: 0,
    exp: 0
  },
  items: {
    inc: [],
    exp: []
  },
  budget: 0
};

const Expense = (id, desc, value) => {
  return {
    id,
    desc,
    value
  };
};

const Income = (id, desc, value) => {
  return {
    id,
    desc,
    value
  };
};

// ***  Daten updaten  ***

const addItem = (type, desc, value) => {
  let id, newItem;
  
  // ID für neues Item finden, wenn Liste leer, letzte ID +1, sonst =0
  if (data.items[type].length > 0) {
    id = data.items[type][data.items[type].length - 1].id + 1;
  } else {
    id = 0;
  }

  // neues Item erstellen - basierend auf type
  if (type === 'inc') {
    newItem = Income(id, desc, value);
  } else if (type === 'exp') {
    newItem = Expense(id, desc, value);
  }

  // Item in Datenstruktur
  data.items[type].push(newItem);

  return newItem;
};

const deleteItem = (type, id) => {
  let ids, index;

  // alle IDs auslesen
  ids = data.items[type].map(cur => cur.id);
  
  // Index zu ID finden
  index = ids.indexOf(parseInt(id));

  // Item aus der Liste löschen
  if (index !== -1) {
    data.items[type].splice(index, 1)
  }
};

const calcBudget = () => {
  let inc = 0;
  let exp = 0;
  // total Income u. Expenses berechnen
  data.items.inc.forEach(cur => {
    inc += cur.value
  });
  data.items.exp.forEach(cur => exp += cur.value);
  data.total.inc = inc;
  data.total.exp = exp;

  // Budget berechnen
  data.budget = inc - exp;
};



export { data, addItem, deleteItem, calcBudget };