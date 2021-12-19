import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import { UserDataPayload } from "../../store/userList/types";
import RootState from "../../store/types";
import ScaleLoader from "react-spinners/ScaleLoader";
import { getUserDataAction } from "../../store/userList/userData.action.async";

interface Prop {
  itemsPerPage: number;
  filter: string;
  page: number;
  setItemsPerPage: Function;
  setFilter: Function;
}

const UserListItems: React.FC<Prop> = ({
  itemsPerPage,
  filter,
  page,
  setItemsPerPage,
  setFilter,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentUserData = useSelector(
    (state: RootState) => state.userData.userData.totalUsers
  );

  // const currentUserDataCount = useSelector(
  //   (state: RootState) => state.userData.userData.totalUsersCount
  // );

  const loading = useSelector((state: RootState) => state.userData.loading);

  const handleSearch = useCallback(() => {
    dispatch(getUserDataAction(page || 1, itemsPerPage, filter));
  }, [filter, page, itemsPerPage, dispatch]);

  useEffect(() => {
    const timeOutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeOutId);
  }, [filter, handleSearch]);

  return (
    <>
      <div className="p-3 d-flex justify-content-between inner-filter">
        <div className="d-flex justify-content-center align-items-center">
          <label style={{ fontSize: "1rem" }}>{t("pageLimit")}: </label>
          &nbsp;
          <select
            defaultValue={10}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="custom-select form-control select2 w-150"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="d-flex align-items-center">
          <div>
            <input
              type="text"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="form-control"
              placeholder="Search user"
            />
          </div>

          <div className="m-l-10">
            <Link to="/admin/user/new">
              <button type="button" className="btn btn-success">
                New User
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="table-responsive"
        style={{ minHeight: "calc(100vh - 300px)" }}
      >
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>User Name</th>
              <th style={{ width: "20%" }}>Email</th>
              <th style={{ width: "10%" }}>Type</th>
              <th style={{ width: "25%" }}>Full Name</th>
              <th style={{ width: "15%" }}>Contact</th>
              <th className="table-field-actions" style={{ width: "5%" }}>
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <ScaleLoader color="#F7B500" loading={loading} />
                </td>
              </tr>
            ) : currentUserData && currentUserData.length > 0 ? (
              currentUserData.map((user: any) => (
                <tr key={user && user._id}>
                  <td>{user && user.username ? user.username : "NA"}</td>
                  <td>{user && user.email}</td>
                  <td>{user && user.type}</td>
                  <td>
                    {user && user.general && user.general.fName
                      ? `${user.general.fName}  ${user.general.mName} ${user.general.lName}`
                      : "NA"}
                  </td>
                  <td>
                    {user && user.contact && user.contact.workPhone
                      ? user.contact.workPhone
                      : "NA"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserListItems;
