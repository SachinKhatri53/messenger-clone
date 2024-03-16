import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
export default function People() {
  return (
    <div className="people p-2">
      <h4 className="fw-bold">People</h4>
      <small className="text-secondary mb-4">Active contacts (1)</small>
      <div className="people--list">
        <div className="people--item d-flex align-items-center p-2">
          <div className="people--image position-relative">
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt=""
              className="rounded-circle"
            />
            <span className="active--icon">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-success rounded-circle"
              />
            </span>
          </div>
          <span className="ms-2">Nawbeen Bhandari</span>
        </div>
        
        <div className="people--item d-flex align-items-center p-2">
          <div className="people--image position-relative">
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt=""
              className="rounded-circle"
            />
            <span className="active--icon">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-success rounded-circle"
              />
            </span>
          </div>
          <span className="ms-2">Nawbeen Bhandari</span>
        </div>

      </div>
    </div>
  );
}
