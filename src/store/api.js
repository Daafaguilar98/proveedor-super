import axios from "axios";
import { message } from "antd";
import { database } from "../database.js";
import { useStateValue } from "./index";

const useApi = () => {
  const [{}, dispatch] = useStateValue();

  const getProducts = async ({ key, value }) => {
    const snapshot = await database
      .ref("/Productos")
      .orderByChild(key)
      .equalTo(value)
      .once("value");
    let products = snapshot.val();
    for (let key in products) {
      products[key].key = key;
    }
    dispatch({ type: "SET_PRODUCTS", payload: Object.values(products) });
  };

  const getAllProducts = async () => {
    const snapshot = await database.ref("/Productos").once("value");
    let products = snapshot.val();
    for (let key in products) {
      products[key].key = key;
    }
    dispatch({ type: "SET_PRODUCTS", payload: Object.values(products) });
  };

  const createProduct = async newProduct => {
    database.ref(`Productos`).push(newProduct);
    message.success("Producto creado");
  };

  const updateProduct = async (key, newProduct) => {
    database.ref(`Productos/${key}`).update(newProduct);
    message.success("Producto actualizado");
  };

  const getCategories = async () => {
    const snapshot = await database.ref("/Categorias").once("value");
    let categories = snapshot.val();
    for (let key in categories) {
      categories[key].key = key;
    }
    dispatch({
      type: "SET_CATEGORIES",
      payload: Object.values(categories)
    });
  };

  const uploadPhoto = async (file, folder) => {
    let formData = new FormData();
    formData.append("folder", folder);
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    return await axios({
      url: "/el-proveedor/image/upload",
      method: "post",
      baseURL: "https://api.cloudinary.com/v1_1/",
      data: formData
    });
  };

  return {
    getProducts,
    getAllProducts,
    createProduct,
    updateProduct,
    getCategories,
    uploadPhoto
  };
};

export default useApi;
