import React, { useState } from "react"
import { Form, Input, Button, message, Select, Popconfirm } from 'antd';
import {database} from "../../database.js"
import "./style.css"

const { Option } = Select;

const ProductCard = ({onRemove, data, categories, form}) => {

  const { getFieldDecorator } = form;
  
  const updateProduct = (e) => {
    e.preventDefault();
    const newProduct = Object.assign({}, data, form.getFieldsValue())
    database.ref(`Productos/${data.key}`).update(newProduct)
    message.success("Producto actualizado")
  }

  const confirm = () => {
    deleteProduct()
  }

  const cancel = () => {

  }

  const deleteProduct = () => {
    database.ref(`Productos/${data.key}`).remove()
    onRemove(data.key)
  }

  return (
    <div className="product_card">
      <figure className="product_card__photo">
        <img src={data.imagenURL}></img>
      </figure>
      <Form onSubmit={updateProduct} className="product_card__content">
        {getFieldDecorator('codigo', { initialValue: data.codigo })(<Input placeholder="Codigo" />)}
        {getFieldDecorator('categoria', { initialValue: data.categoria })(
        <Select>
          {categories.map(category => <Option key={`product_card_category_${category.categoria}`} value={category.categoria}>{category.categoria}</Option>)}
        </Select>)}
        {getFieldDecorator('nombre', { initialValue: data.nombre })(<Input placeholder="Nombre"/>)}
        {getFieldDecorator('precio4', { initialValue: data.precio4 })(<Input placeholder="Precio"/>)}
        {getFieldDecorator('categoria', { initialValue: data.categoria })(<Input placeholder="Categoria"/>)}
        {/* {getFieldDecorator('position', { initialValue: data.position})(<Input placeholder="Posicion"/>)} */}
        <Button type="primary" block htmlType="submit">
          Guardar
        </Button>
        <Popconfirm
          title="Estas seguro de eliminar?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" block>
            Eliminar
          </Button>
        </Popconfirm>
      </Form>
    </div>
  )
}

export default Form.create({ name: 'update_product' })(ProductCard)
