import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../../stories/Button";
import { CloseConfirmationPrompt } from "./state/actions";

export const ConfirmationPrompt = ({ statusForTests, messageForTests }) => {
  const {
    acceptButton,
    cancelButton,
    handleAccept,
    handleReject,
    message,
    status,
  } = useSelector((state) => {
    return state.ConfirmationPromptReducer;
  });

  const dispatch = useDispatch();

  return (
    status === "open" ||
    (statusForTests === true && (
      <div className="confirmation-propmt">
        <i
          className="far fa-window-close icon close-icon"
          onClick={() => dispatch(CloseConfirmationPrompt())}
        ></i>
        <p className="text">{messageForTests ? messageForTests : message}</p>
        <div className="content-buttons">
          <Button
            label={cancelButton}
            primary
            onClick={() => {
              handleReject
                ? dispatch(handleReject())
                : dispatch(CloseConfirmationPrompt());
            }}
          />
          <Button
            label={acceptButton}
            onClick={() => {
              dispatch(handleAccept());
              dispatch(CloseConfirmationPrompt());
            }}
          />
        </div>
      </div>
    ))
  );
};
