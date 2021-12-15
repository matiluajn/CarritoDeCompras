let producto = [{
        id: 1,
        nombre: "Fernet",
        precio: 950,
        imagen: "./img/fernet.jpg",
    },
    {
        id: 2,
        nombre: "Heineken",
        precio: 750,
        imagen: "./img/heineken.jpeg",
    },
    {
        id: 3,
        nombre: "Quilmes",
        precio: 900,
        imagen: "./img/quilmes.jpg",
    },
    {
        id: 4,
        nombre: "Sky",
        precio: 450,
        imagen: "./img/sky.jpg",
    },
    {
        id: 5,
        nombre: "Six Pack",
        precio: 500,
        imagen: "./img/sixpack.jpg",
    },
    {
        id: 6,
        nombre: "Whisky",
        precio: 4500,
        imagen: "./img/whisky.jpg",
    },
    {
        id: 7,
        nombre: "Coca",
        precio: 500,
        imagen: "./img/coca.jpg",
    },
    {
        id: 8,
        nombre: "Sprite",
        precio: 550,
        imagen: "./img/sprite.jpg",
    },
];
const contenedor = document.getElementById("containerMain")

function cargarProductos() {

    producto.forEach((producto) => {
        card = document.createElement("div");
        card.classList.add("card", "col-sm-12", "col-lg-3", "container", "item");
        card.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top item-image" alt="...">
        <div class="card-body">
          <h5 id="nombre" class="card-title item-title">${producto.nombre}</h5>
          <p class="card-text item-price">$${producto.precio}</p>
          <button  type="button" class="btn btn-primary addToCart">Añadir al carrito</button>
        </div>
         `;
        nombre = document.getElementById("nombre");
        precio = document.getElementsByClassName("card-text");


        contenedor.appendChild(card);
    });

};

cargarProductos();





//Agregar al carrito

const addToShoppingCarButtons = document.querySelectorAll('.addToCart');
addToShoppingCarButtons.forEach((addToCardButton) => {
    addToCardButton.addEventListener('click', addToCartClicked);

});
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item');


    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;
    console.log(itemTitle, itemPrice, itemImage)

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
};

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${itemImage} class="shopping-cart-image">
                  <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
              </div>
          </div>
          <div class="col-4">
              <div
                  class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                      value="1">
                  <button class="btn btn-danger buttonDelete" type="button">X</button>
              </div>
          </div>
      </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeShoppingCartItem);

    shoppingCartRow
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', quantityChanged);

    updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}