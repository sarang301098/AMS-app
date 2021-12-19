import * as actions from "./brand.action.creators";
import { ActionType } from "typesafe-actions";

type BrandOptions = {
  value: string;
  label: string;
};

type IBrandPayload = {
  brandOptionsCount: number;
  brandOptions: BrandOptions[];
};

type IBrandState = {
  loading: boolean;
  brands: IBrandPayload;
  error: string;
};

type IBrandTypes = ActionType<typeof actions>;

export { IBrandTypes, IBrandState, IBrandPayload };
