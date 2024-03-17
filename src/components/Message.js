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
  const signedUser = JSON.parse(sessionStorage.getItem("signedUser"));
  const [inputMessage, setInputMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [fetching, setFetching] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    if (props.messageProfile) {
      setHasMore(true);
      setMessageProfile(props.messageProfile);
    }
    const fetchMessages = async () => {
      try {
        if (messageProfile) {
          let { data: messages, error } = await supabase
            .from("messages")
            .select("*")
            .or(
              `and(sender_id.eq.${signedUser.id},receipent_id.eq.${messageProfile.id}),and(sender_id.eq.${messageProfile.id},receipent_id.eq.${signedUser.id})`
            )
            .range(0, 14)
            .order("id", { ascending: false });
          if (error) {
            console.log("error its way: ", error.message);
          } else {
            setMessages(messages);
            setFetching(false)
          }
        }
      } catch (err) {
        console.log(err);
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
            setLoading(true)
            setFetching(true);
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

  const fetchMoreMessages = async () => {
    let { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${signedUser.id},receipent_id.eq.${messageProfile.id}),and(sender_id.eq.${messageProfile.id},receipent_id.eq.${signedUser.id})`
      )
      .range(messages.length, messages.length + 9)
      .order("id", { ascending: false });
    if (error) {
      console.log("More Fetch Error", error);
    }
    if (data) {
      const hasMoreMessages = data && data.length === 10;
      if (!hasMoreMessages) {
        setHasMore(false);
      }
      setMessages(messages.concat(data));
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
          <div className="message--input ps-3 pe-3">
            <div className="row">
              <div className="col-2 col-md-3 d-flex gap-1 justify-content-between align-items-center">
                <FontAwesomeIcon icon={faCirclePlus} className="text-primary" />
                <FontAwesomeIcon icon={faImage} className="text-primary" />
                <FontAwesomeIcon icon={faNoteSticky} className="text-primary" />
                <FontAwesomeIcon
                  icon={faFontAwesome}
                  className="text-primary"
                />
              </div>
              <div className="col-7 col-md-8">
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
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faThumbsUp} className="text-primary" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
