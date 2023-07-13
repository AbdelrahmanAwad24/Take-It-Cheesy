import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

function getFeedHtml() {
  let feedHtml = "";

  menuArray.forEach(function (menu) {
    feedHtml += `
    <div class='product'>
    <p ' class='food-pic'>${menu.emoji}</p>
    <div class='inner-details'>
    <p class='name'>${menu.name}</p>
    <p class='ingredients'>${menu.ingredients}</p>
    <p class='price'>$${menu.price}</p>
    </div>
    <div class='add'>
                    <button  class="food-item-add" data-add="${menu.name}"  id="btn${menu.id}">+</button>
     </div>            
              </div>
                    `;
  });

  return feedHtml;
}
document.getElementById("feed").innerHTML = getFeedHtml();

let sum = 0;
let addButton = document.querySelectorAll(".food-item-add");
let result = document.getElementById("basket");

let checkOutForm = [];
let finalPreis;
addButton.forEach((e) => {
  e.addEventListener("click", function (e) {
    function getOrders() {
      let orders;
      menuArray.forEach(function (menu) {
        for (let i = 0; i < menuArray.length; i++) {
          if (menuArray[i].name == e.currentTarget.dataset.add) {
            finalPreis = 0;
            orders = "";
            orders += `<div class='user-choices'> 
            <span class="order-name">${menuArray[i].name}</span>
            <span class="order-price">$${menuArray[i].price}</span>
            </div>`;
            finalPreis += menuArray[i].price;
          }
        }
      });
      sum += finalPreis;
      return orders;
    }

    checkOutForm.push(getOrders());
    createCheckOutLabel();
  });
});

function createCheckOutLabel() {
  let checkOutLabelHeading = document.createElement("h2");
  checkOutLabelHeading.innerHTML = "Your order";

  result.innerHTML = checkOutForm;

  let checkOutTotalPrice = document.createElement("div");
  checkOutTotalPrice.className = "check-out";

  let totalText = document.createElement("div");
  let totalTextSmall = document.createTextNode("Total Price :");
  totalText.append(totalTextSmall);
  checkOutTotalPrice.append(totalText);

  let totalPrice = document.createElement("div");
  let totalPriceText = document.createTextNode(`$${sum}`);
  totalPrice.append(totalPriceText);
  checkOutTotalPrice.append(totalPrice);

  let checkoutButton = document.createElement("div");
  checkoutButton.className = "checkout-button";
  checkoutButton.innerHTML = "Complete Order";

  checkOutTotalPrice.append(totalPrice);
  result.prepend(checkOutLabelHeading);
  result.append(checkOutTotalPrice);
  result.append(checkoutButton);

  let creditCardForm = document.querySelector(".card-details form");
  let mainContent = document.querySelector(".content");
  let exitButton = document.querySelector(".exit-button");
  let finalMessage = document.querySelector(".final-message");
  let inputName = document.getElementById("fullName");

  checkoutButton.onclick = function () {
    creditCardForm.style.display = "flex";
    addButtonDisable();
  };
  exitButton.onclick = function () {
    creditCardForm.style.display = "none";
    mainContent.className = "content";
  };
  creditCardForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let nameSpan = document.querySelector(".final-message span");
    creditCardForm.style.display = "none";
    mainContent.className = "content";
    finalMessage.style.display = "flex";
    result.style.display = "none";
    nameSpan.innerHTML = inputName.value;
  });
}

function addButtonDisable() {
  addButton.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
}
