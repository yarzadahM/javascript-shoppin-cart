let labelElement = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
console.log(shopItemData);
// for storing selected data
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
      <div class="cart-item">
       <img style="width:120px; height:120px" src='${img}'/>
       <div class="details">
       <div class="title-price-x">
       <h4 class="title-price">
       <p>${
        name}</p>
       <p class="cart-item-price">$ ${
        price}</p>
       </h4>
       <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
       </div>
        <div class="buttons">
              <i  onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div  id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
       <h3>$ ${item * 
        price}</h3>
       </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    labelElement.innerHTML = `<h2>Cart is Empty</h2>
    <a href="index.html">
    <button class="homeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItem();

let increment = (id) => {
  let search = basket.find((item) => item.id === id);
  if (!search) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item++;
  }
  generateCartItem();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((i) => i.id === id);
  if (!search) return;
  else if (search.item === 0) return;
  else {
    search.item--;
  }
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((i) => i.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  basket = basket.filter((i) => i.id !== id);
  generateCartItem();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItem();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket) {
    let amount = basket
      .map((i) => {
        let { item, id } = i;
        let search = shopItemData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    labelElement.innerHTML = `<h2>Total Bill : $ ${amount}</h2>
    <a href="index.html">
    <button class="checkout">Checkout</button>
    </a>
    <button class="removeAll" onclick="clearCart()">Clear Cart</button>

    `;
  } else {
  }
};
totalAmount();
