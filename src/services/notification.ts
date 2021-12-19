import { API } from "../middlewares/middleware";

const getNotifications = (
  userId: string,
  page: number,
  perPage: number,
  isRead: string,
  sort?: string,
  sortBy?: string
): Promise<any> => {
  return API.get("/notification/" + userId, {
    params: { page, perPage, sort, sortBy, isRead },
  });
};

const deleteMultipleNotifications = (ids: string[]): Promise<any> => {
  return API.post("/notification/deleteByIds", { ids });
};

const markAsReadNotifications = (ids: string[]): Promise<any> => {
  return API.post("/notification/updateStatus", { ids, isRead: true });
};

const deleteSingleNotification = (id: string): Promise<any> => {
  return API.delete("/notification/" + id);
};

export {
  getNotifications,
  deleteMultipleNotifications,
  deleteSingleNotification,
  markAsReadNotifications,
};
