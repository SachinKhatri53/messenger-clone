import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUserGroup, faStore, faCommentDots, faBoxArchive } from "@fortawesome/free-solid-svg-icons";



export default function Sidebar ({user}) {
  const [imageURL, setImageURL] = React.useState(null)
  
  React.useEffect(() => {
    if(user && user.profile_image){
      setImageURL(user.profile_image)
    }
  }, [user])

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
        <div className="sidebar--profile">
          <img src={imageURL} alt="" className="rounded-circle" />
        </div>
      </OverlayTrigger>
    </div>
  );
}
