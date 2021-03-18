import {
  GET_GATEGORY_LIST,
  SET_CATEGORY_LIST_STATE,
} from "../constants/categoryConstants";
import axios from "axios";

export const getCategoryList = (model, list) => async (dispatch) => {
  if (model) {
    console.log(model);
    const { data } = await axios.post(`/api/products/brand/brand`, { model });
    dispatch({
      type: GET_GATEGORY_LIST,
      payload: { data: data, list: list },
    });
  } else {
    dispatch({
      type: GET_GATEGORY_LIST,
      payload: { list: list },
    });
  }
};

export const setCategoryListState = (model) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_LIST_STATE,
    payload: model,
  });
};
