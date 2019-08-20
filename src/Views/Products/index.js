import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { Select, Button, Row, Table, Popconfirm, Divider, Tag } from "antd";
import { useStateValue, useApi } from "store";
const { Option } = Select;

const Products = () => {
  const [{ products, categories }, dispatch] = useStateValue();
  const { getProducts, getAllProducts, getCategories } = useApi();

  useEffect(() => {
    getCategories();
  }, []);

  const handleChangeCategory = value => {
    if (value === "all") {
      getAllProducts();
    } else {
      getProducts({ key: "categoria", value });
    }
  };

  const confirm = () => {
    deleteProduct();
  };

  const cancel = () => {};

  const deleteProduct = key => {
    const newProducts = products.filter(product => product.key !== key);
    dispatch({ type: "SET_PRODUCTS", payload: newProducts });
  };

  return (
    <div className="products">
      <Row type="flex" justify="space-between">
        <Select
          placeholder="Categorias"
          style={{ width: 120 }}
          onChange={handleChangeCategory}
        >
          {categories.map(category => (
            <Option
              value={category.categoria}
              key={`category_${category.categoria}`}
            >
              {category.categoria}
            </Option>
          ))}
          <Option value="all">Todos los productos</Option>
        </Select>
        <Link to="/products/new">
          <Button type="primary">Crear producto</Button>
        </Link>
      </Row>
      <br />
      <Table
        columns={[
          {
            title: "Codigo",
            dataIndex: "codigo",
            key: "codigo",
            render: text => <a href="javascript:;">{text}</a>
          },
          {
            title: "Categoria",
            dataIndex: "categoria",
            key: "categoria",
            render: text => <a href="javascript:;">{text}</a>
          },
          {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
            render: text => <a href="javascript:;">{text}</a>
          },
          {
            title: "Precio",
            dataIndex: "precio4",
            key: "precio4",
            render: text => <a href="javascript:;">{text}</a>
          },
          {
            title: "Acciones",
            dataIndex: "key",
            key: "action",
            render: text => (
              <>
                <Link to={`/products/${text}`}>
                  <Button>Editar</Button>
                </Link>
                <Popconfirm
                  title="Estas seguro de eliminar?"
                  onConfirm={() => confirm(text)}
                  onCancel={() => cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Eliminar</Button>
                </Popconfirm>
              </>
            )
          }
        ]}
        dataSource={products}
      />
    </div>
  );
};

export default Products;
