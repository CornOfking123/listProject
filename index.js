document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  // prevent reset page when we submit;
  let name = document.querySelector("#name").value;
  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
  };
  addItemtoUI(item);
  addItemToStorage(item);
});
// getlist(): recieve item when user input and create 1 list ;
const getlist = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};
// function receive item and show in UI
const addItemtoUI = (item) => {
  let newCard = document.createElement("div");
  newCard.className =
    "card d-flex flex-row justify-content-between align-items-center p-2 mb-3";
  newCard.innerHTML = `
    <span>${item.name}</span>
    <button data-id="${item.id}" class="btn btn-danger btn-sm btn-remove">Remove</button>
  `;
  document.querySelector(".list").appendChild(newCard);
};
// fucntion receive item and save in local storage:
const addItemToStorage = (item) => {
  // get list from localStorage:
  let list = getlist();
  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));
};
// render ui and local storage:
const init = (item) => {
  // getlist:
  let list = getlist();
  // reder to UI:
  list.forEach((item) => {
    addItemtoUI(item);
  });
};
init();
// remove:
document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    let nameItem = event.target.previousElementSibling.innerHTML;
    let isConfirmed = confirm(`bạn có muốn xóa item: ${nameItem} không ? `);
    if (isConfirmed) {
      let card = event.target.parentElement;
      card.remove();
      // funct remove item in local storage:
      let idRemove = event.target.dataset.id; // get id of item which user want to remove;
      removeItemFromLS(idRemove);
    }
  }
});
const removeItemFromLS = (idRemove) => {
  let list = getlist();
  // add item dont have id same idRemove:
  list = list.filter((item) => item.id != idRemove);
  localStorage.setItem("list", JSON.stringify(list));
};
// removeAll:
document.querySelector("#btn-removeAll").addEventListener("click", (event) => {
  let isConform = confirm(`Bạn có muốn xóa tất cả không ?`);
  if (isConform) {
    // removeUI:
    document.querySelector(".list").innerHTML = " ";
    // remove localST
    localStorage.removeItem("list");
  }
});
//function filler.
document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = event.target.value;
  let list = getlist();
  let fillteredList = list.filter((item) => item.name.includes(inputValue));
  document.querySelector(".list").innerHTML = "";
  fillteredList.forEach((item) => {
    addItemtoUI(item);
  });
});
