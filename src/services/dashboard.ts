import { API } from "../middlewares/middleware";

const getAllData = (userId: string): Promise<any> => {
  return API.get("dashboard/user/" + userId, { params: { userId } });
};
export { getAllData };
