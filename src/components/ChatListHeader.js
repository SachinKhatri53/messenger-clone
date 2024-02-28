import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function ChatListHeader() {
  return (
    <div className="chat--list-header--container">
      <div className="chat--list--header d-flex justify-content-between align-items-center p-2 ">
        <h4 className="fw-bold ps-4">Chats</h4>
        <div className="rounded-circle p-2 d-flex align-items-center">
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      </div>
      <div className="input-group p-3">
        <span className="input-group-text border-0 rounded-start-pill" id="basic-addon2">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          type="text"
          className="form-control border-0 rounded-end-pill"
          placeholder="Search Messenger"
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
      </div>
    </div>
  );
}
