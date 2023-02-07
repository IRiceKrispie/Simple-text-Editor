import { openDB } from 'idb';

const initdb = async () =>
// We are creating a new database named 'textEditor' which will be using version 1 of the database.
  openDB('textEditor', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('textEditor')) {
        console.log('textEditor database already exists');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('textEditor', { keyPath: 'id', autoIncrement: true });
      console.log('textEditor database created');
    },
  });

// Export a function we will use to POST to the database.
export const postDb = async (text)  => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('textEditor', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('textEditor', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('textEditor');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ textTyped: text });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};
;

// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('textEditor', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('textEditor', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('textEditor');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};


// Export a function we will use to clear the database.
export const deleteDb = async () => {
  console.log('DELETE from the database');
  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('textEditor', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('textEditor', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('textEditor');
  //clear the desired store
  const request = store.clear();

  //get confirmation
  const result = await request;
  console.log('result.value', value);
  return result;
};

// Start the database.
initdb();
