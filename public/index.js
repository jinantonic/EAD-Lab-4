const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Product = mongoose.model('Product', ProductSchema);

app.use(express.static('public'));
app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ uri: `/products/${product._id}` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const result = await Product.updateOne(
            { _id: req.params.id },
            { $set: req.body }
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
        const result = await Product.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
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
