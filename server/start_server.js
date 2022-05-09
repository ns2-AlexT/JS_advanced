const express = require('express');
const app = express();

const path = require('path');

const fs = require('fs');

app.use(express.json());
app.use('/', express.static('../public/'));

// get all products
app.get('/api/products', (request, response) => {
        console.log('product ===>>> ', path.resolve('/server/app', 'products.json'));
        fs.readFile('../server/DataBases/products.json', 'utf-8', (err, data) => {
            if (err) response.send(JSON.stringify({result: 0, err}));
            else response.send(data);
        });
    }
);

// get all goods in basket
app.get('/api/basket', (request, response) => {
        console.log('basket ===>>> ', path.resolve('/server/app', 'products.json'));
        fs.readFile('../server/DataBases/basket.json', 'utf-8', (err, data) => {
            if (err) response.send(JSON.stringify({result: 0, err}));
            else response.send(data);
        });
    }
);

//add exist good to basket
app.put('/api/cart/:id', (request, response) => {
    fs.readFile('../server/DataBases/basket.json', 'utf-8', (err, data) => {
        if (err) response.send(JSON.stringify({result: 0, err}));
        else {
            const basket = JSON.parse(data);
            const find = basket.contents.find(good => good.id_product === Number(request.params.id)); // req.query // /?dwd=fwf
            find.quantity += request.body.quantity;

            fs.writeFile('../server/DataBases/basket.json', JSON.stringify(basket), (err) => {
                if (err) response.end(JSON.stringify({result: 0, err}));
                else response.end(JSON.stringify({result: 1}));
            });
        }
    });
});

//delete good from basket
app.delete('/api/cart/:id', (request, response) => {
    fs.readFile('../server/DataBases/basket.json', 'utf-8', (err, data) => {
        if (err) response.send(JSON.stringify({result: 0, err}));
        else {
            const basket = JSON.parse(data);
            basket['contents'].splice(request.body.idx, request.body.idx);

            fs.writeFile('../server/DataBases/basket.json', JSON.stringify(basket), (err) => {
                if (err) response.end(JSON.stringify({result: 0, err}));
                else response.end(JSON.stringify({result: 1}));
            });
        }
    });
});

//add new good to basket
app.post('/api/cart', (request, response) => {
    fs.readFile('../server/DataBases/basket.json', 'utf-8', (err, data) => {
        if (err) response.send(JSON.stringify({result: 0, err}));
        else {
            const cart = JSON.parse(data);
            cart.contents.push(request.body);

            fs.writeFile('../server/DataBases/basket.json', JSON.stringify(cart), (err) => {
                if (err) response.end(JSON.stringify({result: 0, err}));
                else response.end(JSON.stringify({result: 1}));
            });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server starts at port ${port}`);
});