import { unitType } from "../utils";
import WeekCell from "./WeekCell";
import DayCell from "./DayCell";

export const cellMapper = {
  [unitType.DAY]: DayCell,
  [unitType.WEEK]: WeekCell,
};
