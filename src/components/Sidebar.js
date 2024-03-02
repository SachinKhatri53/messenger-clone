import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faUserGroup,
  faStore,
  faCommentDots,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import supabase from "../Supabase/supabase";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar(props) {
  const [imageURL, setImageURL] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.user && props.user.profile_image) {
      setUser(props.user);
      setImageURL(props.user.profile_image);
    }
  }, [props.user]);
  const handleRedirect = (endpoint) => {
    navigate(endpoint);
  };
  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Could not signout: ", error);
    }
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-bottom">Chat</Tooltip>}
      >
        <div className="sidebar--chat">
          <FontAwesomeIcon icon={faComment} />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-right">People</Tooltip>}
      >
        <div className="sidebar--people">
          <FontAwesomeIcon icon={faUserGroup} />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-right">Market</Tooltip>}
      >
        <div className="sidebar--market">
          <FontAwesomeIcon icon={faStore} />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-right">Chat Request</Tooltip>}
      >
        <div className="sidebar--chat-request">
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-right">Archive</Tooltip>}
      >
        <div className="sidebar--archive">
          <FontAwesomeIcon icon={faBoxArchive} />
        </div>
      </OverlayTrigger>
      <hr />
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-right">Profile</Tooltip>}
      >
        <div
          className="sidebar--profile"
          onClick={() => handleRedirect("/profile")}
        >
          <img src={imageURL} alt="" className="rounded-circle" />
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-right">Logout</Tooltip>}
      >
        <div className="sidebar--logout text-danger" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </OverlayTrigger>
    </div>
  );
}
