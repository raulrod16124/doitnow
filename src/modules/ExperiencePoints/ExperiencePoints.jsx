import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { GetTasks } from "../Home/state/actions";
import { UpdateUserProfile } from "../Profile/state/actions";
import { XPLevels } from "./XPLevels";

export const ExperiencePoints = () => {
  const todosState = useSelector((state) => {
    return state.TodosReducer;
  });

  const dispatch = useDispatch();

  const [xpVisibility, setXpVisibility] = useState();

  const [expereincePoints, setExperiencePoints] = useState(0);

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
      setXpVisibility(true);
    }
  }, [todosState]);

  useEffect(async () => {
    // TODO - Include level param in userData
    const userData = await JSON.parse(localStorage.getItem("user"));
    const levelVerification = XPLevels(expereincePoints);
    if (userData && userData.level < levelVerification) {
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
    <div className="bg-experience-points-window">
      <div className="experience-points-window">XP</div>
    </div>
  );
};
