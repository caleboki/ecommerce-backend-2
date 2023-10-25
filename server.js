const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

let products = []; // In-memory storage for products
let productId = 1; // Simple counter for product ID

let orders = []; // In-memory storage for orders
let orderId = 1; // Simple counter for order ID

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Redirect from home to products
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Products API
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

app.post('/products', (req, res) => {
    const product = {
        id: productId++,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.status(201).json(product);
});

app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Product not found');
    products.splice(index, 1);
    res.status(204).send();
});

// Orders API
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
});

app.post('/orders', (req, res) => {
  const order = {
      id: orderId++,
      productId: req.body.productId,
      quantity: req.body.quantity
  };
  orders.push(order);
  res.status(201).json(order);
});

app.put('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');
  order.productId = req.body.productId;
  order.quantity = req.body.quantity;
  res.json(order);
});

app.delete('/orders/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Order not found');
  orders.splice(index, 1);
  res.status(204).send();
});

const sampleProducts = [
  { id: productId++, name: 'Laptop', price: 1000 },
  { id: productId++, name: 'Smartphone', price: 500 },
  { id: productId++, name: 'Headphones', price: 100 }
];

const sampleOrders = [
  { id: orderId++, productId: 1, quantity: 2 },
  { id: orderId++, productId: 2, quantity: 1 },
  { id: orderId++, productId: 3, quantity: 3 }
];

function initializeSampleData() {
  products.push(...sampleProducts);
  orders.push(...sampleOrders);
}

initializeSampleData();


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
