const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'products';
const client = new MongoClient(mongoUrl);

app.use(express.static('public'));
app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const products = await db.collection('products').find({}).toArray();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

app.post('/products', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('products').insertOne(req.body);
        res.status(201).json({ uri: `/products/${result.insertedId}` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('products').updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        if (result.modifiedCount === 1) {
            res.json({ uri: `/products/${req.params.id}` });
            } else {
            res.status(404).send('Product not found');
            }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('products').deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
