import { openDB } from 'idb';

export default async function retrieveDataFromIndexedDB(id) {
  try {
    const db = await openDB('documents', 1);

    const tx = db.transaction('Documents', 'readonly');
    const store = tx.objectStore('Documents');

    // Retrieve all data from the object store using getAll()
    const data = await store.getAll();

    db.close();

    return data; // Return the retrieved data

  } catch (error) {
    console.error('Error retrieving data from IndexedDB:', error);
    return []; // Return an empty array or handle the error accordingly
  }
}
