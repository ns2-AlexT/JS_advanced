const products = [
    {id: 1, title: 'Notebook', price: 2000, img_sourse: "img/good_3.svg", img_gefault: "img/good_default.png"},
    {id: 2, title: 'Mouse', price: 20, img_sourse: "img/good_2.svg", img_gefault: "img/good_default.png"},
    {id: 3, title: 'Keyboard', price: 200, img_sourse: "img/good_3.png", img_gefault: "img/good_default.png"},
    {id: 4, title: 'Gamepad', price: 50, img_sourse: "img/good_4.svg", img_gefault: "img/good_default.png"},
];

const renderProduct = (item) => {

      return `<div class="block_of_good">
                <img class="good_img_" src=${item.img_sourse} onerror="src='${item.img_gefault}'">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p>price: ${item.price}</p>
                    <a href="#" class="top_buttion">Buy now</a>
                </div>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    document.querySelector('.container_for_goods').innerHTML = productsList.join("");
};

renderPage(products);