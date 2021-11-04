import { asideTypes } from "./type";

export const HomeViewsVisibility = (view) => {
  const typeofView = view
    ? asideTypes.homeTodayView
    : asideTypes.homeTimestampView;
  return {
    type: typeofView,
    payload: view,
  };
};
