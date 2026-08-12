import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { confirmable, createConfirmation } from "react-confirm";

const ConfirmModel = (props) => {
  const {
    proceedLabel,
    cancelLabel,
    title,
    confirmation,
    show,
    proceed,
    enableEscape = true,
  } = props;
  return (
    <div className="static-modal">
      <Modal
        isOpen={show}
        centered
        hidden={() => proceed(false)}
        backdrop={enableEscape ? true : "static"}
        keyboard={enableEscape}
        className="modal-confirm modal-dialog-end m-0 mx-auto"
      >
        {/* <ModalHeader>{title}</ModalHeader> */}
        <ModalBody className="p-3 text-center">
          <p>{confirmation}</p>
        </ModalBody>
        <ModalFooter className="d-flex align-items-center mx-auto justify-content-between border-0">
          <div className="col">
            <a
              className="btn btn-primary btn-block rounded my-4"
              onClick={() => proceed(false)}
            >
              {cancelLabel}
            </a>
          </div>
          <div className="col">
            <a
              className="btn btn-primary btn-block rounded my-4"
              onClick={() => proceed(true)}
            >
              {proceedLabel}
            </a>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmModel;

ConfirmModel.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool,
};

export const confirm = (
  confirmation,
  proceedLabel = "Yes",
  cancelLabel = "No",
  options = {}
) => {
  return createConfirmation(confirmable(ConfirmModel))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
};
