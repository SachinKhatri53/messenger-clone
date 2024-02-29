import supabase from "../Supabase/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faCirclePlus,
  faImage,
  faNoteSticky,
  faFontAwesome,
  faThumbsUp,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

export default function Message(props) {
  const [messageProfile, setMessageProfile] = React.useState(null);
  const [messages, setMessages] = React.useState(null);
  const signedUser = JSON.parse(sessionStorage.getItem("signedUser"));
  React.useEffect(() => {
    if (props.messageProfile) {
      setMessageProfile(props.messageProfile);
    }
    const fetchMessages = async () => {
      try {
        let { data: messages, error } = await supabase
          .from("messages")
          .select("*");
        if (error) {
          console.log("error its way: ", error.message);
        } else {
          const filteredMessages = messages.filter((msg) => {
            const { id: signedUserId } = signedUser;
            const { id: messageProfileId } = messageProfile || {};
            return (
              messageProfile &&
              ((msg.sender_id === signedUserId &&
                msg.receipent_id === messageProfileId) ||
                (msg.sender_id === messageProfileId &&
                  msg.receipent_id === signedUserId))
            );
          });
          setMessages(filteredMessages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [props.messageProfile]);

  return (
    <>
      {messageProfile ? (
        <>
          <div className="message p-3">
            <div className="message-group">
              {messages && messages.length < 1 ? (
                <p className="text-center">Start a new conversation</p>
              ) : (
                messages && messages.map((message) => {
                  if (message.sender_id === signedUser.id) {
                    return (
                      <div
                        key={message.id}
                        className="message-group-sender d-flex align-items-end"
                      >
                        <div className="message-group-sender-text">
                          <p>{message.message_text}</p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={message.id}
                        className="message-group-receiver d-flex justify-content-end"
                      >
                        <p>{message.message_text}</p>
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
          <div className="message--input d-flex align-items-center gap-3 ps-4 pe-4">
            <FontAwesomeIcon icon={faCirclePlus} className="text-primary" />
            <FontAwesomeIcon icon={faImage} className="text-primary" />
            <FontAwesomeIcon icon={faNoteSticky} className="text-primary" />
            <FontAwesomeIcon icon={faFontAwesome} className="text-primary" />
            <div className="input-group p-3">
              <input
                placeholder="Aa"
                className=" rounded-start-pill border-0 w-75 form-control"
              />
              <span className="input-group-text border-0 rounded-end-pill">
                <FontAwesomeIcon icon={faFaceSmile} className="text-primary" />
              </span>
            </div>
            <FontAwesomeIcon icon={faThumbsUp} className="text-primary" />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
