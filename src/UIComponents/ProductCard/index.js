import React, { Component } from "react"
import { Input, Button } from 'antd';
import {database} from "../../database.js"
import "./style.css"

class ProductCard extends Component {
  constructor(props) {
    super(props)
  }

  updateProduct() {
    database.ref(`Productos/${this.props.data.key}`).update(this.props.data)
  }

  render() {
    return (
      <div className="product_card">
        <figure className="product_card__photo">
          <img src={this.props.data.imagenURL}></img>
        </figure>
        <div className="product_card__content">
          <Input placeholder="Codigo" defaultValue={this.props.data.codigo}/>
          <Input placeholder="Nombre" defaultValue={this.props.data.nombre}/>
          <Input placeholder="Precio" defaultValue={this.props.data.precio4}/>
          <Input placeholder="Categoria" defaultValue={this.props.data.categoria}/>
          <Input placeholder="Posicion" defaultValue={this.props.data.position}/>
          <Button type="primary" block onClick={this.updateProduct.bind(this)}>
            Guardar
          </Button>
        </div>
      </div>
    )
  }
}

export default ProductCard
