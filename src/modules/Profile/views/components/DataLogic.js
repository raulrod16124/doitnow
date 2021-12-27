import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export const DailyRecord = (list) => {
  let counter = [];
  let result;
  let maxTasks = 0;
  if (list.length > 0) {
    list.forEach((item) => {
      counter.push(item.date);
    });

    list.forEach((item) => {
      result = 0;
      list.forEach((itemToCompare) => {
        if (item.date === itemToCompare.date) {
          result++;
        }
      });
      if (maxTasks < result) {
        maxTasks = result;
      }
    });
  }

  return maxTasks;
};

export const WeekRecord = (list, param) => {
  let weeks = {};
  if (list.length > 0) {
    list.forEach((item) => {
      if (item.status === "done" || item.status === "archive") {
        let formatDate = item.date.split("/");
        formatDate = `${formatDate[1]}/${formatDate[0]}/${formatDate[2]}`;
        let date = dayjs(formatDate).format("YYYY-MM-DD");
        let week = dayjs(date).isoWeek();
        // // console.log(week);
        if (weeks[week]) {
          weeks[week] = weeks[week] + 1;
        } else {
          weeks[week] = 1;
        }
      }
    });
    let weeksRecord =
      Object.keys(weeks).map((key) => weeks[key]).length > 0
        ? Object.keys(weeks).map((key) => weeks[key])
        : [0, 0];
    // console.log(weeksRecord.length);
    return weeksRecord.reduce((prev, act) => (prev > act ? prev : act));
  } else {
    return 0;
  }
};

export const weeklyAverage = (list) => {
  let weeks = {};
  if (list.length > 0) {
    list.forEach((item) => {
      let formatDate = item.date.split("/");
      formatDate = `${formatDate[1]}/${formatDate[0]}/${formatDate[2]}`;
      let date = dayjs(formatDate).format("YYYY-MM-DD");
      let week = dayjs(date).isoWeek();
      if (item.status === "done" || item.status === "archive") {
        // // console.log(week);
        if (weeks[week]) {
          weeks[week] = weeks[week] + 1;
        } else {
          weeks[week] = 1;
        }
      }
    });

    let weeksRecord = Object.keys(weeks).map((key) => weeks[key]).length
      ? Object.keys(weeks).map((key) => weeks[key])
      : [0, 0];
    const weekAverage =
      weeksRecord.reduce((prev, act) => prev + act) / weeksRecord.length;
    return weekAverage.toFixed(1);
  } else {
    return 0;
  }
};
