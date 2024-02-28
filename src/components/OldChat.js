import supabase from "../Supabase/supabase";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatList from "./ChatList";

import ChatProfile from "./ChatProfile";
import ChatListHeader from "./ChatListHeader";
import Message from "./Message";
import MessageHeader from "./MessageHeader";
import Loading from "./Loading";
import React from "react";

export default function Chat() {
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const getSignedUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  const fetchSignedUserData = async () => {
    setLoading(true);
    let id = (await getSignedUser()).id
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", id);
    if (error) {
      console.error("Error fetching user data:", error.message);
    } else {
      setUserData({userProfile: await getSignedUser(),
        userData: data[0]});
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSignedUserData();
  }, []);

  
  return (
    <div className="d-flex chat">
      {loading && <Loading />}
      <Sidebar user={userData} />
      <div className="chat--list--container">
        <ChatListHeader />
        <div className="chat--list">
        <ChatList user={userData} />
        </div>
        {/* <ChatList user={userData} /> */}
      </div>
      <div className="message--container">
        <MessageHeader />
        <Message />
      </div>

      <ChatProfile user={userData} />
      
    </div>
  );
}
