/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Navigation.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { message as antMessage, Button } from "antd";
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
      <div>
        {user && (
          <div className={styles.container}>
            <div className={styles.headerlogo}>
              <img src="/abc.png" alt="logo" />
            </div>
            <div className={styles.username}>
              <span className={styles.name}>Bon appétit,  {user.username}</span>{""}
            </div>
            <div className={styles.buttons}>
              <Link to="/">
                <button className={styles.bigButton}> Main </button>
              </Link>
              <button className={styles.bigButton} onClick={signOutHandler}>
                Sign out
              </button>{" "}
              <Link to="/recipes">
                <button className={styles.bigButton}> Recipes </button>
              </Link>
              <Link to="/fav">
                <button className={styles.bigButton}> Favourites </button>
              </Link>
            </div>
          </div>
        )}

        {!user && (
          <div className={styles.auth}>
            <div className={styles.headerlogo}>
              <img src="/abc.png" alt="logo" />
            </div>

            <div className={styles.buttons}>
              <Link to="/signin">
                <button className={styles.bigButton}> Login </button>
              </Link>

              <Link to="/signup">
                <button className={styles.bigButton}> Registration </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Outlet />
      
      <div className={styles.footer}>
        <div className={styles.contacts}>
          {" "}
          <span>Контакты</span>
          <span>Телефон: 432-22-13</span>
          <span>Почта: sobaka@sobaka.ru</span>
          <span>Факс: huyaks</span>
        </div>
      </div>
    </div>
  );
}
