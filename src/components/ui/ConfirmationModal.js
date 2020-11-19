import React from "react";
import BaseModal from "./BaseModal";

const ConfirmationModal = ({
  isDelete,
  title,
  show,
  close,
  buttonText,
  confirm,
  children,
}) => {
  let titleclassName;
  if (isDelete) {
    titleclassName = "has-background-danger";
  } else {
    titleclassName = "has-background-info";
  }

  if (!show) return null;
  return (
    <BaseModal className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className={`modal-card-head ${titleclassName}`}>
          <p className={`modal-card-title ${titleclassName}`}>{title}</p>
          <button className="delete" onClick={close}></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot is-justify-content-flex-end">
          <button className="button" onClick={close}>
            Cancel
          </button>
          <button className={`button ${titleclassName}`} onClick={confirm}>
            {buttonText}
          </button>
        </footer>
      </div>
    </BaseModal>
  );
};

export default ConfirmationModal;
