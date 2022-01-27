"use strict";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "insert") {
    let insert_request = insert_bookmark(request.payload);
    insert_request.then((res) => {
      chrome.runtime.sendMessage({
        message: "insert_success",
        payload: res,
      });
    });
  } else if (request.message === "get") {
    let get_request = get_bookmark(request.payload);
    get_request.then((res) => {
      chrome.runtime.sendMessage({
        message: "get_success",
        payload: res,
      });
    });
  } else if (request.message === "update") {
    let update_request = update_bookmark(request.payload);
    update_request.then((res) => {
      chrome.runtime.sendMessage({
        message: "update_success!",
        payload: res,
      });
    });
  } else if (request.message === "delete") {
    let delete_request = delete_bookmark(request.payload);
    delete_request.then((res) => {
      chrome.runtime.sendMessage({
        message: "delete_success!",
        payload: res,
      });
    });
  }
});

let bookmark = [
  {
    nickname: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/",
  },
  {
    nickname: "Google fonts",
    url: "https://fonts.google.com/",
  },
];

let db = null;

// class Bookmark {
//   constructor(url, nickname, time, Tags) {
//     this.url = url;
//     this.nickname = nickname;
//     this.time = time;
//     this.Tags = Tags;
//   }
//   get Tags() {
//     return this._number;
//   }
//   set Tags(myVar) {
//     if (typeof myVar === "string" || myVar instanceof String) {
//       this._number = number;
//     } else {
//       throw Error("only positive integers are avaiable.");
//     }
//   }
// }

// const request = window.indexedDB.open("test");
// this.url = url;
// this.nickname = nickname;
// this.time = time;
// this.Tags = Tags;

// return Bookmark;

function create_database() {
  var request = self.indexedDB.open("extensionDB");

  request.onerror = function (event) {
    console.log("ERROR, DB cannot be opened");
  };

  request.onupgradeneeded = function (event) {
    // db = event.target.results;
    db = request.result;

    let objectStore = db.createObjectStore("bookmark", {
      keyPath: "url",
    });

    objectStore.transaction.oncomplete = function (event) {
      console.log("objectStore created!");
    };
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("DB opened!");
    // insert_bookmark(bookmark);

    // db.onerror = function (event) {
    //   console.log("FAILED TO OPEN DB.");
    // };
  };
}

function delete_database() {
  const request = window.indexedDB.open("BookMarkDB");

  request.onerror = function (event) {
    console.log("ERROR, failed to delete DB");
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("db deleted!");
  };
}

function insert_bookmark(url) {
  if (db) {
    const insert_transaction = db.transaction("bookmark", "readwrite");
    const objectStore = insert_transaction.objectStore("bookmark");

    return new Promise((resolve, reject) => {
      insert_transaction.oncomplete = function () {
        console.log("All insert transactions complete!");
        resolve(true);
      };

      insert_transaction.onerror = function () {
        console.log("ERROR! problem inserting records");
        resolve(false);
      };

      url.forEach((value) => {
        let request = objectStore.add(value);

        request.onsuccess = function () {
          console.log("Added: ", value);
        };
      });
    });
  }
}

function get_bookmark(url) {
  if (db) {
    const get_transaction = db.transaction("bookmark", "readonly");
    const objectStore = get_transaction.objectStore("bookmark");

    return new Promise((resolve, reject) => {
      get_transaction.oncomplete = function () {
        console.log("All get transactions complete!");
      };

      get_transaction.onerror = function () {
        console.log("ERROR! problem getting records");
      };

      let request = objectStore.get(url);

      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
    });
  }
}

function update_bookmark(url) {
  if (db) {
    const put_transaction = db.transaction("bookmark", "readwrite");
    const objectStore = put_transaction.objectStore("bookmark");

    return new Promise((resolve, reject) => {
      put_transaction.oncomplete = function () {
        console.log("All put transactions complete!");
        resolve(true);
      };

      put_transaction.onerror = function () {
        console.log("ERROR! problem updating records");
        resolve(false);
      };

      objectStore.put(url);
    });
  }
}

function delete_bookmark(url) {
  if (db) {
    const del_transaction = db.transaction("bookmark", "readwrite");
    const objectStore = del_transaction.objectStore("bookmark");

    return new Promise((resolve, reject) => {
      del_transaction.oncomplete = function () {
        console.log("All delete transactions complete!");
        resolve(true);
      };

      del_transaction.onerror = function () {
        console.log("ERROR! problem deleting records");
        resolve(false);
      };

      objectStore.delete(url);
    });
  }
}

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });

create_database();
