const express = require('express');
const app = express();
const mongoose = require('mongoose');
let currentId = 0;

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        Product.findOne({}, {}, { sort: { '_id' : -1 } })
        .then(product => { currentId = product.id; })
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

const ProductSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String]
});

const Product = mongoose.model('Product', ProductSchema);

app.use(express.static('public'));
app.use(express.json());


app.get('/products', async (req, res) => {
    try {
        const productFilter = JSON.parse(decodeURIComponent(req.query["productName"]));
        console.log(productFilter);
        const products = await Product.find(productFilter);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = {
            id: ++currentId,
            ...req.body
        };
        Product.create(product);
        res.status(201).json({ uri: `/products/${product._id}` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const result = await Product.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        if (result.modifiedCount === 1) {
            res.json({ uri: `/products/${req.params.id}` });
        } else {
            res.status(404).send('Product not found!');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const result = await Product.findOneAndDelete({ _id: req.params.id });
        if (result.deletedCount === 1) {
            currentId--;
            res.sendStatus(204);
        } else {
            res.status(404).send('Product not found!');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
