import React from 'react';
import styles from '../CSS/PaymentPage.module.css';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.icon}>⚠️</div>

        <h1 className={styles.title}>
          Sorry for the inconvenience
        </h1>

        <p className={styles.message}>
          Humein aapko hui inconvenience ke liye sincerely maafi chahte hain.
        </p>

        <p className={styles.message}>
          Abhi ke liye online checkout available nahi hai, lekin aapka pasandida saman hamare store par uplabdh hai 😊
        </p>

        <p className={styles.highlight}>
          👉 Aap directly hamare offline store visit karke apna order le sakte hain.
        </p>

        <p className={styles.subText}>
          Hamari team aapki madad ke liye hamesha ready hai 🙏
        </p>

        <div className={styles.buttons}>
          <Link to={"/"} className={styles.homeBtn}>
            Go to Home
          </Link>

          <Link to={"/contact-us"} className={styles.storeBtn}>
            Visit Store
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PaymentPage;