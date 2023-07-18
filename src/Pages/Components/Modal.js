import React, { Children } from "react";
import ReactDOM from "react-dom";

function Modal({ showModal, setShowModal, children }) {
  if (showModal) {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__content">
          <div
            className="modal__content--close-modal"
            onClick={() => setShowModal(false)}
          >
            x
          </div>
          <div>{children}</div>
        </div>
      </div>,
      document.querySelector(".modal-container")
    );
  }
}

export default Modal;
