/* Універсальний клас-прототип для інстансів роботи з LocalStarage */

class LocalStorageInstance {
  constructor(listName) {
    this.listName = listName;
    this.items = this.getItems() || [];
  }
  // Зберегти масив об'єктів списку
  setItems(arr) {
    this.items = arr;
    try {
      localStorage.setItem(`${this.listName}`, JSON.stringify(this.items));
      return true;
    } catch {
      console.log('error save to LS');
      return false;
    }
  }
  // Отримати масив об'єктів списку
  getItems() {
    try {
      return JSON.parse(localStorage.getItem(`${this.listName}`)) || false;
    } catch {
      console.log('error read from LS');
      return false;
    }
  }
  // Додати об'єкт до списку
  addItem(obj) {
    this.items.unshift(obj);

    try {
      localStorage.setItem(`${this.listName}`, JSON.stringify(this.items));
      return true;
    } catch {
      console.log('error save to LS');
      return false;
    }
  }
  // Видалити об'єкт зі списку по id
  deleteItem(id) {
    this.items.splice(
      this.items.findIndex(item => item.id === id),
      1
    );
    try {
      localStorage.setItem(`${this.listName}`, JSON.stringify(this.items));
      return true;
    } catch {
      console.log('error delete from LS');
      return false;
    }
  }
  // Перевірити наявність об'єкта у списку по id
  isIncluded(id) {
    return this.items.find(item => item.id === id) ? true : false;
  }
  //Повернути об'єкт зі списку по id
  getItem(id) {
    return this.items[this.items.findIndex(item => item.id === id)] || false;
  }
}

class LocalStorageFlag {
  constructor(flagname) {
    this.flagname = flagname;
    this.value = this.get() || false;
  }
  get() {
    try {
      return JSON.parse(localStorage.getItem(`${this.flagname}`)) || false;
    } catch {
      console.log('error read from LS');
      return false;
    }
  }
  set(value) {
    try {
      localStorage.setItem(`${this.flagname}`, JSON.stringify(value));
      return true;
    } catch {
      console.log('error save to LS');
      return false;
    }
  }
}

// Створюємо і одночасно експортуємо інстанси для керування списками "Поточні", "Переглянуті" та "Черга". В аргумент передаємо ім'я властивості в Local Storage.
export const LsWatched = new LocalStorageInstance('watchedList');
export const LsQueue = new LocalStorageInstance('queueList');
export const LsCurrent = new LocalStorageInstance('currentList');

// Створюємо і одночасно експортуємо інстанс для керування прапорцем "Тема". В аргумент передаємо бажане ім'я прапорця
export const LsTheme = new LocalStorageFlag('theme');