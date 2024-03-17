import supabase from "../Supabase/supabase";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";

import ChatProfile from "../components/ChatProfile";
import ChatListHeader from "../components/ChatListHeader";
import Message from "../components/Message";
import MessageHeader from "../components/MessageHeader";
import Loading from "../components/Loading";
import React from "react";

export default function Chat() {
  const [loading, setLoading] = React.useState(true);
  // const [users, setUsers] = React.useState(null);
  const [signedUser, setSignedUser] = React.useState(null);
  const [unSignedUsers, setUnsignedUsers] = React.useState(null);
  const [messageProfile, setMessageProfile] = React.useState(null);

  const toggle = async (sender) => {
    setMessageProfile(sender);
    return sender;
  };

  React.useEffect(() => {
      try {
        const authUser = async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          const { data: allUsers, error: allUsersError } = await supabase
            .from("users")
            .select("*");
          if (allUsersError) {
            throw allUsersError;
          }
          const usersWithImages = await Promise.all(
            allUsers.map(async (user) => {
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
          if(!allUsersError){
            setLoading(false)
          }
          // setUsers(usersWithImages);
          const loggedUser = usersWithImages.filter((u) => u.user_id === user.id);
          const otherUsers = usersWithImages.filter((u) => u.user_id !== user.id);
          setSignedUser(loggedUser[0]);
          sessionStorage.setItem("signedUser", JSON.stringify(loggedUser[0]));
          setUnsignedUsers(otherUsers);
          sessionStorage.setItem("unSignedUsers", JSON.stringify(otherUsers));
        };
        authUser();
      } catch (error) {
        throw error;
      }
  }, []);

  const chatListComponents =
    unSignedUsers &&
    unSignedUsers.map((item) => {
      return (
        <ChatList
          key={item.id}
          user={item}
          id={item.user_id}
          openMessage={toggle}
        />
      );
    });

  return (
    <div className="d-flex chat">
      {loading && <Loading />}
      <Sidebar user={signedUser} />
      <div className="chat--list--container">
        <ChatListHeader />
        <div className="chat--list">{chatListComponents}</div>
      </div>
      {
        messageProfile && <>
        <div className="message--container">
        <MessageHeader messageProfile={messageProfile} />
        <Message messageProfile={messageProfile} />
      </div></>
      }
      
      <ChatProfile messageProfile={messageProfile} />
    </div>
  );
}
