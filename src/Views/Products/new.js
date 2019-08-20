import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Icon, Select, Button, message } from "antd";
import { useApi } from "store";
import { database } from "database.js";
import { getBase64 } from "utils/formats";

const { Option } = Select;

const ProductsNew = ({ history, form }) => {
  const { getFieldDecorator } = form;

  const { createProduct, uploadPhoto } = useApi();
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [data] = useState({
    codigo: "",
    categoria: "",
    nombre: "",
    precio4: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const snapshot = await database.ref("/Categorias").once("value");
    setCategories(Object.values(snapshot.val()));
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
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const newProduct = async () => {
    const response = await uploadPhoto(imageUrl, "products");
    createProduct({
      ...form.getFieldsValue(),
      imagenURL: response.data.secure_url
    });
    history.push("/products");
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

  return (
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
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Form className="product_card__content">
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
        <Button
          type="primary"
          block
          htmlType="submit"
          onClick={() => newProduct()}
        >
          Guardar
        </Button>
      </Form>
    </>
  );
};

export default Form.create({ name: "new_product" })(ProductsNew);
