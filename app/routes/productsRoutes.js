//configuramos las rutas requeridas para el manejo de productos. 

const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

router.get('/', (req, res) => {
  // listar todos los productos de la base
  const limit = req.query.limit;
  let productList = products;
  
  if (limit) {
    productList = products.slice(0, limit);
  }
  
  res.json(productList);
});

router.get('/:pid', (req, res) => {
  // traer solo el producto con el id proporcionado
  const productId = req.params.pid;
  const product = products.find(p => p.id == productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

router.post('/', (req, res) => {
   // agregar un nuevo producto con los campos especificados
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  const newProduct = {
    id: Date.now(),
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails
  };
  
  if (!title || !description || !code || !price || !stock || !category) {
    res.status(400).send('Missing required fields');
  } else {
    products.push(newProduct);
    res.json(newProduct);
  }
});

router.put('/:pid', (req, res) => {
   // actualizar el producto con los campos enviados desde body
  const productId = req.params.pid;
  const productIndex = products.findIndex(p => p.id == productId);
  
  if (productIndex === -1) {
    res.status(404).send('Product not found');
  } else {
    const { id, ...product } = req.body;
    products[productIndex] = { ...products[productIndex], ...product };
    res.json(products[productIndex]);
  }
});

router.delete('/:pid', (req, res) => {
  // eliminar el producto con el pid indicado
  const productId = req.params.pid;
  const productIndex = products.findIndex(p => p.id == productId);
  
  if (productIndex === -1) {
    res.status(404).send('Product not found');
  } else {
    products.splice(productIndex, 1);
    res.sendStatus(204);
  }
});


module.exports = router;