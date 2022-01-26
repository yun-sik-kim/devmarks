"use strict";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {});

let bookmark = [
{
    "nickname": "MDN Web Docs",
    "url": "https://developer.mozilla.org/en-US/"
},
{
    "nickname": "Google fonts",
    "url": "https://fonts.google.com/"
}
]

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

function create_database() {
    const request = window.indexedDB.open('BookMarkDB', 3);

    request.onerror = function(event) {
        console.log("ERROR, DB cannot be opened")
    }
    request.onupgradeneeded = function(event) {
        db = event.target.results;
        let object_store = db.created_object_store('bookmark'. {
            keyPath: 'url'
        });

    }
    request.onsuccess = function(event) {

    }


}

function record_bookmark() {
  const request = window.indexedDB.open("test");
  this.url = url;
  this.nickname = nickname;
  this.time = time;
  this.Tags = Tags;

  return Bookmark;
}

function delete_bookmark() {}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
