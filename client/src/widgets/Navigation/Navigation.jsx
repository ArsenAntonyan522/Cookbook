/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Navigation.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "../../shared/ui/Button/Button";
import { message as antMessage } from "antd";
import UserApi from "../../entities/user/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";

export default function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      const { statusCode, error, message } = await UserApi.signOut();
      if (error) {
        antMessage.error(error);
        return;
      }

      antMessage.success(message);
      if (statusCode === 200) {
        setAccessToken("");
        setUser(null);
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <Button text="Main" onClick={() => navigate("/")} />

        {user && (
          <>
            <span>{user.username}</span>{" "}
            <Button text="signOut" onClick={signOutHandler} />{" "}
           

            <Link to="/recipes">
              <Button text="Recipes" />
            </Link>

            <Link to="/favs">
              <Button text="Favourites" />
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/signin">
              <Button text="Signin" />
            </Link>

            <Link to="/signup">
              <Button text="Signup" />
            </Link>

          </>
        )}
      </div>
      <Outlet />

      <h1>FOOTER</h1>
    </div>
  );
}
