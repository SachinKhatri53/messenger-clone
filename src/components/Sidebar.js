import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUserGroup, faStore, faCommentDots, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import supabase from "../Supabase/supabase";



export default function Sidebar (props) {
  const [user, setUser] = React.useState(null)
  const [imageURL, setImageURL] = React.useState(null)
  const fetchUser = async () => {
    setUser(await props.user)
  }
  const fetchImage = async () => {
    try {
      const userImage = await props.user.userData.profile_image
      const { data, error } = await supabase.storage
        .from('messenger')
        .download(userImage);
      if (error) {
        console.error('Error fetching image:', error.message);
      } else {
        setImageURL(URL.createObjectURL(data));
      }
    } catch (err) {
      console.log("Inside catch", imageURL)
      console.error('Error fetching image:', err.message);
    }
  };
 
  React.useEffect(() => {
    
    fetchData();
    
  }, [props.user])
  const fetchData = async () => {
    await fetchUser();
    await fetchImage();
  };

  const profileImage = (user && user.userData && user.userData.profile_image) ? (imageURL) : ''
  console.log(imageURL)
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
          <img src={profileImage} alt="" className="rounded-circle" />
        </div>
      </OverlayTrigger>
    </div>
  );
}
