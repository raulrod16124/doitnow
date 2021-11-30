export const XPLevels = (totalXP) => {
  let diff = 500;
  let level = 1;
  while (totalXP >= diff) {
    level++;
    totalXP -= diff;
    diff += 100;
  }
  return level;
};
