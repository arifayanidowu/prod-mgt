import axios from "axios";
import * as authTypes from "../types/authTypes";
import { baseUrl } from "./baseUrl";
import errorDispatch from "./errorDispatch";

const URL = `${baseUrl}/auth`;

export const registerUser = (body) => async (dispatch) => {
  try {
    dispatch({
      type: authTypes.REGISTER_USER_REQUEST,
    });
    const { data } = await axios.post(`${URL}/register`, body);
    dispatch({
      type: authTypes.REGISTER_USER,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, authTypes.REGISTER_USER_FAIL, error);
  }
};

export const loginUser = (body) => async (dispatch) => {
  try {
    dispatch({
      type: authTypes.LOGIN_USER_REQUEST,
    });
    const { data } = await axios.post(`${URL}/login`, body);

    dispatch({
      type: authTypes.LOGIN_USER,
      payload: data.data,
    });

    localStorage.setItem("prod:token", data.token);
  } catch (error) {
    errorDispatch(dispatch, authTypes.LOGIN_USER_FAIL, error);
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");
    dispatch({
      type: authTypes.GET_PROFILE_REQUEST,
    });
    const { data } = await axios.get(`${URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: authTypes.GET_PROFILE,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, authTypes.GET_PROFILE_FAIL, error);
  }
};

export const uploadAvatar = (body) => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: authTypes.UPLOAD_AVATAR_REQUEST,
    });
    const { data } = await axios.put(`${URL}/avatar`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: authTypes.UPLOAD_AVATAR,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, authTypes.UPLOAD_AVATAR_FAIL, error);
  }
};

export const updateProfile = (body) => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: authTypes.UPDATE_PROFILE_REQUEST,
    });
    const { data } = await axios.put(`${URL}/profile`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: authTypes.UPDATE_PROFILE,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, authTypes.UPDATE_PROFILE_FAIL, error);
  }
};

export const changePassword = (body) => async (dispatch) => {
  try {
    const token = localStorage.getItem("prod:token");

    dispatch({
      type: authTypes.UPDATE_PASSWORD_REQUEST,
    });

    const { data } = await axios.put(`${URL}/changepassword`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: authTypes.UPDATE_PASSWORD,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, authTypes.UPDATE_PASSWORD_FAIL, error);
  }
};

export const forgotPassword = (body) => async (dispatch) => {
  try {
    dispatch({
      type: authTypes.FORGOT_PASSWORD_REQUEST,
    });
    const { data } = await axios.post(`${URL}/forgotpassword`, body);
    dispatch({
      type: authTypes.FORGOT_PASSWORD,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, authTypes.FORGOT_PASSWORD_FAIL, error);
  }
};

export const resetPassword = (body) => async (dispatch) => {
  try {
    dispatch({
      type: authTypes.RESET_PASSWORD_REQUEST,
    });
    const { data } = await axios.put(
      `${URL}/resetpassword/${body.token}`,
      body
    );
    dispatch({
      type: authTypes.RESET_PASSWORD,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, authTypes.RESET_PASSWORD_FAIL, error);
  }
};

export const getUserByToken = (token) => async (dispatch) => {
  try {
    dispatch({
      type: authTypes.GET_USER_BY_RESET_TOKEN_REQUEST,
    });
    const { data } = await axios.get(`${URL}/token/${token}`);
    dispatch({
      type: authTypes.GET_USER_BY_RESET_TOKEN,
      payload: data.data,
    });
  } catch (error) {
    errorDispatch(dispatch, authTypes.GET_USER_BY_RESET_TOKEN_FAIL, error);
  }
};
