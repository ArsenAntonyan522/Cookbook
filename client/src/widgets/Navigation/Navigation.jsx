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
      <div>

        {user && (
          <div className={styles.container}>
             <div className={styles.headerlogo}><img src="/abc.png" alt="logo" /></div>
          <div className={styles.username}>
            <span className={styles.name} >{user.username}</span>{" "} </div>
            
            <div className={styles.buttons}>
            <button className={styles.bigButton} onClick={signOutHandler}>Выйти</button>{" "}
           

            <Link to="/recipes">
            <button className={styles.bigButton}> Рецепты </button> 
            </Link>

            <Link to="/favs">
            <button className={styles.bigButton}> Избранное </button> 
            </Link>
          </div>
          </div>
        )}

        {!user && (
         <div className={styles.auth}>
         <div className={styles.headerlogo}><img src="/abc.png" alt="logo" /></div>
         
         <div className={styles.buttons}>
           
          
           
            <Link to="/signin">
              <button className={styles.bigButton}> Вход </button> 
            </Link>

            <Link to="/signup">
              <button className={styles.bigButton}> Регистрация </button>
            </Link>

          </div>
          </div>
        )}
      </div>
      <Outlet />
<div className={styles.footer} >
  <div className={styles.contacts}>  <span>Контакты</span>
  <span>Телефон: 432-22-13</span>
  <span>Почта: sobaka@sobaka.ru</span>
  <span>Факс: huyaks</span></div>
  

  
</div>
      
    </div>
  );
}
