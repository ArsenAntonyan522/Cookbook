import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={styles.container}>
       <h3 className={styles.welcome}>WELCOME</h3>
       <img src='../../../public/Hedgehog.jpg'></img>
    </div>
  );
}
