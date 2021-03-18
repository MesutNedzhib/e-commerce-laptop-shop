import { SET_ACTIVE_FILTERS } from "../constants/filterConstants";

export const activeFilterStateReducer = (
  state = { activeFilterState: {} },
  action
) => {
  switch (action.type) {
    case SET_ACTIVE_FILTERS:
      return {
        filterState: {
          filter: action.payload.filter,
          filterList: action.payload.filterList,
        },
      };
    default:
      return state;
  }
};
