import express from "express";

const ProductsRouter = express.Router();

// Home page route.
ProductsRouter.get('/', (req, res) => {
  res.send('gola pr');
});

// Home page route.
ProductsRouter.get('/all', (req, res) => {
  res.send('all');
});

// About page route.
ProductsRouter.get('/one', (req, res) => {
  res.send('one');
});

export default ProductsRouter;
