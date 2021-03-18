import {
  GET_PRODUCTS_BY_FILTER_FAIL,
  GET_PRODUCTS_BY_FILTER_REQUEST,
  GET_PRODUCTS_BY_FILTER_SUCCESS,
  GET_PRODUCTS_BY_NAME_FAIL,
  GET_PRODUCTS_BY_NAME_REQUEST,
  GET_PRODUCTS_BY_NAME_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  SET_PRODUCTS_FOR_FILTER,
  SET_SORT_OPTION,
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST_REQUEST:
      return { loading: true };
    case GET_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,

        brands: count_dublicates(
          action.payload
            .map((item) => {
              return item.brand;
            })
            .sort((a, b) => (a > b ? 1 : -1))
        ),

        processor: count_dublicates(
          action.payload
            .map((item) => {
              return item.processorModel;
            })
            .sort((a, b) => (a > b ? 1 : -1))
        ),

        memory: count_dublicates(
          action.payload
            .map((item) => {
              return item.memory;
            })
            .sort((a, b) => (a < b ? 1 : -1))
        ),

        storage: count_dublicates(
          action.payload
            .map((item) => {
              return item.storage;
            })
            .sort((a, b) => (a > b ? 1 : -1))
        ),

        video: count_dublicates(
          action.payload
            .map((item) => {
              return item.video;
            })
            .sort((a, b) => (a > b ? 1 : -1))
        ),
      };
    case GET_PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_PRODUCT_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        loading: false,
        productById: action.payload,
      };
    case GET_PRODUCT_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const count_dublicates = (a) => {
  let counts = {};

  for (let i = 0; i < a.length; i++) {
    if (counts[a[i]]) {
      counts[a[i]] += 1;
    } else {
      counts[a[i]] = 1;
    }
  }

  let neww = [];
  for (let prop in counts) {
    neww.push({
      name: prop,
      // count: counts[prop],
      // isChecked: false,
    });
  }
  return neww;
};

export const productFilterReducer = (state = { filter: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_FILTER_REQUEST:
      return {
        filterLoading: true,
      };
    case GET_PRODUCTS_BY_FILTER_SUCCESS:
      return {
        filterLoading: false,
        filterData: action.payload,
      };
    case GET_PRODUCTS_BY_FILTER_FAIL:
      return {
        filterLoading: false,
        filterError: action.payload,
      };

    case GET_PRODUCTS_BY_NAME_REQUEST:
      return {
        filterLoading: true,
      };
    case GET_PRODUCTS_BY_NAME_SUCCESS:
      return {
        filterLoading: false,
        filterData: action.payload,
      };
    case GET_PRODUCTS_BY_NAME_FAIL:
      return {
        filterLoading: false,
        filterError: action.payload,
      };
    case SET_PRODUCTS_FOR_FILTER:
      return {
        filterLoading: false,
        filterData: action.payload,
      };

    default:
      return state;
  }
};

export const sortOptionReducer = (state = "A-Z", action) => {
  switch (action.type) {
    case SET_SORT_OPTION:
      return action.payload;
    default:
      return state;
  }
};
