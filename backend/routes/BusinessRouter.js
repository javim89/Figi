import express from "express";

const BusinessRouter = express.Router();

// Home page route.
BusinessRouter.get('/', (req, res) => {
  res.send('gola bus');
});

// Home page route.
BusinessRouter.get('/all', (req, res) => {
  res.send('all');
});

// About page route.
BusinessRouter.get('/one', (req, res) => {
  res.send('one');
});

export default BusinessRouter;
