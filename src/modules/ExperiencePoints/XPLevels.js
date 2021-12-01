export const XPLevels = (totalXP) => {
  let diff = 500;
  let level = 1;
  while (totalXP >= diff) {
    level++;
    totalXP -= diff;
    diff += 100;
  }
  return { level, diff };
};

export const handleCalcutlateXP = (list) => {
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
  const totalXP = easyTasks * 50 + mediumTasks * 75 + hardTasks * 100;
  return totalXP;
};

export const NextLevelXP = (level) => {
  let diff = 500;
  let xpPoints = 0;
  let count = 0;
  while (level > count) {
    count++;
    xpPoints += diff;
    diff += 100;
  }
  return xpPoints;
};
