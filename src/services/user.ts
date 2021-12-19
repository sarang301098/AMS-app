import { API } from "../middlewares/middleware";
import { addUserData } from "../store/userList/types";

/**
 * get user data api call
 * @param page
 * @param perPage
 * @param name
 * @returns
 */
const getAllUser = (
  page: number,
  perPage: number,
  name?: string
): Promise<any> => {
  return API.get("/users/all/toAdmin", { params: { page, perPage, name } });
};

/**
 * add new user api call
 * @param values
 * @returns
 */
const addNewUser = (values: addUserData): Promise<any> => {
  return API.post("/users/byAdmin", values);
};
export { getAllUser, addNewUser };
