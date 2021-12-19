import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PurchasePagination from "../../components/Pagination/PurchasePagination";
import PurchaseListItems from "../../components/Pagination/PurchaseListItems";
import { getPurchaseActionThunk } from "../../store/purchases/purchase.actions.async";
import RootState from "../../store/types";

const pageCount = 1;

const PurchaseList: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const purchaseEntryList = useSelector(
    (state: RootState) => state.purchase.purchase
  );
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current!.value) {
        dispatch(
          getPurchaseActionThunk(
            pageCount,
            itemsPerPage,
            inputRef.current!.value || undefined
          )
        );
      }
    }, 400);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredFilter, inputRef]);

  const fetchPurchases = (page?: number) =>
    dispatch(getPurchaseActionThunk(page || pageCount, itemsPerPage));

  return (
    <div id="app">
      <ToastContainer />
      <div className="content-wrapper">
        <div className="content">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>{t("purchases")}</h1>
              </div>
            </div>
          </header>
          <section className="page-content container-fluid">
            <div className="card card-tabs clearfix">
              <div className="card-body p-0">
                <div className="tab-content">
                  <div className="tab-pane fadeIn active" id="tab-1">
                    <div className="p-3 d-flex justify-content-between inner-filter">
                      <div className="d-flex justify-content-center align-items-center">
                        <label style={{ fontSize: "1rem" }}>
                          {t("pageLimit")}:{" "}
                        </label>
                        &nbsp;
                        <select
                          defaultValue={10}
                          onChange={(e) =>
                            setItemsPerPage(Number(e.target.value))
                          }
                          className="custom-select form-control select2 w-150"
                        >
                          <option value={5}>5</option>
                          <option value={8}>8</option>
                          <option value={10}>10</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Inventory Name"
                          ref={inputRef}
                          onChange={(e) => setEnteredFilter(e.target.value)}
                        />
                        <div className="m-l-10">
                          <Link to="/admin/purchases/new">
                            <button type="button" className="btn btn-success">
                              {t("newPurchase")}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="table">
                      <PurchasePagination
                        ItemsComponent={PurchaseListItems}
                        itemsPerPage={itemsPerPage}
                        pageCount={
                          purchaseEntryList.purchaseEntries
                            ? purchaseEntryList.count
                            : 1
                        }
                        dispatchAction={fetchPurchases}
                      />
                    </div>
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

export default PurchaseList;
