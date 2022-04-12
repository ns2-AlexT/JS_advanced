class CatalogOfGood {
    constructor(container = '.container_for_goods') {
        this.container = document.querySelector(container);
        this.list_of_goods = [];
        this._addGoods();
    }

    _addGoods() {
        this.list_of_goods = [
            {id: 1, title: 'Notebook', price: 2000, img_sourse: "img/good_3.svg"},
            {id: 2, title: 'Mouse', price: 20, img_sourse: "img/good_2.svg"},
            {id: 3, title: 'Keyboard', price: 200, img_sourse: "img/good_3.png"},
            {id: 4, title: 'Gamepad', price: 50, img_sourse: "img/good_4.svg"},
        ];
    }

    render() {
        for (let good of this.list_of_goods) {
            const makeGoogObject = new GoodItem(good);
            this.container.insertAdjacentHTML('beforeend', makeGoogObject.makeHTML());
        }
    }

    countTotalPrice() {
        let sum = 0;
        this.list_of_goods.forEach(function (item) {sum += item.price});
        return sum;
    }
}

class GoodItem {
    constructor(good) {
        this.id = good.id;
        this.title = good.title;
        this.price = good.price;
        this.img = good.img_sourse;
    }

    makeHTML() {
        return `<div class="block_of_good">
                <img class="good_img_" src=${this.img} onError="this.img='good_default.png'">
<!--                onerror="src=this.img_default"-->
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p>price: ${this.price}</p>
                    <a href="#" class="top_buttion">Buy now</a>
                </div>
            </div>`
    }
}

// Class of good in basket
class GoodItemBasket extends GoodItem{
    constructor(good, quantity){
        super(good);
        this.quantity = quantity;
    }
}
// // Class of basket
class Basket{
    constructor(container = '.basket'){
        this.container = container;
        this.basket_items = [];
    }
    _delItem(){
    }
    _addItem(){
    }
    _countSumOfItem(){
    }
    totalPriceOfBasket(){
    }
}

let make_list = new CatalogOfGood()
make_list.render()
console.log('Total price is ', make_list.countTotalPrice())
