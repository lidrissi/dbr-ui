import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import * as dates from "./dates";
import cx from "./cx";

dayjs.extend(weekOfYear);

const unitType = {
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  QUARTER: "QUARTER",
  YEAR: "YEAR",
};

export { dates, cx, dayjs, unitType };
