import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
export default function AllCaughtUp(){
    return(
        <div className="all-caught-up">
            <FontAwesomeIcon icon={faCircleCheck} className="faCircleCheck" />
            <small>You're all caught up !</small>
        </div>
    )
}