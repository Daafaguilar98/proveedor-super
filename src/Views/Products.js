import React, { Component } from "react"
import { database } from "../database.js"
import { Select } from "antd"
import ProductCard from "../UIComponents/ProductCard/index.js"
import axios from "axios"
const { Option } = Select

class Products extends Component{
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: []
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  async getProducts({key, value}) {
    database.ref("/Productos")
      .orderByChild(key)
      .equalTo(value)
      .once("value")
      .then((snapshot) => {
        let products = snapshot.val();
        for(let key in products) {
          products[key].key = key
        }
        this.setState({ products: Object.values(products) });
    })
  }

  async getCategories() {
    const snapshot = await database.ref("/Categorias").once("value")
    this.setState({ categories: Object.values(snapshot.val()) })
  }

  handleChangeCategory(value) {
    this.getProducts({key: "categoria", value})
  }

  render() {
    return (
      <div className="products">
        <h1>Productos</h1>
        <div>
          <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChangeCategory.bind(this)}>
            {this.state.categories.map(category => (<Option value={category.categoria}>{category.categoria}</Option>))}
          </Select>
        </div>
        <div className="products__list">
          { this.state.products.map((product, index) => <ProductCard data={product} key={`product${product.key}`} />)}
        </div>
      </div>
    )
  }
}

export default Products
