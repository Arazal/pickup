import { openDB } from 'idb';

export default async function storeDataInIndexedDB(selectedFile, jsonFromExcel) {
  try {
    const db = await openDB('documents', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('Documents')) {
          const store = db.createObjectStore('Documents', { keyPath: 'filename' });
          store.createIndex('createdAt', 'createdAt', { unique: false });
          store.createIndex('data', 'data', { unique: false });
        }
      },
    });

    const transaction = db.transaction('Documents', 'readwrite');
    const store = transaction.objectStore('Documents');

    transaction.onerror = function(event) {
      console.error('Transaction error:', event.target.error);
    };

    transaction.oncomplete = function() {
      console.log('Transaction completed: Document added to IndexedDB successfully');
      db.close();
    };

    if (store) {
      const document = {
        filename: selectedFile.name,
        createdAt: new Date().toISOString(),
        data: jsonFromExcel,
      };

      store.add(document);
    } else {
      throw new Error('Documents object store not found');
    }

  } catch (error) {
    console.error('Error storing document in IndexedDB:', error);
  }
}
