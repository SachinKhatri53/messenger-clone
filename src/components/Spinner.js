import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
export default function Spinner() {
  return (
    <div className="spinner">
      <FontAwesomeIcon icon={faSpinner} className="faSpinner" />
    </div>
  );
}
