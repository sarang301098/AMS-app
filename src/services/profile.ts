import { API } from "../middlewares/middleware";

/**
 * editprofile API Call
 * @param id
 * @param values
 * @returns
 */

const editprofile = (id: string, values: any): Promise<any> => {
  return API.put("/users/" + id, { ...values });
};
export { editprofile };
