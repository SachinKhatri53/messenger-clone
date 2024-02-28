import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faVideo } from "@fortawesome/free-solid-svg-icons";

export default function MessageHeader(props) {
  const [messageProfile, setMessageProfile] = React.useState(null);
  
  React.useEffect(() => {
    const getMessageProfile = async () => {
        setMessageProfile(await props.messageProfile);
      };
    getMessageProfile()
  }, [props.messageProfile])
  return (
    <div className="message--header d-flex justify-content-between p-2">
      <div className="d-flex align-items-center">
        <img
          src={messageProfile && messageProfile.profile_image}
          alt=""
          className="rounded-circle message--header--img me-2"
        />
        <span className="fw-bold">{messageProfile && messageProfile.fullname}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <FontAwesomeIcon icon={faPhone} className="me-4 fs-5 text-primary" />
        <FontAwesomeIcon icon={faVideo} className="me-2 fs-5 text-primary" />
      </div>
    </div>
  );
}
