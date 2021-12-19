import { action } from "typesafe-actions";
import actionTypes from "./action.enum";

const generaldataPending = () => action(actionTypes.GENERAL_DATA_PENDING);
const generaldataSuccess = () => action(actionTypes.GENERAL_DATA_SUCCESS);
const generaladataFailed = () => action(actionTypes.GENERAL_DATA_FAILED);

export { generaldataPending, generaldataSuccess, generaladataFailed };
