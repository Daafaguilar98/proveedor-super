import React, { useEffect, useState } from "react";
import { Row, List, Form, Button, Typography, Input, Col } from "antd";
import { database } from "../database.js";
import { useStateValue, useApi } from "store";

const { Text } = Typography;

const Categories = ({ form }) => {
  const { getFieldDecorator } = form;

  const { getCategories } = useApi();
  const [{ categories }, dispatch] = useStateValue();

  useEffect(() => {
    getCategories();
  }, []);

  const createCategory = async e => {
    e.preventDefault();
    const { key } = await database
      .ref(`Categorias`)
      .push(form.getFieldsValue());
    dispatch({
      type: "SET_CATEGORIES",
      payload: [...categories, Object.assign({ key }, form.getFieldsValue())]
    });
    form.resetFields();
  };

  const deleteCategory = async ({ key }) => {
    database.ref(`Categorias/${key}`).remove();
    const newCategories = categories.filter(category => category.key !== key);
    dispatch({
      type: "SET_CATEGORIES",
      payload: newCategories
    });
  };

  return (
    <List
      header={
        <Row type="flex" justify="space-between">
          <Text>Listado de categorias</Text>
          <Form layout="inline" onSubmit={createCategory}>
            <Form.Item>
              {getFieldDecorator("categoria")(
                <Input placeholder="Nombre de la categoria" />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear
              </Button>
            </Form.Item>
          </Form>
        </Row>
      }
      bordered
      dataSource={categories}
      renderItem={item => (
        <List.Item key={`category${item.key}`}>
          <Row className="category__row" type="flex" justify="space-between">
            <Col>
              <Text mark>[CATEGORIA]</Text>
              <Text>{item.categoria}</Text>
            </Col>
            <Button type="danger" onClick={() => deleteCategory(item)}>
              Delete
            </Button>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default Form.create({ name: "categories" })(Categories);
