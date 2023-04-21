const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//Ahora, debemos crear un router para los 
//endpoints de /products y agregarlo a nuestro servidor.

const productRouter = require('./routes/productRoutes.js');

app.use('/api/products', productRouter);

// Configuramos body-parser para que pueda parsear 
//los datos que nos lleguen desde el cliente:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Creamos nuestro router para manejar las rutas de productos 
// y lo montamos en la ruta /api/products:

const productsRouter = express.Router();
app.use('/api/products', productsRouter);

//configuramos la ruta para el manejo de productos

// Listar todos los productos
productsRouter.get('/', (req, res) => {
    // Implementación pendiente
  });
  
  // Traer solo el producto con el id proporcionado
  productsRouter.get('/:pid', (req, res) => {
    // Implementación pendiente
  });
  
  // Agregar un nuevo producto
  productsRouter.post('/', (req, res) => {
    // Implementación pendiente
  });
  
  // Actualizar un producto
  productsRouter.put('/:pid', (req, res) => {
    // Implementación pendiente
  });
  
  // Eliminar un producto
  productsRouter.delete('/:pid', (req, res) => {
    // Implementación pendiente
  });


  // Configurar las rutas para el manejo de carritos
  const cartRouter = require('./routes/cart');
  app.use('/api/carts', cartRouter);
  
  // Escuchar en el puerto 8080
  app.listen(8080, () => {
    console.log('Servidor escuchando en puerto 8080');
  });
  
//   Creamos nuestro router para manejar las rutas de 
//   carritos y lo montamos en la ruta /api/carts:

const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

//Configuramos las rutas para el manejo de carritos:
// Crear un nuevo carrito
cartsRouter.post('/', (req, res) => {
    // Implementación pendiente
  });
  
  // Listar los productos de un carrito
  cartsRouter.get('/:cid', (req, res) => {
    // Implementación pendiente
  });
  
  // Agregar un producto a un carrito
  cartsRouter.post('/:cid/product/:pid', (req, res) => {
    // Implementación pendiente
  });
  


// Configuración del análisis de cuerpo de solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas de productos y carritos
app.use('/api/productos', productosRoutes);
app.use('/api/carritos', carritosRoutes);
