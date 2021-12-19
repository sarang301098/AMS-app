import { API } from "../middlewares/middleware";

const getReport = (startDate: Date, endDate: Date): Promise<any> => {
  return API.get("/assignInventory", { params: { startDate, endDate } });
};

const getReportList = (
  isPaginate: boolean,
  startDate: Date,
  endDate: Date,
  page: number,
  perPage: number
): Promise<any> => {
  return API.get("/assignInventory", {
    params: { isPaginate, startDate, endDate, page, perPage },
  });
};

export { getReport, getReportList };
