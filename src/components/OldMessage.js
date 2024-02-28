import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faImage,
  faNoteSticky,
  faFontAwesome,
  faThumbsUp,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

export default function Message() {
  return (
    <>
      <div className="message p-3">
        <div className="message-group">
          <p className="text-center message-date">Jan 28, 2024, 1:18 PM</p>
          <div className="message-group-sender d-flex align-items-end">
            <div className="">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt=""
                className="message-sender-img rounded-circle"
              />
            </div>
            <div className="message-group-sender-text">
              <p>okay wait hai ta</p>
              <p>
                maile tmro ma
                <br />
                32500 rakhdeko xu aayeo hola herra ta
              </p>
            </div>
          </div>
          <div className="message-group-receiver d-flex justify-content-end">
            <p>
              vaneko vaneko kura use garnu parni ki aru use gareni huni sodha
            </p>
          </div>

          <div className="message-group-sender d-flex align-items-end">
            <div className="">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt=""
                className="message-sender-img rounded-circle"
              />
            </div>
            <div className="message-group-sender-text">
              <p>Voli bujera vanamla saathi timlai</p>
            </div>
          </div>

          <div className="message-group-receiver d-flex justify-content-end">
            <p>Jhan yeso ek dui game khelum saathi sanga vaneko ta</p>
          </div>

          <p className="text-center message-date">Jan 28, 2024, 1:18 PM</p>

          <div className="message-group-sender d-flex align-items-end">
            <div className="">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt=""
                className="message-sender-img rounded-circle"
              />
            </div>
            <div className="message-group-sender-text">
              <p>Voli bujera vanamla saathi timlai</p>
            </div>
          </div>

          <div className="message-group-receiver d-flex flex-column align-items-end">
            <p>ok</p>
            <img src="https://images.unsplash.com/photo-1706126199160-1b3867dbf587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  alt="" />
          </div>

          <div className="message-group-sender d-flex align-items-end">
            <div className="">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt=""
                className="message-sender-img rounded-circle"
              />
            </div>
            <div className="message-group-sender-text">
              <p>okay wait hai ta</p>
              <p>
                maile tmro ma
                <br />
                32500 rakhdeko xu aayeo hola herra ta
                <br />
                maile tmro ma
              </p>
              <p>okay wait hai ta</p>
            </div>
          </div>


          <div className="message-group-receiver d-flex justify-content-end">
            <FontAwesomeIcon icon={faThumbsUp} className="text-primary fs-2" />
          </div>


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
  );
}
