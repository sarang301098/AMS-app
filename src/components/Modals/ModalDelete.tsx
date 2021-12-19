import React from "react";
import { Modal } from "react-bootstrap";

interface Prop {
  show: boolean;
  hideModal: Function;
  deleteAction: Function;
  message?: string;
}

const ModalDelete: React.FC<Prop> = ({
  show,
  hideModal,
  deleteAction,
  message,
}) => {
  return (
    <Modal centered show={show} onHide={hideModal}>
      <Modal.Header className="justify-content-center border-0">
        <h3 className="modal-title">Delete</h3>
      </Modal.Header>
      <Modal.Body className="text-center">
        <span>
          <i className="fa fa-trash-alt fa-3x text-danger"></i>
        </span>
        <p className="font-size-18 m-0 mt-2"> Are you sure want to delete?</p>
        {message && (
          <p className="font-size-15 m-0 mt-2 text-danger"> {message}</p>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-0">
        <button className="btn btn-dark min-w-100" onClick={() => hideModal()}>
          No
        </button>
        <button
          className="btn btn-danger min-w-100"
          onClick={() => {
            deleteAction();
            hideModal();
          }}
        >
          Yes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
