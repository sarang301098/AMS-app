import { ActionType } from "typesafe-actions";
import * as actions from "./profile.action.creators";

type IGeneralInitialvalues = {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dob: string;
};
type IGeneralActionTypes = ActionType<typeof actions>;
export { IGeneralInitialvalues, IGeneralActionTypes };
