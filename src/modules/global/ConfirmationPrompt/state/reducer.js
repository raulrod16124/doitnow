const initialState = {
  status: "close",
  acceptButton: "Accept",
  cancelButton: "Cancel",
  handleReject: null,
  handleAccept: null,
  message: null,
};

export const ConfirmationPromptReducer = (state = initialState, action) => {
  switch (action.type) {
    case "@open_confirmation_propmt":
      // console.log("OPEN POPUP");
      return { ...state, status: "open", ...action.payload };
    case "@close_confirmation_propmt":
      // console.log("CLOSE POPUP");
      return initialState;
    default:
      return state;
  }
};
