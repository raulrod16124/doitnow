import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Button } from "../../stories/Button";
import { GetTasks } from "../Home/state/actions";
import { UpdateUserProfile } from "../Profile/state/actions";
import { XPLevels } from "./XPLevels";

export const ExperiencePoints = () => {
  const todosState = useSelector((state) => {
    return state.TodosReducer;
  });

  const dispatch = useDispatch();

  const [xpVisibility, setXpVisibility] = useState(false);

  const [expereincePoints, setExperiencePoints] = useState(0);

  const [prevLevel, setprevLevel] = useState(0);

  const [actualLevel, setActualLevel] = useState(0);

  useEffect(async () => {
    const userData = await JSON.parse(localStorage.getItem("user"));
    if (
      todosState.status === "task_created" ||
      todosState.status === "task_deleted" ||
      todosState.status === "task_updated"
    ) {
      setXpVisibility(false);
      dispatch(GetTasks(userData));
    }
    if (todosState.status === "success") {
      handleCalcutlateXP(todosState.data);
    }
  }, [todosState]);

  useEffect(async () => {
    // TODO - Include level param in userData
    const userData = await JSON.parse(localStorage.getItem("user"));
    const levelVerification = XPLevels(expereincePoints);
    if (userData && userData.level < levelVerification) {
      setprevLevel(userData.level);
      setActualLevel(levelVerification);
      setXpVisibility(true);
      dispatch(
        UpdateUserProfile(userData.id, {
          ...userData,
          level: levelVerification,
        })
      );
    }
  }, [expereincePoints]);

  const handleCalcutlateXP = (list) => {
    let easyTasks = 0;
    let mediumTasks = 0;
    let hardTasks = 0;
    let noAssigned = 0;

    list.map((task) => {
      if (task.status === "done" || task.status === "archive") {
        switch (task.level) {
          case "easy":
            easyTasks++;
            break;
          case "medium":
            mediumTasks++;
            break;
          case "hard":
            hardTasks++;
            break;
          default:
            noAssigned++;
            break;
        }
      }
    });
    setExperiencePoints(easyTasks * 50 + mediumTasks * 75 + hardTasks * 100);
  };

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
            <div className="content-arrows">
              <i className="fas fa-chevron-up icon arrow"></i>
              <i className="fas fa-chevron-up icon arrow"></i>
              <i className="fas fa-chevron-up icon arrow"></i>
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
                onClick={() => setXpVisibility(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
