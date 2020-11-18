import React from "react";
import { Link } from "react-router-dom";

import "./UserAvatar.css";

const UserAvatar = ({ type, src, userId }) => {
  let size;
  if (type === "comment") {
    size = "is-32x32";
  } else if (type === "subcomment") {
    size = "is-24x24";
  } else {
    size = "is-48x48";
  }

  return (
    <Link to={`/users/${userId}`}>
      <figure className={`image user-avatar ${size ? size : ""}`}>
        <img className="is-rounded" src={src} alt="User avatar" />
      </figure>
    </Link>
  );
};

export default UserAvatar;
