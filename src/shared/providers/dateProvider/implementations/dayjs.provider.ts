import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from "../dateProvider.types";

dayjs.extend(utc);

export class DayJSProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date) {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(start_date_utc).diff(end_date_utc, 'hours')
  }

  convertToUTC(date: Date) {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }
}