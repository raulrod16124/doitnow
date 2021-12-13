import React, { useState } from "react";

import { Button } from "../../../../stories/Button";
import { avatars } from "./avatars";

export const AvatarSelector = ({
  userData,
  handleSetAvatarSelectorView,
  handleUpdateUserData,
}) => {
  const [avatarSelected, setAvatarSelected] = useState(userData.avatar);

  return (
    <div
      className="bg-avatar-selector"
      onClick={(e) => {
        if (e.target.className === "bg-avatar-selector") {
          handleSetAvatarSelectorView(false);
        }
      }}
    >
      <div className="avatar-selector">
        <i
          className="far fa-window-close icon close-icon"
          onClick={() => handleSetAvatarSelectorView(false)}
        ></i>
        <div className="content-images">
          {Object.keys(avatars).map((avatar) => {
            return (
              <img
                className={
                  avatarSelected === avatars[avatar]
                    ? "avatarToSelect selected"
                    : "avatarToSelect"
                }
                key={avatars[avatar]}
                src={avatars[avatar]}
                alt={avatar}
                onClick={() => setAvatarSelected(avatars[avatar])}
              />
            );
          })}
        </div>
        <div className="content-save-button">
          <Button
            size="small"
            label="Save"
            primary
            onClick={(e) => {
              handleUpdateUserData(avatarSelected);
              handleSetAvatarSelectorView(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};
