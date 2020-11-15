import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.querySelector("#modal");

const BaseModal = ({ children, className }) => {
  const [modalEl, setModalEl] = useState(null);

  useEffect(() => {
    const modalEl = document.createElement("div");
    modalRoot.appendChild(modalEl);
    setModalEl(modalEl); // re-render this component
    return () => modalRoot.removeChild(modalEl);
  }, []);

  if (modalEl === null) return null;

  return ReactDOM.createPortal(
    <div className={className}>{children}</div>,
    modalEl
  );
};
export default BaseModal;
