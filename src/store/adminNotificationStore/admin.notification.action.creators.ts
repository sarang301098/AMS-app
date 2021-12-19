import { action } from "typesafe-actions";
import actionTypes from "./action.enum";
import { IAdminNotificationPayload } from "./types";

/**
 * get notifications success action creator
 * @param payload
 * @returns
 */
const getAdminNotificationsSuccess = (payload: object) =>
  action(actionTypes.GET_ADMIN_NOTIFICATIONS_SUCCESS, payload);

/**
 * get notifications failed action creator
 * @param payload
 * @returns
 */
const getAdminNotificationsFailed = (payload: object) =>
  action(actionTypes.GET_ADMIN_NOTIFICATIONS_FAILED, payload);

/**
 * get notification pending action creator
 * @returns
 */
const getAdminNotificationsPending = () =>
  action(actionTypes.GET_ADMIN_NOTIFICATIONS_PENDING);

/**
 * read notifications success action creator
 * @returns
 */
const readAdminNotificationsSuccess = () =>
  action(actionTypes.READ_ADMIN_NOTIFICATIONS_SUCCESS);

/**
 * read admin notification failed action creator
 * @returns
 */
const readAdminNotificationFailed = () =>
  action(actionTypes.READ_ADMIN_NOTIFICATIONS_FAILED);

/**
 * read admin notification pending action creator
 * @returns
 */
const readAdminNotificationPending = () =>
  action(actionTypes.READ_ADMIN_NOTIFICATIONS_PENDING);

/**
 * delete admin notification pending action creator
 * @returns
 */
const deleteAdminNotificationPending = () =>
  action(actionTypes.DELETE_ADMIN_NOTIFICATIONS_PENDING);

/**
 * delete admin notification success action creator
 * @returns
 */
const deleteAdminNotificationSuccess = () =>
  action(actionTypes.DELETE_ADMIN_NOTIFICATIONS_SUCCESS);

/**
 * delete admin notification failed action creator
 * @returns
 */
const deleteAdminNotificationFailed = () =>
  action(actionTypes.DELETE_ADMIN_NOTIFICATIONS_FAILED);



/**
 * get header notifications success action creator
 * @param payload 
 * @returns
 */
const getAdminHeaderNotificationsSuccess = (
  payload: IAdminNotificationPayload[]
) => action(actionTypes.GET_HEADER_ADMIN_NOTIFICATIONS_SUCCESS, payload);

export {
  getAdminNotificationsSuccess,
  getAdminNotificationsFailed,
  getAdminNotificationsPending,
  getAdminHeaderNotificationsSuccess,
  readAdminNotificationsSuccess,
  readAdminNotificationFailed,
  readAdminNotificationPending,
  deleteAdminNotificationPending,
  deleteAdminNotificationSuccess,
  deleteAdminNotificationFailed,
};
