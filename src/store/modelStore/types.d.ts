import * as actions from "./model.action.creators";
import { ActionType } from "typesafe-actions";

type ModelOptions = {
  value: string;
  label: string;
};

type IModelPayload = {
  modelOptionsCount: number;
  modelOptions: ModelOptions[];
};

type IModelState = {
  loading: boolean;
  models: IModelPayload;
  error: string;
};

type IModelTypes = ActionType<typeof actions>;

export { IModelPayload, IModelState, IModelTypes };
