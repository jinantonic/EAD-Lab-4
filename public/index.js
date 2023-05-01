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
        const productFilter = JSON.parse(decodeURIComponent(req.query["searchParams"]));
        console.log(productFilter);
        let query = {};
        if (req.query["allCheck"] === 'true') {
            const andFilter = [];
            if (productFilter.title !== '') { andFilter.push({ title: { $regex: productFilter.title, $options: "i" }}); }
            if (productFilter.category !== '') { andFilter.push({ category: { $regex: productFilter.category, $options: "i" }}); }
            if (productFilter.price !== '') { andFilter.push({ price: { $lte: productFilter.price }}); }
            if (productFilter.discountPercentage !== '') { andFilter.push({ discountPercentage: { $gte: productFilter.discountPercentage }}); }
            if (productFilter.rating !== '') { andFilter.push({ rating: { $gte: productFilter.rating }}); }
            if (productFilter.stock !== '') { andFilter.push({ stock: { $gte: productFilter.stock }}); }
            if (productFilter.brand !== '') { andFilter.push({ brand: { $regex: productFilter.brand, $options: "i" }}); }
            query = { $and: andFilter };
            
        } else if (productFilter.brand !== '') {
            query = { brand: { $regex: productFilter.brand, $options: "i" }};
        } else if (productFilter.category !== '') {
            query = { category: { $regex: productFilter.category, $options: "i" }};
        } else if (productFilter.title !== '') {
            query = { title: { $regex: productFilter.title, $options: "i" }};
        } else if (productFilter.price !== '') {
            query = { price: { $lte: productFilter.price }}; // smaller than
        } else if (productFilter.discountPercentage !== '') {
            query = { discountPercentage: { $gte: productFilter.discountPercentage }};
        } else if (productFilter.rating !== '') {
            query = { rating: { $gte: productFilter.rating }};
        } else if (productFilter.stock !== '') {
            query = { stock: { $gte: productFilter.stock }};
        } 

        const products = await Product.find(query);
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