import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./ErrorMessage.css";

const modalRoot = document.querySelector("#modal");

const ErrorMessage = ({ errorMessage, onClick }) => {
  const [modalEl, setModalEl] = useState(null);

  useEffect(() => {
    const modalEl = document.createElement("div");
    modalRoot.appendChild(modalEl);
    setModalEl(modalEl); // re-render this component
    return () => modalRoot.removeChild(modalEl);
  }, []);

  if (modalEl === null) return null;

  return ReactDOM.createPortal(
    <div>
      {errorMessage && (
        <div className="modal-background" onClick={onClick}></div>
      )}
      <div
        onClick={onClick}
        className={`modal-content has-text-black ${errorMessage ? "show" : ""}`}
      >
        <div className="box has-background-danger">{errorMessage}</div>
      </div>
    </div>,
    modalEl
  );
};

export default ErrorMessage;
