import supabase from "../Supabase/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import AllCaughtUp from "./AllCaughtUp";
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
  const [allMessages, setAllMessages] = React.useState(null);
  const signedUser = JSON.parse(sessionStorage.getItem("signedUser"));
  const [inputMessage, setInputMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [fetching, setFetching] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    if (props.messageProfile) {
      setMessageProfile(props.messageProfile);
    }
    const fetchMessages = async () => {
      try {
        let { data: messages, error } = await supabase
          .from("messages")
          .select("*")
          .order("id", { ascending: false });
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
          setAllMessages(filteredMessages);
          const copiedAllMessages = [...filteredMessages];
          allMessages && setMessages(copiedAllMessages.splice(0, 15));
          console.log("fileterd Messages ", filteredMessages);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setFetching(false);
      }
    };
    fetchMessages();
    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          console.log("Change received!", payload);
          if (payload.eventType === "INSERT") {
            setMessages((prevData) => [...prevData, payload.new]);
          }
        }
      )
      .subscribe();
    return () => subscription.unsubscribe();
  }, [props.messageProfile, messageProfile, fetching]);

  const handleMessage = (event) => {
    let formMessage = event.target.value;
    setInputMessage(formMessage);
  };

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    if (inputMessage.trim().length > 0) {
      try {
        const { error } = await supabase.from("messages").insert([
          {
            sender_id: signedUser.id,
            receipent_id: messageProfile.id,
            message_text: inputMessage,
          },
        ]);
        if (error) {
          console.log("Message send failed - ", error);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setInputMessage("");
      }
    }
  };

  const fetchMoreMessages = () => {
    console.log("All Messages: ", allMessages);
    console.log("Messages", messages);
    if (messages && allMessages && messages.length < allMessages.length) {
      setTimeout(() => {
        setMessages(
          messages.concat(
            allMessages.slice(messages.length, messages.length + 10)
          )
        );
      }, 2000);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      {messageProfile ? (
        <>
          <div className="message p-3">
            <div className="message-group" id="message-group">
              <InfiniteScroll
                dataLength={messages && messages.length}
                hasMore={hasMore}
                next={fetchMoreMessages}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                inverse={true}
                // loader={<p className="text-center text-secondary">Loading..</p>}
                loader={<Spinner />}
                endMessage={<AllCaughtUp />}
                scrollableTarget="message-group"
              >
                {loading && <Loading />}
                {messages && messages.length < 1 ? (
                  <p className="text-center">Start a new conversation</p>
                ) : (
                  messages &&
                  messages.map((message) => {
                    if (message.sender_id !== signedUser.id) {
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
              </InfiniteScroll>
            </div>
          </div>
          <div className="message--input d-flex align-items-center gap-3 ps-4 pe-4">
            <FontAwesomeIcon icon={faCirclePlus} className="text-primary" />
            <FontAwesomeIcon icon={faImage} className="text-primary" />
            <FontAwesomeIcon icon={faNoteSticky} className="text-primary" />
            <FontAwesomeIcon icon={faFontAwesome} className="text-primary" />
            <form onSubmit={handleMessageSubmit}>
              <div className="input-group p-3">
                <input
                  placeholder="Aa"
                  name="input-message"
                  onChange={handleMessage}
                  value={inputMessage || ""}
                  className=" rounded-start-pill border-0 w-75 form-control"
                />
                <span className="input-group-text border-0 rounded-end-pill">
                  <FontAwesomeIcon
                    icon={faFaceSmile}
                    className="text-primary"
                  />
                </span>
              </div>
            </form>
            <FontAwesomeIcon icon={faThumbsUp} className="text-primary" />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
