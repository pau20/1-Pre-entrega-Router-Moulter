const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Ruta raíz POST / para crear un nuevo carrito
router.post('/', (req, res) => {
  const cart = {
    id: uuidv4(),
    products: []
  };

  fs.readFile('carrito.json', (err, data) => {
    if (err) {
      fs.writeFile('carrito.json', JSON.stringify([cart]), (err) => {
        if (err) throw err;
        console.log('Nuevo carrito creado');
        res.send(cart);
      });
    } else {
      const carts = JSON.parse(data);
      carts.push(cart);
      fs.writeFile('carrito.json', JSON.stringify(carts), (err) => {
        if (err) throw err;
        console.log('Nuevo carrito creado');
        res.send(cart);
      });
    }
  });
});


// Ruta POST /:cid/product/:pid para agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    fs.readFile('carrito.json', (err, data) => {
      if (err) {
        console.log('Error al leer archivo de carrito');
        res.status(500).send('Error interno del servidor');
      } else {
        const carts = JSON.parse(data);
        const cart = carts.find((c) => c.id === cid);
  
        if (!cart) {
          console.log(`No se encontró un carrito con el id ${cid}`);
          res.status(404).send('Carrito no encontrado');
        } else {
          fs.readFile('productos.json', (err, data) => {
            if (err) {
              console.log('Error al leer archivo de productos');
              res.status(500).send('Error interno del servidor');
            } else {
              const products = JSON.parse(data);
              const product = products.find((p) => p.id === pid);
  
              if (!product) {
                console.log(`No se encontró un producto con el id ${pid}`);
                res.status(404).send('Producto no encontrado');
              } else {
                const existingProduct = cart.products.find((p) => p.product === pid);
  
                if (existingProduct) {
                  existingProduct.quantity += quantity;
                } else {
                  cart.products.push({
                    product: pid,
                    quantity: quantity
                  });
                }
  
                fs.writeFile('carrito.json', JSON.stringify(carts), (err) => {
                  if (err) throw err;
                  console.log(`Producto con id ${pid} agregado al carrito con id ${cid}`);
                  res.send(cart);
                });
              }
            }
          });
        }
      }
    });
  });

// Ruta GET /:cid para listar los productos de un carrito
router.get('/:cid', (req, res) => {
  const { cid } = req.params;

  fs.readFile('carrito.json', (err, data) => {
    if (err) {
      console.log('Error al leer archivo de carrito');
      res.status(500).send('Error interno del servidor');
    } else {
      const carts = JSON.parse(data);
      const cart = carts.find((c) => c.id === cid);

      if (!cart) {
        console.log(`No se encontró un carrito con el id ${cid}`);
        res.status(404).send('Carrito no encontrado');
      } else {
        res.send(cart.products);
      }
    }
  });
});




        
  
