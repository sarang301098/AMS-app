import { API } from "../middlewares/middleware";

const getModels = (brandId: string): Promise<any> => {
  return API.get("/model/options", { params: { brandId } });
};

const addModel = (name: string, brandId: string): Promise<any> => {
  return API.post("/model/", { name, brandId });
};

const deleteModel = (modelId: string): Promise<any> => {
  return API.delete(`/model/${modelId}`);
};
export { getModels, addModel, deleteModel };
