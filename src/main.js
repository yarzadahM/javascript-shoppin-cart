let shopelment = document.getElementById("shop");

// for storing selected data
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
  return (shopelment.innerHTML = shopItemData
    .map((item) => {
      let { id, name, desc, price, img } = item;
      let search = basket.find((i) => i.id === id) || [];
      return ` <div id=product-id-${id}  class="item">
        <img  src=${img} alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i  onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div  id=${id} class="quantity">${
        !search.item ? 0 : search.item
      }</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};
generateShop();

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
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((i) => i.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
