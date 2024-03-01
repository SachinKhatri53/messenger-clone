import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export default function RegistraionSuccess() {
  return (
    <div className="registration--success">
      <div className="upper d-flex justify-content-center align-items-center">
        <FontAwesomeIcon className="check--icon" icon={faCircleCheck} />
      </div>
      <div className="lower d-flex flex-column p-5">
        <h1 className="text-center">Thank you for your<br/>registration</h1>
        <p className="text-center mt-5 fs-5">
          To continue enjoying our services and ensuring the security of your
          account, we kindly ask you to <span className="fw-bold">check your email and complete the
          verification process</span>. Please look for an email from us containing
          instructions and a verification link. Click on the link to verify your
          account.
        </p>
      </div>
    </div>
  );
}
