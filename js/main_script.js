const mainUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const makeGETRequest = (url, callback) => {
    return new Promise((resolve) => {
            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
            }
            xhr.open('GET', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        console.log('Error ', xhr.status)
                    } else callback(xhr.responseText);
                    resolve();
                }
            }
            xhr.send();
        }
    )
}


class CatalogOfGood {
    constructor(container = '.container_for_goods') {
        this.container = document.querySelector(container);
        this.list_of_goods = [];
        this._addGoods().then((context) => {
            this.list_of_goods = context;
            this._render();
        });

    }

    _addGoods() {
        return fetch(`${mainUrl}/catalogData.json`).then
        (
            response => response.json()
        ).catch(err => console.log(err));
        // makeGETRequest(`${mainUrl}/catalogData.json`, (dataFromCallback) => {
        //     // this.list_of_goods = JSON.parse(dataFromCallback);
        //     console.log(dataFromCallback)
        //     console.log('1===> ', JSON.parse(dataFromCallback));
    }

    _render() {
        for (let good of this.list_of_goods) {
            const makeGoogObject = new GoodItem(good);
            console.log('GOOD ', good);
            this.container.insertAdjacentHTML('beforeend', makeGoogObject.makeHTML());
        }
    }

    countTotalPrice() {
        let sum = 0;
        this.list_of_goods.forEach(function (item) {
            sum += item.price
        });
        return sum;
    }
}

class GoodItem {
    constructor(good, container = '.block_of_good') {
        this.id = good.id_product;
        this.title = good.product_name;
        this.price = good.price;
        this.img = good.img_sourse;
        this.quantity = good.quantity;
    }


    makeHTML() {
        return `<div class="block_of_good" data-id="${this.id}">
                <img class="good_img_" src=${this.img} onError="this.img='good_default.png'">
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p>price: ${this.price}</p>
                    <button class="top_buttion" data-id="${this.id}" href="#">Buy now</button>
                </div>
            </div>`
    }
}

// Class of good in basket
class GoodItemBasket extends GoodItem {
    constructor(good, quantity) {
        super(good);
        this.good = good;
    }

    makeHTMLForBasket() {
        return `<div class="block_of_good">
<!--                <img class="good_img_" src=${this.img} onError="this.img='good_default.png'">-->
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p>price: ${this.price}</p>
                    <p>quantity: ${this.quantity}</p>
                     <a href="#" class="del_buttion" data-id="${this.id}">X</a>
                </div>
            </div>`
    }
}

// Class of basket
class Basket {
    constructor(container = '.container_for_basket') {
        this.container = document.querySelector(container);
        this.basket_items = [];
        this._getBasketFromServer()
        // this._getBasketFromServer().then((context) => {
        //     this.basket_items = context['contents'];
        //     this._render();
        // });
    }

    getJson(url) {
        return fetch(url ? url : `${mainUrl + url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _getBasketFromServer() {
        //     return fetch(`${mainUrl}/getBasket.json`).then
        //     (response => response.json()).catch(err => console.log(err));
        // }

        makeGETRequest(`${mainUrl}/getBasket.json`, (dataFromCallback) => {
            const dataFromServer = JSON.parse(dataFromCallback)
            console.log('==== ', dataFromServer['contents']);
            this.basket_items = dataFromServer['contents'];
            this._render();
        })
    }


    countTotalPriceOfBasket() {
        let sum = 0;
        this.basket_items.forEach(function (item) {
            sum += item.price * item.quantity
        });
        return sum;
    }

    _render() {
        for (let basketGood of this.basket_items) {
            const basketItem = new GoodItemBasket(basketGood);
            this.container.insertAdjacentHTML('beforeend', basketItem.makeHTMLForBasket());
        }
    }

    static addItem(good_id) {
        console.log('Get from here : ', good_id.dataset['id'])
        let id_good = good_id.dataset['id'];
        make_basket.getJson(`${mainUrl}/addToBasket.json`).then(data => {
            console.log(make_list.list_of_goods);
            let find = make_basket.basket_items.find(basket => basket.id_product === +id_good);
            if (find) {
                console.log('HAVE');
                  find.quantity++;
            } else {
                let find = make_list.list_of_goods.find(basket => basket.id_product === +id_good);
                    make_basket.basket_items.push(find)
                    find.quantity = data.result;
                    // make_basket._render();
            }
        })

    }

    static delItem(good_id) {
        let id_good = good_id.dataset['id'];
        make_basket.getJson(`${mainUrl}/deleteFromBasket.json`).then(data => {
            console.log(make_basket.basket_items);
            let find = make_basket.basket_items.find(basket => basket.id_product === +id_good);
            if (find) {
                find.quantity--;
                // make_basket._render();
            }
            // console.log('!!!=== ', find, '  ', data.result)
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container_for_goods').addEventListener('click', action => {
        if (action.target.classList.contains('top_buttion')) {
            Basket.addItem(action.target)

        }
    })
    document.querySelector(' .container_for_basket').addEventListener('click', action => {
        if (action.target.classList.contains('del_buttion')) {
            Basket.delItem(action.target)
        }
    })
});

let make_list = new CatalogOfGood()
// console.log('Total price is ', make_list.countTotalPrice())

let make_basket = new Basket()
//make_basket.addItem(make_list.list_of_goods[0], 1)
// make_basket.addItem(make_list.list_of_goods[2], 3)
// make_basket.render()
// console.log('Total price of basket is : ', make_basket.countTotalPriceOfBasket())