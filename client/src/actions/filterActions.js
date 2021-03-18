import { SET_ACTIVE_FILTERS } from "../constants/filterConstants";
export const setActiveFilters = (model) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_FILTERS,
    payload: model,
  });
};
