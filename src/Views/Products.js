import React, { Component } from "react"
import ProductCard from "../UIComponents/ProductCard/index.js"
import axios from "axios"

class Products extends Component{
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.getProducts()
  }

  async getProducts() {
    const response = await axios.get('https://el-proveedor.firebaseio.com/Productos.json?auth=2Y7n7SAQmhK4j4TnyWunF1Qwjb4uqONCZWfgyB0U'
    );
    this.setState({ products: Object.values(response.data) });
  }

  render() {
    return (
      <div className="products">
        <h1>Productos</h1>
        <div className="products__list">
          { this.state.products.map((product, index) => <ProductCard data={product} key={`product${index}`} />)}
        </div>
      </div>
    )
  }
}

export default Products
