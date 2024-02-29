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
  const [signedUser, setSignedUser] = React.useState(null);
  const [unSignedUsers, setUnsignedUsers] = React.useState(null);
  const [messageProfile, setMessageProfile] = React.useState(null);

  // const getSignedUser = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   return user;
  // };

  // Fetch Other Users
  // const fetchUsers = async () => {
  //   try {
  //     setLoading(true);
  //     let { data: users, error } = await supabase.from("users").select("*");
  //     if (error) {
  //       console.log("Could not fetch users: ", error.message);
  //     } else {
  //       const usersWithImages = await Promise.all(
  //         users.map(async (user) => {
  //           const { data: image, error: imageError } = await supabase.storage
  //             .from("messenger")
  //             .download(user.profile_image);
  //           if (imageError) {
  //             console.error("Error fetching image:", imageError.message);
  //           } else {
  //             user.profile_image = URL.createObjectURL(image);
  //           }
  //           return user;
  //         })
  //       );

  //       setUsers(usersWithImages);
  //     }
  //   } catch (error) {
  //     console.error("Error in fetchUsers:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const [messageProfile, setMessageProfile] = React.useState(null);
  const toggle = async (sender) => {
    setMessageProfile(sender);
    return sender;
  };

  React.useEffect(() => {
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
      setUsers(usersWithImages);
      const loggedUser = usersWithImages.filter((u) => u.user_id === user.id);
      const otherUsers = usersWithImages.filter((u) => u.user_id !== user.id);
      setSignedUser(loggedUser[0]);
      sessionStorage.setItem('signedUser', JSON.stringify(loggedUser[0]))
      setUnsignedUsers(otherUsers);
      sessionStorage.setItem('unSignedUsers', JSON.stringify(otherUsers))
    };
    authUser();
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
      <div className="message--container">
        <MessageHeader messageProfile={messageProfile} />
        <Message messageProfile={messageProfile} />
      </div>

      <ChatProfile messageProfile={messageProfile} />
    </div>
  );
}
