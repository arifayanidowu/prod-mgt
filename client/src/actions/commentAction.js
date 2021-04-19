import axios from "axios";
import * as commentTypes from "../types/commentTypes";
import { baseUrl } from "./baseUrl";
import errorDispatch from "./errorDispatch";

const URL = `${baseUrl}/comment`;

export const getAllComments = (productId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: commentTypes.GET_ALL_COMMENTS_BY_PRODUCTS_REQUEST,
    });
    const { data } = await axios.get(`${URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: commentTypes.GET_ALL_COMMENTS_BY_PRODUCTS,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(
      dispatch,
      commentTypes.GET_ALL_COMMENTS_BY_PRODUCTS_FAIL,
      error
    );
  }
};

export const createComment = (body) => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: commentTypes.CREATE_COMMENT_REQUEST,
    });

    const { data } = await axios.post(`${URL}/${body.productId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: commentTypes.CREATE_COMMENT,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, commentTypes.CREATE_COMMENT_FAIL, error);
  }
};

export const replyComment = (body) => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: commentTypes.REPLY_COMMENT_REQUEST,
    });

    const { data } = await axios.put(`${URL}/reply/${body.id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: commentTypes.REPLY_COMMENT,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, commentTypes.REPLY_COMMENT_FAIL, error);
  }
};
