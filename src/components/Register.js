import React from "react";
import supabase from "../Supabase/supabase";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Register() {
  const navigate = useNavigate();

  const [error, setError] = React.useState(null);
  const [formData, setFormData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleFormData = (event) => {
    setError(null);
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const checkEmailExists = async (email) => {
    console.log(email);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    if (error) {
      setError(error.message);
      return false;
    }
    console.log("data: ", data)
    return data && data.length > 0;
  };

  const signUpUser = async () => {
    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      setError("Email already exists.");
    } else {
      console.log("emailExists: ", emailExists);
      let { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setError(error.message);
        console.log("Failed handleRegistration", error.message);
      } else {
        console.log("Successful handleRegistration", data);
      }
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        !formData ||
        !formData.email ||
        !formData.email.trim() ||
        !formData.password ||
        !formData.password.trim() ||
        !formData.confirmPassword ||
        !formData.confirmPassword.trim()
      ) {
        setError("Fields cannot be empty");
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
        }
        signUpUser();
        console.log("Looks ok");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <>
      {loading && <Loading />}
      <div className="register d-flex justify-content-center flex-column align-items-center">
        <img src="../images/logo.png" alt="" />
        <p className="fs-2">Connect with your favorite people.</p>
        <form
          className="d-flex align-items-center flex-column"
          onSubmit={handleRegistration}
        >
          <div className="home--form">
            {error && <span className="text-danger text-center">{error}</span>}
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={handleFormData}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleFormData}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Repeat Password"
                onChange={handleFormData}
              />
            </div>
          </div>
          <button className="btn btn-primary rounded-pill mb-4 w-100">
            Register
          </button>
        </form>
        <hr />
        <p>
          Already have an account ?
          <button
            className="border-0 bg-transparent text-primary text-decoration-underline"
            onClick={handleRedirect}
          >
            Login here
          </button>
        </p>
      </div>
      <div className="footer d-flex justify-content-center align-items-center ">
        <ul className="list-inline">
          <li className="list-inline-item me-5">Not on Facebook?</li>
          <li className="list-inline-item me-5">Forgot password</li>
          <li className="list-inline-item me-5">Privacy Policy</li>
          <li className="list-inline-item me-5">Terms</li>
          <li className="list-inline-item me-5">Cookies Policy</li>
          <li className="list-inline-item">&copy; Meta 2024</li>
        </ul>
      </div>
    </>
  );
}
