import { API } from "../middlewares/middleware";
/**
 * getAdminAllRequest API Call
 * @param page
 * @param perPage
 * @param status
 * @returns
 */
const getAdminAllRequest = (
  page: number,
  perPage: number,
  status?: string,
  userName?: string
): Promise<any> => {
  return API.get("/request/all/admin", {
    params: { page, perPage, status, userName },
  });
};

/**
 * updateAdminRequest API Call
 * @param status
 * @param _id
 * @returns
 */
const updateAdminRequest = (status: string, _id: string): Promise<any> => {
  return API.put("/request/admin/" + _id, { status });
};

const checkAvailableBrand = (inventoryName: string): Promise<any> => {
  return API.get("brand/options/byInventory", { params: { inventoryName } });
};

const checkAvailableModels = (inventoryName:string, brandId:string ): Promise<any> => {
  return API.get("/model/options/byInventory", {params:{inventoryName, brandId}})
}

const checkAvailability = (
  brandId: string,
  modelId: string,
  inventoryName: string
): Promise<any> => {
  return API.get("/inventory/check/inventoryDetail", {
    params: {
      brandId,
      modelId,
      inventoryName,
    },
  });
};

const assignInventory = (
  inventoryDetailId: string,
  requestId: string
): Promise<any> => {
  return API.post("/inventory/assign/new", { inventoryDetailId, requestId });
};
export {
  getAdminAllRequest,
  updateAdminRequest,
  checkAvailability,
  assignInventory,
  checkAvailableBrand,
  checkAvailableModels
};
