import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Button } from "../../stories/Button";
import { GetTasks } from "../Home/state/actions";
import { GetUserProfile, UpdateUserProfile } from "../Profile/state/actions";
import { defaultAvatar } from "../Profile/views/components/avatars";
import { XPLevels, handleCalcutlateXP } from "./XPLevels";

export const ExperiencePoints = () => {
  const todosState = useSelector((state) => {
    return state.TodosReducer;
  });

  const profileState = useSelector((state) => {
    return state.ProfileReducer;
  });

  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState(null);

  const [xpVisibility, setXpVisibility] = useState(false);

  const [expereincePoints, setExperiencePoints] = useState(0);

  const [prevLevel, setprevLevel] = useState(0);

  const [actualLevel, setActualLevel] = useState(0);

  useEffect(async () => {
    const userData = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
    );
    if (
      todosState.status === "task_created" ||
      todosState.status === "task_deleted" ||
      todosState.status === "task_updated"
    ) {
      setXpVisibility(false);
      dispatch(GetTasks(userData));
      dispatch(GetUserProfile(userData.id));
    }
    if (todosState.status === "success") {
      const totalXpPoints = handleCalcutlateXP(todosState.data);
      setExperiencePoints(totalXpPoints);
    }
  }, [todosState]);

  useEffect(() => {
    if (profileState.status === "success") {
      setProfileData(profileState.data);
    }
  }, [profileState]);

  useEffect(async () => {
    const { level } = XPLevels(expereincePoints);
    if (profileData && profileData.level < level) {
      // console.log("LEVEL UP GOOO");
      setprevLevel(profileData.level);
      setActualLevel(level);
      setXpVisibility(true);
      dispatch(
        UpdateUserProfile(profileData.id, {
          ...profileData,
          level: level,
        })
      );
    }
    if (profileData && profileData.level > level) {
      dispatch(
        UpdateUserProfile(profileData.id, {
          ...profileData,
          level: level,
        })
      );
    }
    // console.log("EXP POINTS CHECKED");
  }, [expereincePoints]);

  return (
    <>
      {xpVisibility && (
        <div
          className="bg-experience-points-window"
          onClick={(e) => {
            if (e.target.className === "bg-experience-points-window") {
              setXpVisibility(false);
            }
          }}
        >
          <div className="experience-points-window">
            <div className="content-avatar">
              <img
                className="avatar"
                src={
                  profileData && profileData.avatar
                    ? profileData.avatar
                    : defaultAvatar
                }
                alt="avatar"
              />
            </div>
            <h2 className="level-title">Level Up</h2>
            <div className="transition-level">
              <p className="prev-level">{prevLevel}</p>
              <i className="fas fa-chevron-right icon"></i>
              <p className="actual-level">{actualLevel}</p>
            </div>
            <div className="button-content">
              <Button
                label="Keep working hard"
                primary
                onClick={() => setXpVisibility(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
