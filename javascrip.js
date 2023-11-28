let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.shopping');


openShopping.addEventListener('click',()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click',()=>{
    body.classList.remove('active');
})


let product=[
    {
        id:1,
        name:"Hamburger",
        img: "img/Hamburger1.png",
        price:80000
    },
    {
        id:2,
        name:"HotDog",
        img:"Hamburger1.png",
        price:300000

    },
    {
        id:3,
        name:"IceCream",
        img:"img/Hamburger1.png",
        price:15000

    },
    {
        id:3,
        name:"IceCream",
        img:"img/Hamburger1.png",
        price:1500000
    }
];

let listCards=[];


function initApp(){
    const list = document.querySelector('.list');
    list.innerHTML = ''; // Clear previous content
    product.forEach((value,key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML=` 
        <img src="${value.img}" alt="${value.name}"/>
        <div class="title">${value.name}</div>
        <div class= "price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Card</button>
        `;
       
        list.appendChild(newDiv);
    })
}






function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = product[key];
        listCards[key].quantity = 1;
    }
    reloadCard();
}



function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    for (const key in listCards) {
        if (listCards.hasOwnProperty(key)) {
            const value = listCards[key];
            totalPrice =totalPrice + value.price * value.quantity;
            count =count+ value.quantity;

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${value.img}" alt="${value.name}"/>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div></div>
                    <span class="count">${value.quantity}</span>

                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    
                </div>
            `;

            listCard.appendChild(listItem);
        }
    }

    // Update the total and quantity elements
    document.querySelector('.total').textContent = totalPrice.toLocaleString();
    document.querySelector('.quantity').textContent = count;
}

function changeQuantity(key,quantity){
        if(quantity==0){
            delete listCards[key];
        
        }else{
            listCards[key].quantity=quantity;
            
        }
        reloadCard();
}

function sortProductsByPrice() {
    product.sort((a, b) => a.price - b.price);
    initApp();
}

document.getElementById('sortButton').addEventListener('click', sortProductsByPrice);

