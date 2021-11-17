export const OpenConfirmationPropmt = (data) => {
  return {
    type: "@open_confirmation_propmt",
    payload: data,
  };
};

export const CloseConfirmationPropmt = () => {
  return {
    type: "@close_confirmation_propmt",
    payload: "close",
  };
};
