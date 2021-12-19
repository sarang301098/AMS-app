import { API } from "../middlewares/middleware";
import { ReqInitialValues } from "../store/requestStore/types";

/**
 * get requests api
 * @param skip
 * @param limit
 * @returns
 */
const getAllRequest = (
  page: number,
  perPage: number,
  status?: string
): Promise<any> => {
  return API.get("/request/all/user", { params: { page, perPage, status } });
};

/**
 * make request api
 * @param values
 * @returns
 */

const makeNewRequest = (values: ReqInitialValues): Promise<any> => {
  return API.post("/request/create", {
    ...values,
  });
};

/**
 * get single request api
 * @param id
 * @returns
 */
const getSingleRequest = (id: string): Promise<any> => {
  return API.get("/request/" + id);
};

/**
 * update request api
 * @param id
 * @param values
 * @returns
 */
const updateRequest = (id: string, values: ReqInitialValues): Promise<any> => {
  return API.put("/request/" + id, { ...values });
};

const deleteRequest = (id: string): Promise<any> => {
  return API.delete("/request/" + id);
};



export {
  getAllRequest,
  makeNewRequest,
  getSingleRequest,
  updateRequest,
  deleteRequest,
};
