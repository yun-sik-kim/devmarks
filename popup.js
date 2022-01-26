"use strict"; // used in Valina Javascript. Used to restrict "flexibility" of JS ex)allocate value to not initialized variable

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

});


const background = document.querySelector(".background");
const dir_button = document.querySelector("#dir_button");
const close_buttons = [
  document.querySelector("#close"),
  document.querySelector(".save_button"),
];
const save_button = document.querySelector(".save_button");
const add_button = document.querySelector("#add_button");



dir_button.addEventListener("click", () => {
  background.classList.add("show");
});

close_buttons.forEach(c_btn => {
  c_btn.addEventListener("click", () => {
    background.classList.remove("show");
  });
});

add_button.addEventListener("click", () => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // console.log(tabs[0]);
    console.log(tabs[0].title);
    console.log(tabs[0].url);
    // console.log(tabs[0].favIconUrl);

  });
});





//receive the url of the current page



// document.querySelector('add_button').style.background.linear-gradient(175deg, var(--highlight1) 65%, #FEF9EF 45%);

// chrome.runtime.getURL(
//     path: string,
//   )

// async function getCurrentTab() {
//     let queryOptions = { active: true, currentWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
//   }

//   getCurrentTab();

//   function makeBookmark (url) {

//   }
