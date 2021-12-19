import { API } from "../middlewares/middleware";

const getBrand = (): Promise<any> => {
  return API.get("/brand/options");
};

const addBrand = (name:string): Promise<any> => {
    return API.post("/brand/",{name});
  };

const deleteBrand = (brandId:string): Promise<any> => {
  return API.delete(`/brand/${brandId}`);
};

export { getBrand, addBrand, deleteBrand };
