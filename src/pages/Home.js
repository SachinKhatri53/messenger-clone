import React from "react";
import supabase from "../Supabase/supabase";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
export default function Home() {
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };


  const navigateToRegister = () => {
    navigate("/Register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) {
        setError(error.message);
      } else {
        handleRedirect(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = async (data) => {
    console.log("handle redirect ", data);
    if (data && await checkUserExists(data.user.id)) {
      navigate("/Chat")
    } else {
      navigate("/UpdateUser");
    }
  };

  const checkUserExists = async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", id);
    console.log("data check user exists: ", id);
    if (error) {
      console.log(error);
      return false;
    }
    console.log(data && data.length > 0)
    return data && data.length > 0;
  };

  return (
    <>
      <div className="home d-flex justify-content-center flex-column align-items-center">
        <img src="../images/logo.png" alt="" />
        <p className="fs-2">Connect with your favorite people.</p>
        <form
          onSubmit={handleLogin}
          className="d-flex align-items-center flex-column"
        >
          <div className="home--form">
            {loading && <Loading />}
            {error && <span className="text-danger text-center">{error}</span>}
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleFormData}
                placeholder="Email or phone number"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleFormData}
                placeholder="Password"
              />
            </div>
            <p className="mb-4 fw-semibold text-end forgot-password">
              Forgotten your password?
            </p>
          </div>
          <button className="btn btn-primary rounded-pill mb-4 w-50">
            Continue
          </button>
        </form>

        <div className="text-secondary">
          <input type="checkbox" className="me-2" />
          <span>Keep me signed in</span>
        </div>
        <div className="d-flex align-items-center mt-2">
          <span className="mt-3">
            <svg height="20" width="200" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0"
                y1="0"
                x2="200"
                y2="0"
                style={{ strokeWidth: 2, stroke: "gray" }}
              />
            </svg>
          </span>

          <span className="p-2">or</span>
          <span className="mt-3">
            <svg height="20" width="200" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0"
                y1="0"
                x2="200"
                y2="0"
                style={{ strokeWidth: 2, stroke: "gray" }}
              />
            </svg>
          </span>
        </div>
        <button className="btn btn-success mb-4" onClick={navigateToRegister}>
          Create new account
        </button>
        <div></div>
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
