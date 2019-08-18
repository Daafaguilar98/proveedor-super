import axios from "axios";
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

  return { getProducts, getCategories, uploadPhoto };
};

export default useApi;
