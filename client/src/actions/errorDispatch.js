const errorDispatch = (dispatch, types, error) => {
  dispatch({
    type: types,
    payload:
      error?.response && error?.response?.data?.error
        ? error?.response?.data?.error
        : error?.request
        ? error?.request?.data?.error
        : error?.message,
  });
  return error?.response && error?.response?.data?.error
    ? error?.response?.data?.error
    : error?.request
    ? error?.request?.data?.error
    : error?.message;
};

export default errorDispatch;
