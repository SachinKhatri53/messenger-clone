import React from "react";
import supabase from "../Supabase/supabase";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function UpdateUser() {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [fullName, setFullName] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [photoError, setPhotoError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    getSignedUser();
  }, []);

  const getSignedUser = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
    return user;
  };

  const userExists = async () => {
    try {
      let { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id);
      if (data.length > 0) {
        return true;
      } else {
        console.log(error);
        return false;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const updateUser = async (name, file) => {
    try {
      const jsDate = new Date();
      const isoDateString = jsDate.toISOString();
      const fileName = `avatar_${Date.now()}${getFileExtension(file.name)}`;

      // Await the result of userExists
      const userExist = await userExists();

      if (!userExist) {
        // Case: User does not exist, create new user
        const { data, error } = await supabase.from("users").insert([
          {
            user_id: user.id,
            profile_image: fileName,
            updated_at: isoDateString,
          },
        ]);

        if (error) {
          setError(error.message);
          return; // Exit the function if the insert fails
        }
      }

      // Common logic for both cases: Upload file, update display name, update profile image
      const { data: storageData, error: storageError } = await supabase.storage
        .from("messenger")
        .upload(fileName, file);

      if (storageError) {
        setError(storageError.message);
        return; // Exit the function if the storage upload fails
      }

      const { res, err } = await supabase.auth.updateUser({
        data: {
          display_name: name,
        },
      });

      if (err) {
        setError(err.message);
        return; // Exit the function if the display name update fails
      }

      const { data: profileImageUpdateData, error: profileImageUpdateError } =
        await supabase
          .from("users")
          .update({ profile_image: fileName })
          .eq("user_id", user.id);

      if (profileImageUpdateError) {
        setError(profileImageUpdateError.message);
        return; // Exit the function if the profile image update fails
      }
      navigate("/Chat")
      setSuccessMessage("Profile Updated");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  //Fetch Extension
  const getFileExtension = (filename) => {
    const extensionMatch = /\.[0-9a-z]+$/i.exec(filename);
    return extensionMatch ? extensionMatch[0].toLowerCase() : null;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!fullName || !fullName.trim()) {
        setError("Enter you fullname");
      }
      if (!photo) {
        setPhotoError("Select a photo");
      } else {
        updateUser(fullName, photo);
        // navigate("/Chat");
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFullName = (event) => {
    setError(null);
    setFullName(event.target.value);
  };

  const handlePhoto = (event) => {
    setPhotoError(null);
    const file = event.target.files[0];
    setPhoto(file);
  };
  return (
    <>
      {loading && <Loading />}
      <div>Update User: {user && user.email}</div>
      <div className="update--user d-flex justify-content-center flex-column align-items-center">
        <div className="update--user--inner  d-flex justify-content-center flex-column align-items-center">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="update--logo rounded-circle mb-4"
          />
          <p>Complete you profile</p>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group mb-4 mt-4">
              {error && (
                <span className="text-danger text-center">{error}</span>
              )}
              {successMessage && (
                <span className="text-success text-center">
                  {successMessage}
                </span>
              )}
              <input
                placeholder="Full name"
                name="fullName"
                onChange={handleFullName}
                className="form-control"
              />
            </div>
            <div className="form-group mb-4">
              {photoError && (
                <span className="text-danger text-center">{photoError}</span>
              )}
              <input
                type="file"
                className="form-control"
                name="file"
                onChange={handlePhoto}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-sm w-100">
                Update Profile
              </button>
            </div>
          </form>
        </div>
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
