import React, { useState } from "react";
import { ReactComponent as DefaultUser } from "./../../../img/svg/user.svg";
import { ReactComponent as EditIcon } from "./../../../img/svg/edit.svg";
import SavedDeliveryAddress from "./SavedDeliveryAddress";
import axiosInstance from "../../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import AddDeliveryAddress from "./AddDeliveryAddress";
import { API_URL } from "../../../config";

// this is a mess - should do reusable components for the inputs with error handling and more...
function MyProfile({ userInfo, display }) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
  const [error, setError] = useState(undefined);
  const [errorField, setErrorField] = useState(undefined);

  const handleEditIcon = () => {
    if (editMode === true) {
      setEditMode(!editMode);
      setUsername(userInfo.name);
      setEmail(userInfo.email);
      setPhoneNumber(userInfo.phoneNumber);
      setError(undefined);
      setErrorField(undefined);
    } else {
      setEditMode(!editMode);
    }
  };

  const handleUpdateInfo = async () => {
    try {
      const response = await axiosInstance.patch(
        `${API_URL}/api/users/updateMyInfo`,
        {
          name: username,
          email,
          phoneNumber,
        }
      );
      // console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setErrorField(err.response.data.errors[0].field);
      setError(err.response.data.errors[0].message);
    }
  };

  const handleChangeProfilePicture = async (e) => {
    try {
      const file = e.target.files[0]; // Get the selected file
      const formData = new FormData();
      formData.append("photo", file);
      const response = await axiosInstance.patch(
        `${API_URL}/api/users/updateMyInfo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="my-profile__profile"
      style={{ display: `${display !== "profile" ? "none" : ""}` }}
    >
      <div className="my-profile__profile--header mb-4">
        <EditIcon
          className={`my-profile__profile--header-edit-icon ${
            editMode ? "edit-mode-active" : ""
          } `}
          onClick={handleEditIcon}
        />
        <button
          className={`my-profile__profile--header-save-edit ${
            editMode ? "edit-mode-active" : ""
          } `}
          onClick={handleUpdateInfo}
        >
          Save changes
        </button>
        <div
          className={`my-profile__profile--header-error ${
            error !== undefined ? "error-active" : ""
          }`}
        >
          {error}
        </div>
        <p
          className="my-profile__profile--header-change-password"
          onClick={() => navigate("/my-profile/change-password")}
        >
          Change password
        </p>
        {userInfo.photo ? (
          <div className="my-profile__profile--header-photo">
            <img
              src={userInfo.photo}
              alt=""
              className="my-profile__profile--header-photo-photo"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="user-photo-input"
              onChange={handleChangeProfilePicture}
            ></input>
            <span className="my-profile__profile--header-photo-change">
              Change picture
            </span>
          </div>
        ) : (
          <div className="my-profile__profile--header-photo">
            <DefaultUser className="my-profile__profile--header-photo-photo" />
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="user-photo-input"
              onChange={handleChangeProfilePicture}
            ></input>
            <span className="my-profile__profile--header-photo-change">
              Change picture
            </span>
          </div>
        )}

        <div className="my-profile__profile--header-username">
          {editMode ? (
            <>
              <label htmlFor="username" className="mr-1">
                Name:{" "}
              </label>
              <input
                className={`${errorField === "name" ? "error-input" : ""}`}
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  if (errorField === "name") {
                    setError(undefined);
                    setErrorField(undefined);
                  }
                  setUsername(e.target.value);
                }}
              ></input>
            </>
          ) : (
            <>{userInfo.name}</>
          )}
        </div>
      </div>

      <div className="dividing-line mb-4"></div>

      <div className="my-profile__profile--body">
        <div className="my-profile__profile--body-info">
          {editMode ? (
            <div>
              <label htmlFor="email" className="mr-1">
                <strong>Email address:</strong>{" "}
              </label>
              <input
                className={`${errorField === "email" ? "error-input" : ""}`}
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  if (errorField === "email") {
                    setError(undefined);
                    setErrorField(undefined);
                  }
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
          ) : (
            <p>
              <strong>Email address: </strong> {userInfo.email}
            </p>
          )}

          {editMode ? (
            <div>
              <label htmlFor="phone-number" className="mr-1">
                <strong>Phone number:</strong>{" "}
              </label>
              <input
                className={`${
                  errorField === "phoneNumber" ? "error-input" : ""
                }`}
                type="number"
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => {
                  if (errorField === "phoneNumber") {
                    setError(undefined);
                    setErrorField(undefined);
                  }
                  setPhoneNumber(e.target.value);
                }}
              ></input>
            </div>
          ) : (
            <div>
              <strong>Phone number: </strong>
              {userInfo.phoneNumber ? (
                <>{userInfo.phoneNumber}</>
              ) : (
                <div style={{ display: "inline" }}>Add phone number</div>
              )}
            </div>
          )}
        </div>

        <h2 className="mb-4 my-profile__profile--body-title">
          Delivery addresses:
        </h2>

        <div className="my-profile__profile--body-addresses">
          {userInfo.savedAddresses?.length > 0 ? (
            <>
              {userInfo.savedAddresses.map((address) => {
                return (
                  <SavedDeliveryAddress address={address} key={address._id} />
                );
              })}
            </>
          ) : (
            <h3>No saved delivery addresses yet</h3>
          )}

          {userInfo.savedAddresses === undefined ||
          userInfo.savedAddresses.length < 3 ? (
            <AddDeliveryAddress setError={setError} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
