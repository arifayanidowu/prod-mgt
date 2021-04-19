import * as productTypes from "../types/productTypes";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  success: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.CREATE_PRODUCT_REQUEST:
    case productTypes.GET_PRODUCTS_REQUEST:
    case productTypes.GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productTypes.GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: [...action.payload],
      };
    case productTypes.CREATE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: [action.payload, ...state.products],
        product: action.payload,
        success: true,
      };

    case productTypes.GET_PRODUCT_BY_ID:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case productTypes.CREATE_PRODUCT_FAIL:
    case productTypes.GET_PRODUCTS_FAIL:
    case productTypes.GET_PRODUCT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case productTypes.RESET_PRODUCT:
      return {
        product: null,
        loading: false,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export default productReducer;
