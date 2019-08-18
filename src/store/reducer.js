export const initialState = {
  products: [],
  categories: [],
  currentProduct: null
};

export default (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
