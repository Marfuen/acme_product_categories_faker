const { Product } = require("./Product");
const { Category } = require("./Category");
const db = require("../db");
const faker = require("faker");
let data = [];

for(let i = 0; i < 10; i++){
  let curName = faker.commerce.productName();
  data.push({name: curName});
}


const syncAndSeed = () => {
  return db.sync({ force: true })
    .then(() => {
      return Category.create({name: faker.commerce.department()})
      .then((cat) => {
        return Promise.all([
          Product.create({name: faker.commerce.productName(), categoryId: cat.id}),
          Product.create({name: faker.commerce.productName(), categoryId: cat.id}),
          Product.create({name: faker.commerce.productName(), categoryId: cat.id}),
        ]);
      })
      .catch(e => console.log(e))
    })
}

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  db,
  syncAndSeed,
  Product,
  Category
}
