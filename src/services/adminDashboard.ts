import { API } from "../middlewares/middleware";
/**
 * getDashboardData API call
 * @returns 
 */
const getDashboardData = (): Promise<any> => {
  return API.get("/dashboard/admin");
};
export { getDashboardData };
