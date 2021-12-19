import { action } from 'typesafe-actions';
import actionTypes from './action.enum';
import { INotificationPayload,INotificationState } from './types';

/**
 * get notifications success action creator
 * @param payload 
 * @returns 
 */
const getNotificationsSuccess = (payload: INotificationState) => action(actionTypes.GET_NOTIFICATIONS_SUCCESS, payload)

/**
 * get notifications failed action creator
 * @param payload 
 * @returns 
 */
const getNotificationsFailed = (payload: object) => action(actionTypes.GET_NOTIFICATIONS_FAILED, payload)

/**
 * get notification pending action creator 
 * @returns 
 */
const getNotificationsPending = () => action(actionTypes.GET_NOTIFICATIONS_PENDING)


/**
 * delete notification success action creator 
 * @param payload 
 * @returns 
 */
const deleteNotificationsSuccess = (payload: object) => action(actionTypes.DELETE_NOTIFICATIONS_SUCCESS, payload)

/**
 * delete notification failed action creator 
 * @param payload 
 * @returns 
 */
const deleteNotificationsFailed = (payload: object) => action(actionTypes.DELETE_NOTIFICATIONS_FAILED, payload)

/**
 * delete notification pending action creator 
 * @returns 
 */
const deleteNotificationsPending = () => action(actionTypes.DELETE_NOTIFICATIONS_PENDING)

/**
 * read notification success action creator
 * @param payload 
 * @returns 
 */
const readNotificationsSuccess = (payload: object) => action(actionTypes.READ_NOTIFICATIONS_SUCCESS, payload)

/**
 * read notification failed action creator
 * @param payload 
 * @returns 
 */
const readNotificationsFailed = (payload: object) => action(actionTypes.READ_NOTIFICATIONS_FAILED, payload)

/**
 * read notification pending action creator
 * @returns 
 */
const readNotificationsPending = () => action(actionTypes.READ_NOTIFICATIONS_PENDING)

/**
 * get header notification action creator
 * @param payload 
 * @returns 
 */
const getHeaderNotificationsSuccess = (payload:INotificationPayload[]) => action(actionTypes.GET_HEADER_NOTIFICATIONS_SUCCESS, payload)

export {
    getNotificationsSuccess,
    getNotificationsFailed,
    getNotificationsPending,
    getHeaderNotificationsSuccess,
    deleteNotificationsSuccess,
    deleteNotificationsFailed,
    deleteNotificationsPending,
    readNotificationsSuccess,
    readNotificationsFailed,
    readNotificationsPending,

}