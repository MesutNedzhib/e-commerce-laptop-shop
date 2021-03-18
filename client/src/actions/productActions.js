import axios from "axios";
import {
  GET_PRODUCTS_BY_NAME_REQUEST,
  GET_PRODUCTS_BY_NAME_SUCCESS,
  GET_PRODUCTS_BY_NAME_FAIL,
  GET_PRODUCTS_BY_FILTER_FAIL,
  GET_PRODUCTS_BY_FILTER_REQUEST,
  GET_PRODUCTS_BY_FILTER_SUCCESS,
  GET_PRODUCTS_BY_PROCESSOR_MODEL,
  GET_PRODUCT_LIST_FAIL,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  RELOAD_LIST,
  REMOVE_BRAND_FILTER,
  REMOVE_PROCESSOR_FILTER,
  SET_BRAND_FILTER,
  SET_PROCESSOR_FILTER,
  SET_PRODUCTS_FOR_FILTER,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  SET_SORT_OPTION,
} from "../constants/productConstants";

const sortData = (sortOption, productsData) => {
  if (sortOption === "A-Z") {
    return productsData.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  if (sortOption === "Z-A") {
    return productsData.sort((a, b) => (a.name < b.name ? 1 : -1));
  }
  if (sortOption === "1-10") {
    return productsData.sort((a, b) => (a.price > b.price ? 1 : -1));
  }
  if (sortOption === "10-1") {
    return productsData.sort((a, b) => (a.price < b.price ? 1 : -1));
  }
};

export const getProductList = () => async (dispatch, getState) => {
  dispatch({
    type: GET_PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/products");
    let sortOption = getState().sortOption;
    dispatch({
      type: GET_PRODUCT_LIST_SUCCESS,
      payload: sortData(sortOption, data),
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const getProductsByFilter = (model) => async (dispatch, getState) => {
  dispatch({
    type: GET_PRODUCTS_BY_FILTER_REQUEST,
  });
  try {
    const { data } = await axios.post(`/api/products/filter/`, { model });
    let sortOption = getState().sortOption;
    dispatch({
      type: GET_PRODUCTS_BY_FILTER_SUCCESS,
      payload: sortData(sortOption, data),
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_BY_FILTER_FAIL,
      payload: error.message,
    });
  }
};

export const getProductsByName = (value) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_BY_NAME_REQUEST,
  });

  try {
    const { data } = await axios.get(`/api/products/search/${value}`);
    dispatch({
      type: GET_PRODUCTS_BY_NAME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_BY_NAME_FAIL,
      payload: error.message,
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_BY_ID_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_BY_ID_FAIL,
      payload: error.message,
    });
  }
};

export const reloadList = () => (dispatch) => {
  // let rr = [];

  // arr1.map((item) => {
  //   arr2.map((item2) => {
  //     if (item.brand === item2.brand) {
  //       rr.push(item);
  //     }
  //   });
  // });
  // console.log(rr);
  dispatch({
    type: RELOAD_LIST,
  });
};

export const setProductsForFilter = (products) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCTS_FOR_FILTER,
    payload: products,
  });
};

export const setBrandFilter = (products) => (dispatch, getState) => {
  // let ss = [...getState().brandFilter.sendBrand, ...products];
  // console.log(products);
  dispatch({
    type: SET_BRAND_FILTER,
    payload: products,
  });
};

export const removeBrandFilter = (value) => (dispatch) => {
  dispatch({
    type: REMOVE_BRAND_FILTER,
    payload: value,
  });
};

export const getProductsByProcessorModel = (value) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/products/processor-model/${value}`);
  let newData;
  if (getState().processorModelFilter.processorModelData) {
    newData = [...getState().processorModelFilter.processorModelData, ...data];
    dispatch({
      type: GET_PRODUCTS_BY_PROCESSOR_MODEL,
      payload: newData,
    });
  } else {
    dispatch({
      type: GET_PRODUCTS_BY_PROCESSOR_MODEL,
      payload: data,
    });
  }
};

export const setProcessorFilter = (products) => (dispatch) => {
  dispatch({
    type: SET_PROCESSOR_FILTER,
    payload: products,
  });
};

export const removeProcessorFilter = (value) => (dispatch) => {
  dispatch({
    type: REMOVE_PROCESSOR_FILTER,
    payload: value,
  });
};

export const setSortOption = (value) => (dispatch, getState) => {
  dispatch({
    type: SET_SORT_OPTION,
    payload: value,
  });
  let filterData = getState().productFilter.filterData;
  let sortOption = getState().sortOption;
  if (filterData) {
    dispatch(setProductsForFilter(sortData(sortOption, filterData)));
  } else {
    dispatch(getProductList());
  }
};
