export const OpenConfirmationPrompt = (data) => {
  return {
    type: "@open_confirmation_propmt",
    payload: data,
  };
};

export const CloseConfirmationPrompt = () => {
  return {
    type: "@close_confirmation_propmt",
    payload: "close",
  };
};
