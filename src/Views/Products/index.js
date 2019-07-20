import React, { Component } from "react"
import { Link } from "react-router-dom"
import { database } from "../../database.js"
import { Select, Button, Row } from "antd"
import ProductCard from "../../UIComponents/ProductCard/index.js"
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

  deleteProduct(key) {
    const newProducts = this.state.products.filter(product => product.key !== key)
    this.setState({ products: newProducts });
  }

  render() {
    return (
      <div className="products">
        <Row type="flex" justify="space-between">
          <Select placeholder="Categorias" style={{ width: 120 }} onChange={this.handleChangeCategory.bind(this)}>
            {this.state.categories.map(category => (<Option value={category.categoria} key={`category_${category.categoria}`}>{category.categoria}</Option>))}
          </Select>
          <Link to="/products/new">
            <Button type="primary">
              Crear producto
            </Button>
          </Link>
        </Row>
        <br/>
        <div className="products__list">
          { this.state.products.map(product => <ProductCard data={product} categories={this.state.categories} key={`product${product.key}`} onRemove={this.deleteProduct.bind(this)}/>)}
        </div>
      </div>
    )
  }
}

export default Products
