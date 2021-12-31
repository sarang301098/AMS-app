import { API } from "../middlewares/middleware";
import { purchaseEntryPayload } from "../store/purchases/types";

/**
 * get brand id api call
 */
export const getPurchaseBrandIdApi = (): Promise<any> => {
  return API.get("/brand/options");
};

/**
 * get brand id api call
 */
export const getPurchaseModelIdApi = (brandId: string): Promise<any> => {
  return API.get("/model/options", { params: { brandId } });
};

/**
 * post purchase entry Api call
 * @param values
 * @returns
 */
export const purchaseEntryApi = (
  values: purchaseEntryPayload
): Promise<any> => {
  return API.post("/purchaseEntry", values);
};

/**
 * get purchase entry Api call
 * @param brandId
 * @returns
 */
export const getPurchaseApi = (
  page: number,
  perPage: number,
  inventoryName?: string,
  isPaginate?: boolean,
  startDate?: string,
  endDate?: string
): Promise<any> => {
  return API.get("/purchaseEntry", {
    params: { page, perPage, inventoryName, isPaginate:true, startDate, endDate },
  });
};

/**
 * get inventory api call
 */
export const getInventoryNameApi = (): Promise<any> => {
  return API.get("/inventoryName/options");
};

/**
 * post inventory api call
 */
export const inventoryNameApi = (values: string): Promise<any> => {
  return API.post("/inventoryName", values);
};
