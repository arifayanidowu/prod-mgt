import * as authTypes from "../types/authTypes";

const initialState = {
  user: null,
  error: null,
  loading: false,
  profile: null,
  success: false,
  message: "",
  isPassUpdate: false,
  registerSuccess: false,
  loginSuccess: false,
  updateSuccess: false,
  forgotSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.REGISTER_USER_REQUEST:
    case authTypes.LOGIN_USER_REQUEST:
    case authTypes.GET_PROFILE_REQUEST:
    case authTypes.UPLOAD_AVATAR_REQUEST:
    case authTypes.UPDATE_PROFILE_REQUEST:
    case authTypes.UPDATE_PASSWORD_REQUEST:
    case authTypes.FORGOT_PASSWORD_REQUEST:
    case authTypes.GET_USER_BY_RESET_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case authTypes.LOGIN_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        profile: action.payload,
        loginSuccess: true,
      };
    case authTypes.UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        user: action.payload,
        profile: action.payload,
        updateSuccess: true,
      };
    case authTypes.REGISTER_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        profile: action.payload,
        registerSuccess: true,
      };
    case authTypes.UPDATE_PASSWORD:
      return {
        ...state,
        loading: false,
        user: action.payload,
        profile: action.payload,
        isPassUpdate: true,
      };
    case authTypes.UPLOAD_AVATAR:
      return {
        ...state,
        loading: false,
        user: action.payload,
        profile: action.payload,
      };
    case authTypes.GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case authTypes.FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        message: action.payload,
        forgotSuccess: true,
      };
    case authTypes.RESET_PASSWORD:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
      };
    case authTypes.GET_USER_BY_RESET_TOKEN:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case authTypes.REGISTER_USER_FAIL:
    case authTypes.LOGIN_USER_FAIL:
    case authTypes.GET_PROFILE_FAIL:
    case authTypes.UPLOAD_AVATAR_FAIL:
    case authTypes.UPDATE_PROFILE_FAIL:
    case authTypes.UPDATE_PASSWORD_FAIL:
    case authTypes.FORGOT_PASSWORD_FAIL:
    case authTypes.RESET_PASSWORD_FAIL:
    case authTypes.GET_USER_BY_RESET_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        isPassUpdate: false,
        registerSuccess: false,
        loginSuccess: false,
        updateSuccess: false,
        forgotSuccess: false,
      };

    case authTypes.RESET_USER:
      return {
        ...state,
        success: false,
        error: null,
        loading: false,
        message: "",
        isPassUpdate: false,
        registerSuccess: false,
        loginSuccess: false,
        updateSuccess: false,
        forgotSuccess: false,
      };

    default:
      return state;
  }
};

export default authReducer;
