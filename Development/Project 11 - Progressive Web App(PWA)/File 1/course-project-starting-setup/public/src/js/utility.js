var dbPromise = idb.open('posts-store', 1, (db) => {
    if (!db.objectStoreNames.contains('posts')) {
        db.createObjectStore('posts', { keyPath: 'id' });//allow retrieve by the key
    }
    if (!db.objectStoreNames.contains('sync-posts')) {
        db.createObjectStore('sync-posts', { keyPath: 'id' });//allow retrieve by the key
    }
});

function writeData(stoName, data) {
    return dbPromise.then((db) => {
        var tx = db.transaction(stoName, 'readwrite');
        var store = tx.objectStore(stoName);
        store.put(data);
        return tx.complete;
    });
}

function readAllData(stoName) {
    return dbPromise.then((db) => {
        var tx = db.transaction(stoName, 'readonly');
        var store = tx.objectStore(stoName);
        return store.getAll();
    })
}

function clearAllData(stoName) {
    return dbPromise.then((db) => {
        var tx = db.transaction(stoName, 'readwrite');
        var store = tx.objectStore(stoName);
        store.clear();
        return tx.complete;
    });
}

function clearItemFromData(stoName,id){
    dbPromise.then((db)=>{
        var tx = db.transaction(stoName, 'readwrite');
        var store = tx.objectStore(stoName);
        store.delete(id);
        return tx.complete;
    })
}