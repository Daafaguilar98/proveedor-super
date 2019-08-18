import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Icon, Select, Button, message } from "antd";
import { useStateValue, useApi } from "store";
import { database } from "database.js";
import { getBase64 } from "utils/formats";
const { Option } = Select;

const ProductsUpdate = ({ match, form }) => {
  const { getFieldDecorator } = form;

  const { uploadPhoto } = useApi();
  const [{ products, categories }, dispatch] = useStateValue();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const data = products.find(product => product.key === match.params.id);
    setData(data);
  };

  const beforeUpload = file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = info => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, async imageUrl => {
        const response = await uploadPhoto(imageUrl, "product");
        if (response.status === 200) {
          setLoading(false);
          setData({ ...data, imagenURL: response.data.secure_url });
          updateProduct();
        } else {
          message.error("Error in request");
        }
      });
    }
  };

  const updateProduct = e => {
    if (e) e.preventDefault();

    setTimeout(() => {
      console.log(data);
    }, 2000);
    // const newProduct = Object.assign({}, data, form.getFieldsValue());
    // database.ref(`Productos/${data.key}`).update(newProduct);
    message.success("Producto actualizado");
  };

  const uploadButton = (
    <div>
      <Icon type={loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const CategoryOptions = categories.map(category => (
    <Option
      key={`new_product_category_${category.categoria}`}
      value={category.categoria}
    >
      {category.categoria}
    </Option>
  ));

  return data ? (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {data.imagenURL ? (
          <img src={data.imagenURL} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Form onSubmit={updateProduct} className="product_card__content">
        {getFieldDecorator("codigo", { initialValue: data.codigo })(
          <Input placeholder="Codigo" />
        )}
        {getFieldDecorator("categoria", { initialValue: data.categoria })(
          <Select
            showSearch
            placeholder="Escoge la categoría"
            optionFilterProp="children"
            filterOption={(input, option) => {
              option.props.children.categoria
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
          >
            {CategoryOptions}
          </Select>
        )}
        {getFieldDecorator("nombre", { initialValue: data.nombre })(
          <Input placeholder="Nombre" />
        )}
        {getFieldDecorator("precio4", { initialValue: data.precio4 })(
          <Input placeholder="Precio" />
        )}
        <Button type="primary" block htmlType="submit">
          Guardar
        </Button>
      </Form>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Form.create({ name: "update_product" })(ProductsUpdate);
