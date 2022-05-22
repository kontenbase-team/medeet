import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";

import type { DateTime, Locale } from "~/types";

dayjs().format();
dayjs.extend(relativeTime);

export const getYear = (locale: Locale = "en") =>
  dayjs().locale(locale).format("YYYY");

export const getDayName = (locale: Locale = "en") =>
  dayjs().locale(locale).format("dddd");

export const getMonthYear = (date: DateTime) => dayjs(date).format("MMMM YYYY");

export const getCompleteDate = (date: DateTime) =>
  dayjs(date).format("D MMMM YYYY");

export const getCompleteDateTime = (date: DateTime) =>
  dayjs(date).format("D MMMM YYYY [at] HH:mm");

export const getRelativeDate = (date: DateTime) => dayjs().to(dayjs(date));
