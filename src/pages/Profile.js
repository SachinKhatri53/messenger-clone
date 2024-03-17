import React from "react";
import supabase from "../Supabase/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faPhone,
  faVenusMars,
  faCakeCandles,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = React.useState(null);
  const [disableInputField, setDisableInputField] = React.useState(true);
  const [inputFocus, setInputFocus] = React.useState(false)
  const navigate = useNavigate();
  const handleRedirect = (endpoint) => {
    navigate(endpoint);
  };

  React.useEffect(() => {
    // if(!sessionStorage.getItem("signedUser")){
    //   navigate("/")
    // }
    setUser(JSON.parse(sessionStorage.getItem("signedUser")));
    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        (payload) => {
          console.log("Change received!", payload);
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            setUser(payload.new);
          }
        }
      )
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);

  const togglePhoneInput = () => {
    setDisableInputField((prev) => !prev);
    setInputFocus(prev => !prev)
  };

  const handlePhoneInput = (event) =>{
    const{name, value} = event.target
    setUser(prevInfo => {
      return{...prevInfo, [name]:value}
    })
  }
  const handlePhoneSubmit = (event) => {
    event.preventDefault()

  }
  const inputStyles = disableInputField
    ? { backgroundColor: "transparent", borderColor:'transparent' }
    : {
        backgroundColor: "#e6e5e5",
        borderStyle: "solid",
        borderColor: "gray",
      };
  return (
    <div className="profile--container">
      <div className="home--icon">
        <FontAwesomeIcon
          icon={faHouse}
          className="fs-4 icon rounded-circle"
          onClick={() => handleRedirect("/Chat")}
        />
      </div>

      <div className="profile--image text-center">
        <img
          src={user && user.profile_image}
          alt=""
          className="rounded-circle"
        />
        <h2 className="text-center mt-4 mb-2">{user && user.fullname}</h2>
        <div className="profile--social--media d-flex gap-3 justify-content-center fs-5">
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faLinkedin} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>

        <hr className="mt-5" />
      </div>

      <div className="profile--information">
        <ul className="list-group">
          <li className="list-group-item p-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="ms-2 fw-bold">Email: </span>
            {user && user.email}
          </li>
          <form onSubmit={handlePhoneSubmit}>
          <li className="list-group-item p-2">
         
            <FontAwesomeIcon icon={faPhone} />
            {/* <span className="ms-2 fw-bold">Phone: </span>{user &&  user.phone ? user.phone : <span className='fst-italic'>unavailable</span> */}
            <span className="ms-2 fw-bold">Phone: </span>
            
            <input
              // value={user && user.phone ? user.phone : "unavailable"}
              value={user && user.phone ? user.phone : 'unavailable'}
              style={inputStyles}
              disabled={disableInputField}
              onChange={handlePhoneInput}
              name="phone"
            />
          

            <FontAwesomeIcon
              icon={faPenToSquare}
              className="edit--phone text-danger-emphasis position-absolute end-0 pe-3"
              onClick={togglePhoneInput}
            />
              
          </li>
          </form>
          <li className="list-group-item p-2">
            <FontAwesomeIcon icon={faVenusMars} />
            <span className="ms-2 fw-bold">Gender: </span>
            {user && user.gender ? (
              user.gender
            ) : (
              <span className="fst-italic">unavailable</span>
            )}
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-danger-emphasis position-absolute end-0 pe-3"
            />
          </li>
          <li className="list-group-item p-2">
            <FontAwesomeIcon icon={faCakeCandles} />
            <span className="ms-2 fw-bold">Date of Birth: </span>
            {user && user.date_of_birth ? (
              user.date_of_birth
            ) : (
              <span className="fst-italic">unavailable</span>
            )}
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-danger-emphasis position-absolute end-0 pe-3"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
