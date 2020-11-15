import React from "react";

import BaseModal from "./BaseModal";
import "./Loading.css";

const Loading = () => {
  return (
    <BaseModal className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="loader-wrapper is-active">
          <div className="loader is-loading"></div>
        </div>
      </div>
    </BaseModal>
  );
};

export default Loading;
