import axios from "axios";
import * as prodTypes from "../types/productTypes";
import { baseUrl } from "./baseUrl";
import errorDispatch from "./errorDispatch";

const URL = `${baseUrl}/product`;

export const getAllProducts = (pageSize = "", filter = "") => async (
  dispatch
) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: prodTypes.GET_PRODUCTS_REQUEST,
    });

    const url = `${URL}/?pageSize=${pageSize}&filter=${filter}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: prodTypes.GET_PRODUCTS,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, prodTypes.GET_PRODUCTS_FAIL, error);
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: prodTypes.GET_PRODUCT_BY_ID_REQUEST,
    });
    const { data } = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: prodTypes.GET_PRODUCT_BY_ID,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, prodTypes.GET_PRODUCT_BY_ID_FAIL, error);
  }
};

export const createProduct = (body) => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: prodTypes.CREATE_PRODUCT_REQUEST,
    });
    const { data } = await axios.post(`${URL}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: prodTypes.CREATE_PRODUCT,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, prodTypes.CREATE_PRODUCT_FAIL, error);
  }
};
