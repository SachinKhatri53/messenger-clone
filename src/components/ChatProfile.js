import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../Supabase/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faMagnifyingGlass,
  faThumbtack,
  faCircleDot,
  faThumbsUp,
  faA,
  faImages,
  faFileLines,
  faLink,
  faTriangleExclamation,
  faBellSlash,
  faHand,
  faBan,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function ChatProfile(props) {
  const [messageProfile, setMessageProfile] = React.useState(null);
  
  React.useEffect(() => {
    const getMessageProfile = async () => {
      setMessageProfile(await props.messageProfile);
    };
    getMessageProfile()
  }, [props.messageProfile])

  




  const [isChatInfoCollapsed, setChatInfoCollapsed] = React.useState(true);
  const [isCustomizeChatCollapsed, setCustomizeChatCollapsed] =
    React.useState(true);
  const [isMediaCollapsed, setMediaCollapsed] = React.useState(true);
  const [isPrivacyCollapsed, setPrivacyCollapsed] = React.useState(true);
  function handleChatInfoToggle() {
    setChatInfoCollapsed(!isChatInfoCollapsed);
  }
  function handleCustomizeChatToggle() {
    setCustomizeChatCollapsed(!isCustomizeChatCollapsed);
  }
  function handleMediaToggle() {
    setMediaCollapsed(!isMediaCollapsed);
  }
  function handlePrivacyToggle() {
    setPrivacyCollapsed(!isPrivacyCollapsed);
  }
  return (
    <div className="chat--profile">
      {messageProfile ? (
        <>
      <div className="text-center d-flex flex-column align-items-center">
        <img src={messageProfile && messageProfile.profile_image} alt="" className="rounded-circle" />
        <span className="fw-bold mt-2">
          {messageProfile && messageProfile.fullname}
        </span>
        <div className="chat--profile--icon d-flex p-4 justify-content-evenly w-100">
          <div className="chat--profile--icon--profile d-flex flex-column align-items-center">
            <div className="chat--profile--icon--profile-icon rounded-circle p-2 d-flex">
              <FontAwesomeIcon icon={faFacebook} className="fs-5" />
            </div>
            <div className="chat--profile--icon--profile-text">
              <small>Profile</small>
            </div>
          </div>
          <div className="chat--profile--icon--bell d-flex flex-column align-items-center">
            <div className="chat--profile--icon--bell-icon rounded-circle p-2 d-flex">
              <FontAwesomeIcon icon={faBell} className="fs-5" />
            </div>
            <div className="chat--profile--icon--bell-text">
              <small>Mute</small>
            </div>
          </div>
          <div className="chat--profile--icon--search d-flex flex-column align-items-center">
            <div className="chat--profile--icon--search-icon rounded-circle p-2 d-flex">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-5" />
            </div>
            <div className="chat--profile--icon--search-text">
              <small>Search</small>
            </div>
          </div>
        </div>
      </div>

      <div className="chat--profile--list p-2">
        <div className="chat--profile--list--info w-100">
          <div
            className="chat--profile--list--info--title p-2 rounded-1 d-flex justify-content-between"
            data-bs-toggle="collapse"
            data-bs-target="#collapseChatInfo"
            aria-expanded={!isChatInfoCollapsed}
            onClick={handleChatInfoToggle}
            aria-controls="collapseChatInfo"
          >
            <small>Chat info</small>
            <FontAwesomeIcon
              icon={isChatInfoCollapsed ? faChevronRight : faChevronDown}
            />
          </div>
          <div className="collapse" id="collapseChatInfo">
            <div className="chat--profile--list--info--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faThumbtack}
                className="rounded-circle p-2"
              />
              <small className="ms-2">View Pinned Messages</small>
            </div>
          </div>
        </div>

        <div className="chat--profile--list--customize--chat">
          <div
            className="chat--profile--list--customize--chat--title p-2 rounded-1 d-flex justify-content-between"
            data-bs-toggle="collapse"
            data-bs-target="#collapseCustomizeChat"
            aria-expanded={!isCustomizeChatCollapsed}
            onClick={handleCustomizeChatToggle}
            aria-controls="collapseCustomizeChat"
          >
            <small>Customize chat</small>
            <FontAwesomeIcon
              icon={isCustomizeChatCollapsed ? faChevronRight : faChevronDown}
            />
          </div>
          <div className="collapse" id="collapseCustomizeChat">
            <div className="chat--profile--list--customize--chat--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faCircleDot}
                className="rounded-circle p-2 text-primary"
              />
              <small className="ms-2">Change theme</small>
            </div>

            <div className="chat--profile--list--customize--chat--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="rounded-circle p-2 text-primary"
              />
              <small className="ms-2">Change emoji</small>
            </div>

            <div className="chat--profile--list--customize--chat--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon icon={faA} className="rounded-circle p-2" />
              <small className="ms-2">Edit nicknames</small>
            </div>
          </div>
        </div>

        <div className="chat--profile--list--media">
          <div
            className="chat--profile--list--media--title p-2 rounded-1 d-flex justify-content-between"
            data-bs-toggle="collapse"
            data-bs-target="#collapseMedia"
            aria-expanded={!isMediaCollapsed}
            onClick={handleMediaToggle}
            aria-controls="collapseMedia"
          >
            <small>Media, files and links</small>
            <FontAwesomeIcon
              icon={isMediaCollapsed ? faChevronRight : faChevronDown}
            />
          </div>
          <div className="collapse" id="collapseMedia">
            <div className="chat--profile--list--media--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon icon={faImages} className="rounded-circle p-2" />
              <small className="ms-2">Media</small>
            </div>
            <div className="chat--profile--list--media--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faFileLines}
                className="rounded-circle p-2"
              />
              <small className="ms-2">Files</small>
            </div>
            <div className="chat--profile--list--media--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon icon={faLink} className="rounded-circle p-2" />
              <small className="ms-2">Links</small>
            </div>
          </div>
        </div>

        <div className="chat--profile--list--privacy">
          <div
            className="chat--profile--list--privacy--title p-2 rounded-1 d-flex justify-content-between"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePrivacy"
            aria-expanded={!isPrivacyCollapsed}
            onClick={handlePrivacyToggle}
            aria-controls="collapsePrivacy"
          >
            <small>Privacy & support</small>
            <FontAwesomeIcon
              icon={isPrivacyCollapsed ? faChevronRight : faChevronDown}
            />
          </div>
          <div className="collapse" id="collapsePrivacy">
            <div className="chat--profile--list--privacy--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faBellSlash}
                className="rounded-circle p-2"
              />
              <small className="ms-2">Mute notifications</small>
            </div>
            <div className="chat--profile--list--privacy--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon icon={faHand} className="rounded-circle p-2" />
              <small className="ms-2">Restrict</small>
            </div>
            <div className="chat--profile--list--privacy--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon icon={faBan} className="rounded-circle p-2" />
              <small className="ms-2">Block</small>
            </div>
            <div className="chat--profile--list--privacy--body p-2 rounded-1 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="rounded-circle p-2"
              />
              <small className="ms-2">Report</small>
            </div>
          </div>
        </div>
        
      </div>
      </>
      ) : (
        <></>
      )}
    </div>
  );
}
