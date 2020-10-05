/*
 * Browser local storage abstraction
 * Avoid using the local storage directly!
 * -------------------------
 * read, write and delete values
 */
const readFromStorage = key => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : value;
  } catch (e) {
    console.error(`Error reading the local storage for ${key}: ${e.message}`);
    localStorage.removeItem(key);
    return null;
  }
};

const writeToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error storing ${key} = ${value} in the local storage: ${e.message}`);
    localStorage.removeItem(key);
    return null;
  }
};

const removeFromStorage = key => localStorage.removeItem(key);

export { readFromStorage, writeToStorage, removeFromStorage };
