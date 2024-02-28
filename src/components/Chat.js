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
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState(null);

  const getSignedUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  // Fetch Other Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      let { data: users, error } = await supabase.from("users").select("*");
      if (error) {
        console.log("Could not fetch users: ", error.message);
      } else {
        const usersWithImages = await Promise.all(
          users.map(async (user) => {
            const { data: image, error: imageError } = await supabase.storage
              .from("messenger")
              .download(user.profile_image);
            if (imageError) {
              console.error("Error fetching image:", imageError.message);
            } else {
              user.profile_image = URL.createObjectURL(image);
            }
            return user;
          })
        );

        setUsers(usersWithImages);
        console.log("Users with Images: ", usersWithImages);
      }
    } catch (error) {
      console.error("Error in fetchUsers:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const [messageProfile, setMessageProfile] = React.useState(null);
  const toggle = async(sender) => {
    console.log("Toggle Id: ", await sender)
    setMessageProfile(sender);
    return sender
  }
  
 
  const unSignedUsers =
    users && users.filter((user) => user.user_id !== getSignedUser().id);
  
  const signedUser = users && users.filter((user) => user.user_id === getSignedUser().id)

  const chatListComponents =
    unSignedUsers &&
    unSignedUsers.map((item) => {
      return <ChatList key={item.id} user={item} id={item.user_id} openMessage={toggle}/>;
    });

    

  React.useEffect(() => {
    fetchUsers();
  }, []);
  console.log("--------------------USingned Users:", unSignedUsers);
  return (
    <div className="d-flex chat">
      {loading && <Loading />}
      <Sidebar user={signedUser} />
      <div className="chat--list--container">
        <ChatListHeader />
        <div className="chat--list">
          {chatListComponents}
        </div>
      </div>
      <div className="message--container">
        <MessageHeader messageProfile={messageProfile}  />
        <Message messageProfile={messageProfile} />
      </div>

      <ChatProfile messageProfile={messageProfile} />
    </div>
  );
}
