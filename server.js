const express = require("express");
const app = express();
const { syncAndSeed, Category, Product } = require("./models/index");
const myPort = process.env.PORT || 3000;
const path = require("path");
const faker = require("faker");

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/categories', (req, res, next)=> {
  Category.findAll({include: [Product]})
    .then(categories => res.send(categories))
    .catch(next);
});

app.post('/api/categories', (req, res, next)=> {
  Category.create({name: faker.commerce.department()})
    .then((category) => res.send(category))
    .catch(next);
});

app.post('/api/categories/:id/products', (req, res, next)=> {
  Product.create({name: faker.commerce.productName(), categoryId: req.params.id})
    .then(product => res.send(product))
    .catch(next);
});

app.delete('/api/categories/:id', (req,res,next)=>{
  Category.destroy({where: {id: req.params.id}})
    .then(() => res.send(204))
    .catch(next);
});

app.delete('/api/products/:id', (req,res,next)=>{
  Product.destroy({where: {id: req.params.id}})
    .then(() => res.send(204))
    .catch(next);
});





syncAndSeed()
  .then(() => {
    app.listen(myPort, ()=>{
      console.log(`App runnning on port ${myPort}`);
    })
  })
  .catch(e => console.error(e));

