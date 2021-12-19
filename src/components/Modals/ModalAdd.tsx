import React from "react";
import { Modal } from "react-bootstrap";

interface Prop {
  show: boolean;
  hideModal: Function;
  title: string;
  children: React.ReactNode;
}

const ModalAdd: React.FC<Prop> = ({ show, hideModal, title, children }) => {
  return (
    <Modal centered size="lg" show={show || false} onHide={hideModal}>
      <Modal.Header>
        <h4 className="modal-title">{title}</h4>
        <button className="close" onClick={() => hideModal()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
