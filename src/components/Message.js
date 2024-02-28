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

  React.useEffect(() => {
    const getMessageProfile = async () => {
      setMessageProfile(await props.messageProfile);
    };
    const getMessages = async () => {
      let{ data: messages, error } = await supabase
      .from('messages')
      .select('*')
      if(error){
        console.log("Error coming:------", error)
      }
      setMessages(messages)
    }
    getMessageProfile();
    getMessages();
  }, [props.messageProfile]);

  return (
    <>
      <div className="message p-3">
        {messages && messages.map(message => {
          return(<p>{message.message_text}</p>)
        })}
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
  );
}
