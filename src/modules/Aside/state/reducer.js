const initialStateViewSelected = {
  today: false,
  calendar: false,
  account: false,
  settings: false,
};

export const AsideReducer = (state = initialStateViewSelected, action) => {
  switch (action.type) {
    case "today":
      state = {
        today: true,
        calendar: false,
        account: false,
        settings: false,
      };
      return state;
    case "calendar":
      state = {
        today: false,
        calendar: true,
        account: false,
        settings: false,
      };
      return state;
    case "account":
      state = {
        today: false,
        calendar: false,
        account: true,
        settings: false,
      };
      return state;
    case "settings":
      state = {
        today: false,
        calendar: false,
        account: false,
        settings: true,
      };
      return state;
    default:
      return state;
  }
};
