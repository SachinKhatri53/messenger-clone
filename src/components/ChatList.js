import React, { useRef } from "react";
import supabase from "../Supabase/supabase";
export default function ChatList(props) {
      return (
        <div
          className="d-flex align-items-center p-2 chat--list--group" onClick={() => props.openMessage(props.user)}
        >
          <img src={props.user.profile_image} alt="" className="rounded-circle me-2" />
          <div className="d-flex flex-column">
            <span>{props.user.fullname}</span>
            <span className="text-truncate">
              Malai yaha sanchai cha
            </span>
          </div>
        </div>
      );
    }