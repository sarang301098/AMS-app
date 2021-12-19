import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Pagination from "../../components/Pagination/Pagination";
import UserListItems from "../../components/Pagination/UserListItems";
import { getUserDataAction } from "../../store/userList/userData.action.async";
import RootState from "../../store/types";

const pageCount = 1;

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state: RootState) => state.userData.userData);
  const [filter, setFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);
  const fetchUser = (page?: number) =>
    dispatch(getUserDataAction(page || pageCount, itemsPerPage, filter));

  return (
    <div id="app">
      <ToastContainer />
      <div className="content-wrapper">
        <div className="content">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>Users</h1>
              </div>
            </div>
          </header>
          <section className="page-content container-fluid">
            <div className="card card-tabs clearfix">
              <div className="card-body p-0">
                <div className="tab-content">
                  <div className="tab-pane fadeIn active" id="tab-1">
                    <Pagination
                      ItemsComponent={UserListItems}
                      itemsPerPage={itemsPerPage}
                      pageCount={usersData ? usersData.totalUsersCount : 1}
                      dispatchAction={fetchUser}
                      filter={filter}
                      setItemsPerPage={setItemsPerPage}
                      setFilter={setFilter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserList;
