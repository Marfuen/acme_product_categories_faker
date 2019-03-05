import React from 'react';

const List = ({ categories, createProducts, deleteCategory, deleteProduct })=> {
  return (
    <ul className="list-group">
      {
        categories.map( category => {
          return (
            <li key={ category.id } className="list-group-item">
              { category.name }
              <button className="btn btn-success btn-sm" onClick={()=> createProducts(category.id)} type="submit"> +</button>
              <button className="btn btn-danger btn-sm"onClick={()=> deleteCategory(category.id)} type="submit"> - </button>
              <ul className="list-group">
                {category.products.map(product =>
                  <li className="list-group-item " key={product.id}> {product.name} <button className="btn btn-danger btn-sm"onClick={()=> deleteProduct(product.id)} type="submit"> - </button></li>
                )}
              </ul>
            </li>
          );
        })
      }
    </ul>
  );
};

export default List;
