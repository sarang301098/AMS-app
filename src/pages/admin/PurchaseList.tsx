import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import PurchasePagination from "../../components/Pagination/PurchasePagination";
import PurchaseListItems from "../../components/Pagination/PurchaseListItems";
import { getPurchaseActionThunk } from "../../store/purchases/purchase.actions.async";
import { getPurchaseApi } from "../../services/purchase";
import RootState from "../../store/types";
import { DateRange } from "react-date-range";
import { CSVLink } from "react-csv";
import moment from "moment";

const pageCount = 1;

const PurchaseList: React.FC = () => {
  const [showDate, setShowDate] = useState(false);
  const [state, setState]: any = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const showDatePicker = () => {
    setShowDate((show) => !show);
  };
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const purchaseEntryList = useSelector(
    (state: RootState) => state.purchase.purchase
  );
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState([]);
  const headers = [
    { label: "id", key: "_id" },
    { label: "Brand_Id", key: "brandId" },
    { label: "Purchase_Date", key: "purchasedDate" },
    { label: "Units", key: "units" },
    { label: "SingleUnitAmount", key: "singleUnitAmount" },
    { label: "TotalAmount", key: "totalAmount" },
    { label: "InventoryName", key: "inventoryName" },
    { label: "ModelId", key: "modelId" },
    { label: "CreatedAt", key: "createdAt" },
    { label: "UpdatedAt", key: "updatedAt" },
  ];

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

  const helper = (startDate: string, endDate: string) => {
    return `Peerbits Purchases (${moment(startDate).format(
      "MM/dd/yyyy"
    )}-${moment(endDate).format("MM/dd/yyyy")})`;
  };
  const csvReport = {
    filename: helper(state.startDate, state.endDate),
    headers: headers,
    data: data,
  };

  const handleClick = () => {
    getPurchaseApi(
      pageCount,
      itemsPerPage,
      enteredFilter,
      true,
      state.startDate,
      state.endDate
    )
      .then((res) => {
        setData(res.data.purchaseEntries);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

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

                        {showDate && (
                          <div
                            style={{
                              position: "absolute",
                              right: "0",
                              top: "60px",
                            }}
                          >
                            <DateRange
                              editableDateInputs={true}
                              onChange={(item) => {
                                setState([item.selection]);
                                handleClick();
                              }}
                              moveRangeOnFirstSelection={false}
                              ranges={state}
                            />
                          </div>
                        )}
                        <div className="m-l-10">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={showDatePicker}
                          >
                            Select Date
                          </button>
                        </div>
                        <div>
                          <CSVLink {...csvReport}>
                            <button
                              type="button"
                              className="btn btn-success"
                              style={{ marginLeft: "10px" }}
                            >
                              Download CSV
                            </button>
                          </CSVLink>
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
