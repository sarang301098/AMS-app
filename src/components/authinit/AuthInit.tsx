import React, { useRef, useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { getUserDataByToken } from "../../services/auth";
import RootState from "../../store/types";
import {
  fulfillUserData,
  logout,
} from "../../store/userStore/user.action.creators";
import { Spinner } from "../loader/Spinner";

function AuthInit(props: any) {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const authToken = useSelector(
    (state: RootState) => state.user.token,
    shallowEqual
  );

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { data: user } = await getUserDataByToken();
          dispatch(fulfillUserData(user));
        }
      } catch (error) {
        if (!didRequest.current) {
          dispatch(logout());
        }
      } finally {
        setShowSplashScreen(false);
      }
      return () => (didRequest.current = true);
    };

    if (authToken) {
      requestUser();
    } else {
      dispatch(fulfillUserData(undefined));
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, [authToken]);

  return showSplashScreen ? Spinner : <>{props.children}</>;
}

export default AuthInit;
