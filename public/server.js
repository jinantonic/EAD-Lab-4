const express = require('express'); // import express
const app = express(); // create express app
const mongoose = require('mongoose'); // import mongoose
let currentId = 0; // current ID of the product

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true, useUnifiedTopology: true }) // connect to the database
    .then(() => { // if the connection is successful,
        Product.findOne({}, {}, { sort: { '_id' : -1 } }) // find the last product
        .then(product => { currentId = product.id; }) // set the current ID to the last product's ID
    }) // end then
    .catch(err => console.error('Error connecting to MongoDB:', err)); // handle errors

const ProductSchema = new mongoose.Schema({ // define the product schema
    id: Number,
    title: String,
    brand: String,
    price: Number,
    category: String,
    description: String,
    discountPercentage: Number,
    stock: Number,
    rating: Number,
    thumbnail: String,
    images: [String]
}); // end ProductSchema
 
const Product = mongoose.model('Product', ProductSchema); // create the Product model

app.use(express.urlencoded({ // enable parsing of the body of POST requests
    extended: true
})) // end use

app.use(express.static('public')); // serve static files from the public folder
app.use(express.json()); // enable parsing of the body of POST requests

app.get('/products', async (req, res) => { // GET /products
    try { 
        let query = {}; // define the query
        if(req.query["searchParams"]) { // if there are search parameters,
            const productFilter = JSON.parse(decodeURIComponent(req.query["searchParams"])); // parse the search parameters
            
            if (req.query["allCheck"] === 'true') { // if allCheck is true,
                const andFilter = []; // define the and filter
                // if the search parameters are not empty, push the search parameters to the and filter
                if (productFilter.title !== '') { andFilter.push({ title: { $regex: productFilter.title, $options: "i" }}); }
                if (productFilter.category !== '') { andFilter.push({ category: { $regex: productFilter.category, $options: "i" }}); }
                if (productFilter.price !== '') { andFilter.push({ price: { $lte: productFilter.price }}); }
                if (productFilter.discountPercentage !== '') { andFilter.push({ discountPercentage: { $gte: productFilter.discountPercentage }}); }
                if (productFilter.rating !== '') { andFilter.push({ rating: { $gte: productFilter.rating }}); }
                if (productFilter.stock !== '') { andFilter.push({ stock: { $gte: productFilter.stock }}); }
                if (productFilter.brand !== '') { andFilter.push({ brand: { $regex: productFilter.brand, $options: "i" }}); }
                query = { $and: andFilter }; // set the query to the and filter
                
            } else if (productFilter.brand !== '') { // if the brand is not empty,
                query = { brand: { $regex: productFilter.brand, $options: "i" }}; // set the query to the brand
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
            } // end inner if else if
        } else if (req.query["productId"]) { // if there is a product ID,
            if (req.query["productId"] !== '') { // if the product ID is not empty,
                query = {id:req.query["productId"]}; // set the query to the product ID
            } // end inner if
        } // end outer if else if

        const products = await Product.find(query); // find the products that match the query
        res.json(products); // send the products as a JSON response

    } catch (err) {
        console.error(err); // log the error
        res.status(500).send('Internal server error!'); // send an error response
    } // end try catch
}); // end get

app.post('/products', async (req, res) => { // POST /products
    try { 
        const product = { // create a new product
            id: ++currentId,
            ...req.body
        }; // end product
        Product.create(product); // create the product
        res.status(201).json({ uri: `/products/${product._id}` }); // send the URI of the created product as a response

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    } // end try catch
}); // end post

app.put('/products', async (req, res) => { // PUT /products
    try {
        const productId = JSON.parse(decodeURIComponent(req.query["id"])); // parse the product ID
        const result = await Product.findOneAndUpdate( // update the product
            {id:productId},
            req.body
        ); // end findOneAndUpdate
        res.json({ uri: `/products/${req.params.id}` }); // send the URI of the updated product as a response
            
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    } // end try catch
}); // end put

app.delete('/products/:id', async (req, res) => { // DELETE /products/:id
    try {
        const result = await Product.findOneAndDelete({ id: req.params.id }); // delete the product
        res.sendStatus(204); // send a 204 response

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    } // end try catch
}); // end delete

const port = 8080; // define the port
app.listen(port, () => { // listen for requests
    console.log(`Server running on port ${port}.`); // log the port
}); // end listen