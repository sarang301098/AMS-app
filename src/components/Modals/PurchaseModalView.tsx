import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Avatar from "react-avatar";
import { Modal } from "react-bootstrap";

import RootState from "../../store/types";

interface Prop {
  show: boolean;
  hideModal: Function;
  viewDetails: Record<string, string>;
}
const PurchaseModalView: React.FC<Prop> = ({
  show,
  hideModal,
  viewDetails,
}) => {
  const userData = useSelector((state: RootState) => state.user.userData);

  const checkViewData = () => {
    return Object.keys(viewDetails).length > 0;
  };

  return checkViewData() ? (
    <Modal centered size="lg" show={show} onHide={hideModal}>
      <Modal.Header>
        <h4 className="modal-title">{viewDetails.title || ""} Details</h4>
        <button className="close" onClick={() => hideModal()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="card">
          <div className="card-header">
            <div className="d-flex">
              <Avatar
                name={userData.username || ""}
                size="40"
                round={true}
                style={{ marginRight: "10px" }}
              />
              <div>
                <h5
                  style={{ textTransform: "capitalize", margin: "-2px 0 0 0" }}
                >
                  {userData.username || ""}
                </h5>
                <p className="card-text" style={{ margin: 0 }}>
                  Created at {moment(viewDetails.createdAt).format("LLL") || ""}
                </p>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="calendar-day-view">
                <span className="month">
                  {moment(viewDetails.createdAt).format("MMM") || ""}
                </span>
                <h4>{moment(viewDetails.createdAt).format("D")}</h4>
                <span className="day">
                  {moment(viewDetails.createdAt).format("dddd") || ""}
                </span>
              </div>
              <span style={{ marginLeft: "15px" }}>
                Created by {userData ? userData.username : ""}.
              </span>
            </div>
            <div className="container d-flex mt-4">
              <div className="col-md-3">
                <h5>Inventory Name: </h5>
                <span>{viewDetails.inventoryName || ""}</span>
              </div>
              <div className="col-md-3">
                <h5>Units:</h5>
                <span>{viewDetails.units || ""}</span>
              </div>
              <div className="col-md-3">
                <h5>Single Unit Amount:</h5>
                <span>{viewDetails.singleUnitAmount || ""}</span>
              </div>
              <div className="col-md-3">
                <h5>Total Amount:</h5>
                <span>{viewDetails.totalAmount || ""}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  ) : null;
};

export default PurchaseModalView;
