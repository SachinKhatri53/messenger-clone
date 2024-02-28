import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
export default function Loading(){
    return(
        <div className="loading">
            <div className="loading--box">
            <FontAwesomeIcon icon={faSpinner} className="loading--icon" />
            </div>
        </div>
    
    )
}