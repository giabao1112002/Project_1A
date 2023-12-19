let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".shopping");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let product = [
  {
    id: 1,
    name: "Hamburger",
    img: "img/Hamburger1.png",
    price: 65000,
  },
  {
    id: 2,
    name: "HotDog",
    img: "img/hotdog1.png",
    price: 30000,
  },
  {
    id: 3,
    name: "IceCream",
    img: "img/IC-removebg-preview.png",
    price: 15000,
  },
  {
    id: 4,
    name: "Pizza",
    img: "img/Pizza.JPG",
    price: 120000,
  },
  {
    id: 5,
    name: "Fish Nugget",
    img: "img/FishNugget.JPG",
    price: 20000,
  },
  {
    id: 6,
    name: "Tacco",
    img: "img/Tacco.JPG",
    price: 35000,
  },
];

let product2 = [
  {
    id: 7,
    name: "Banh Mi",
    img: "img/BanhMi-removebg-preview.png",
    price: 25000,
  },
  {
    id: 8,
    name: "Fried Shrimp",
    img: "img/fried-shrimp-prawn-cake-white-plate.jpg",
    price: 40000,
  },
  {
    id: 9,
    name: "Spring Roll",
    img: "img/fried-spring-rolls-cutting-board-removebg-preview.png",
    price: 30000,
  },
  {
    id: 10,
    name: "Fried Chicken Roll",
    img: "img/deep-fried-fhicken-roll-dark-surface-removebg-preview.png",
    price: 45000,
  },
  {
    id: 11,
    name: "Beef Steak",
    img: "img/image-removebg-preview.png",
    price: 99000,
  },
  {
    id: 12,
    name: "Sushi Set",
    img: "img/delicious-sushi-removebg-preview.png",
    price: 40000,
  },
];
let listCards = [];

function initApp() {
  sortButton.style.display = "block";
  sortByNameButton.style.display = "block";
  sortButton2.style.display = "none";
  sortByNameButton2.style.display = "none";
  const list = document.querySelector(".list");
  list.innerHTML = ""; // Clear previous content

  product.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = ` 
            <img src="${value.img}" alt="${value.name}"/>
            <div class="title">${value.name}</div>
            <div class= "price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
            `;

    list.appendChild(newDiv);
  });
}
function initApp2() {
  sortButton2.style.display = "block";
  sortByNameButton2.style.display = "block";
  sortButton.style.display = "none";
  sortByNameButton.style.display = "none";

  const list = document.querySelector(".list");
  list.innerHTML = ""; // Clear previous content

  product2.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = ` 
            <img src="${value.img}" alt="${value.name}"/>
            <div class="title">${value.name}</div>
            <div class= "price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key + 6})">Add To Cart</button>
            `;

    list.appendChild(newDiv);
  });
}

function addToCard(key) {
  try {
    if (listCards[key] == null) {
      listCards[key] = product[key];
      listCards[key].quantity = 1;
    }
  } catch {}
  try {
    if (listCards[key] == null) {
      listCards[key] = product2[key - 6];
      listCards[key].quantity = 1;
    }
  } catch {}

  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  for (const key in listCards) {
    if (listCards.hasOwnProperty(key)) {
      const value = listCards[key];
      totalPrice = totalPrice + value.price * value.quantity;
      count = count + value.quantity;

      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <img src="${value.img}" alt="${value.name}"/>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div></div>
                    <span class="count">${value.quantity}</span>

                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                    
                </div>
            `;

      listCard.appendChild(listItem);
    }
  }

  // Update the total and quantity elements
  document.querySelector(".total").textContent = totalPrice.toLocaleString();
  document.querySelector(".quantity").textContent = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
  }
  reloadCard();
}

function sortProductsByPrice() {
  product.sort((a, b) => a.price - b.price);
  initApp();
}

function sortProductsByPrice2() {
  product2.sort((a, b) => a.price - b.price);
  initApp2();
}

document
  .getElementById("sortButton")
  .addEventListener("click", sortProductsByPrice);
document
  .getElementById("sortButton2")
  .addEventListener("click", sortProductsByPrice2);

function sortProductsByName() {
  return product.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}
function sortProductsByName2() {
  return product2.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

document
  .getElementById("sortByNameButton")
  .addEventListener("click", function () {
    sortProductsByName();
    initApp();
  });
document
  .getElementById("sortByNameButton2")
  .addEventListener("click", function () {
    sortProductsByName2();
    initApp2();
  });

function order() {
  const name = document.getElementById("namelast").value;
  const phone = document.getElementById("phonelast").value;
  const address = document.getElementById("addresslast").value;
  const total = document.querySelector(".total").innerText;
  if (name.trim() === "" || phone.trim() === "" || address.trim() === "") {
    if (name.trim() === "") {
      document.getElementById("nameerror").innerHTML =
        "Please provide your name";
    } else {
      document.getElementById("nameerror").innerHTML = "";
    }

    if (phone.trim() === "") {
      document.getElementById("phoneerror").innerHTML =
        "Please provide your phone number";
    } else {
      document.getElementById("phoneerror").innerHTML = "";
    }

    if (address.trim() === "") {
      document.getElementById("addresserror").innerHTML =
        "Please provide your address";
    } else {
      document.getElementById("addresserror").innerHTML = "";
    }
  } else {
    displayModal(name, phone, address, total);
  }
}

function closeModal() {
  document.getElementById("successModal").style.display = "none";
  location.reload();
}
function displayModal(name, phone, address, total) {
  const userInfo = document.getElementById("userInfo");
  userInfo.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>Address:</strong> ${address}<br>
    `;

  const totalInfo = document.getElementById("totalInfo");
  totalInfo.innerHTML = `<strong>Total:</strong> ${total}`;

  document.getElementById("successModal").style.display = "block";
}

function showResult() {
  const successModal = document.getElementById("successModal");

  // Retrieve the ul element for displaying the list of products
  let ulElement = successModal.querySelector("#productList");

  if (!ulElement) {
      ulElement = document.createElement("ul");
      ulElement.id = "productList";
      ulElement.className = "list-group";
  } else {
      ulElement.innerHTML = ""; // Clear previous content
  }

  // Loop through listCards to create list items for products
  for (const key in listCards) {
      if (listCards.hasOwnProperty(key)) {
          const value = listCards[key];

          const li = document.createElement("li");
          li.className = "list-group-item";
          li.innerHTML = `
              <img src="${value.img}" alt="${value.name}" style="max-width: 50px;"/>
              <span>${value.name} - Quantity: ${value.quantity} - Price: ${value.price.toLocaleString()}</span>
          `;

          ulElement.appendChild(li);
      }
  }

  // Append the product list to the modal content
  successModal.querySelector(".custom-modal-content").appendChild(ulElement);
}

function navigateTo(url) {
  window.location.href = url; // Redirect to the specified URL
}

