import * as commentTypes from "../types/commentTypes";

const initialState = {
  comment: null,
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case commentTypes.CREATE_COMMENT_REQUEST:
    case commentTypes.REPLY_COMMENT_REQUEST:
    case commentTypes.GET_ALL_COMMENTS_BY_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case commentTypes.CREATE_COMMENT:
      return {
        ...state,
        loading: false,
        comment: action.payload,
      };
    case commentTypes.REPLY_COMMENT:
      return {
        ...state,
        loading: false,
        comments: state.comments.map((item) =>
          item._id === action.payload._id ? (item = action.payload) : item
        ),
        comment: action.payload,
      };

    case commentTypes.GET_ALL_COMMENTS_BY_PRODUCTS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };

    case commentTypes.GET_ALL_COMMENTS_BY_PRODUCTS_FAIL:
    case commentTypes.CREATE_COMMENT_FAIL:
    case commentTypes.REPLY_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case commentTypes.RESET_COMMENT:
      return {
        comment: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default commentReducer;
