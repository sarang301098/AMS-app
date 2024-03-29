import { Middleware, MiddlewareAPI, Dispatch, AnyAction, Action } from "redux";
import axios from "axios";
import store from "../store/store";

export const API = axios.create({
  baseURL: "http://localhost:3333" || "https://amsapi.sarangpatel.live/",  //https://backapi-ams.herokuapp.com
});

/**
 * setting up middleware in order to dispatch redux actions
 * Injecting redux store
 */

let authToken: string | null | undefined;

export const apiMiddleware: Middleware =
  (api: MiddlewareAPI<any>) =>
  (next: Dispatch<AnyAction>) =>
  (action: Action) => {
    API.interceptors.request.use(
      (config: any) => {
        const rootState: any = store && store.getState();
        authToken = rootState && rootState.user && rootState.user.token;

        if (authToken) {
          const auth = authToken ? `Bearer ${authToken}` : "";

          config.headers.Authorization = auth;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    API.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    next(action);
  };
