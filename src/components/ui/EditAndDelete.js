import React, { useState } from "react";

const EditAndDelete = ({ isAuthor, toggleEdit, toggleDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  if (!isAuthor) return null;

  return (
    <div
      className={`dropdown ${showDropdown ? "is-active" : ""}`}
      onClick={toggleDropdown}
    >
      <div className="dropdown-trigger">
        <span className="icon">
          <i className="fas fa-ellipsis-v"></i>
        </span>
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={toggleEdit}>
            <span>Edit</span>
            <span className="icon has-text-info">
              <i className="fas fa-pencil-alt"></i>
            </span>
          </div>
          <div className="dropdown-item" onClick={toggleDelete}>
            <span>Delete</span>
            <span className="icon has-text-danger">
              <i className="fas fa-trash-alt"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAndDelete;
