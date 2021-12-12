import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "./../../../stories/Button";
import { CloseConfirmationPropmt } from "./state/actions";

export const ConfirmationPropmt = () => {
  const {
    acceptButton,
    cancelButton,
    handleAccept,
    handleReject,
    message,
    status,
  } = useSelector((state) => {
    return state.ConfirmationPropmtReducer;
  });

  const dispatch = useDispatch();

  return (
    status === "open" && (
      <div className="confirmation-propmt">
        <i
          className="far fa-window-close icon close-icon"
          onClick={() => dispatch(CloseConfirmationPropmt())}
        ></i>
        <p className="text">{message}</p>
        <div className="content-buttons">
          <Button
            label={cancelButton}
            secondary
            onClick={() => {
              handleReject
                ? dispatch(handleReject())
                : dispatch(CloseConfirmationPropmt());
            }}
          />
          <Button
            label={acceptButton}
            primary
            onClick={() => {
              dispatch(handleAccept());
              dispatch(CloseConfirmationPropmt());
            }}
          />
        </div>
      </div>
    )
  );
};
