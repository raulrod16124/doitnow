import { asideTypes } from "./type";

export const AsideReducer = (state = false, action) => {
  switch (action.type) {
    case asideTypes.homeTodayView:
      state = action.payload;
      return state;
    case asideTypes.homeTimestampView:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
