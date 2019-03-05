import React, { Component } from "react";
import List from "./List";
import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      categories: []
    }
    this.createCategories = this.createCategories.bind(this);
    this.createProducts = this.createProducts.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  createCategories(){
    axios.post('/api/categories')
      .then(() => {
        axios.get('/api/categories')
          .then(response => response.data)
          .then(categories => this.setState({ categories }))
      })
      .catch(e => console.log(e))
  }
  createProducts(categoryId){
    axios.post(`/api/categories/${categoryId}/products`)
      .then(response => response.data)
      .then(() => {
        axios.get('/api/categories')
          .then(response => response.data)
          .then(categories => this.setState({ categories }))
      })
      .catch(e => console.log(e));
  }
  deleteCategory(id){
    axios.delete(`api/categories/${id}`)
      .then(() => {
        axios.get('/api/categories')
          .then(response => response.data)
          .then(categories => this.setState({ categories }))
      })
  }
  deleteProduct(id){
    axios.delete(`api/products/${id}`)
      .then(() => {
        axios.get('/api/categories')
          .then(response => response.data)
          .then(categories => this.setState({ categories }))
      })
  }
  componentDidMount(){
    console.log("did mount!")
    axios.get('/api/categories')
      .then(response => response.data)
      .then(categories => this.setState({ categories }))
      .catch(e => console.log(e));

  }
  render(){
    return(
      <div>
        <h1>Acme Acme Categories and Products by faker</h1>
        <button className="btn btn-primary"onClick={ this.createCategories } type="submit"> Create category </button>
        <List categories={ this.state.categories } createProducts={ this.createProducts } deleteCategory={ this.deleteCategory } products={this.state.products} deleteProduct={this.deleteProduct}/>
      </div>
    );
  }
}

export default App;
