import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as actionCreator from "./profile.action.creators";
import * as requestFromServer from "../../services/profile";
import { AnyAction } from "redux";
import { toast } from "react-toastify";

const toastSuccess = (suceesMeassage: string) => toast.success(suceesMeassage);
const toastError = (ErrorMeassage: string) => toast.error(ErrorMeassage);

const editProfileAction = (
  id: string,
  values: object
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.generaldataPending());
    return requestFromServer
      .editprofile(id, values)
      .then(() => {
        toastSuccess("Profile updated");
        dispatch(actionCreator.generaldataSuccess());
      })
      .catch(() => {
        toastError("Something went wrong!");
        dispatch(actionCreator.generaladataFailed());
      });
  };
};

export { editProfileAction };
