import { API } from "../middlewares/middleware";

const getAdminNotifications = (
  page: number,
  perPage: number,
  filter:string,
  sort?: string,
  sortBy?: string
): Promise<any> => {
  return API.get("notification/admin/all", {
    params: { page, perPage, sort, sortBy, isRead:filter },
  });
};

const markAsReadAdminNotifications = (ids: string[]): Promise<any> => {
  return API.post("/notification/updateStatus", { ids, isRead: true });
};

const deleteSingleAdminNotification = (id: string): Promise<any> => {
  return API.delete("/notification/" + id);
};

const deleteMultipleNotifications = (ids: string[]): Promise<any> => {
  return API.post("/notification/deleteByIds", { ids });
};

export {
  getAdminNotifications,
  markAsReadAdminNotifications,
  deleteSingleAdminNotification,
  deleteMultipleNotifications
};
