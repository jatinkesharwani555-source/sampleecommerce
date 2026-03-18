import React from 'react';
import styles from '../CSS/PaymentPage.module.css';

const PaymentPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.icon}>⚠️</div>

        <h1 className={styles.title}>
          Sorry for the inconvenience
        </h1>

        <p className={styles.message}>
          We apologize for the inconvenience caused.
          Currently, online checkout is not available.
        </p>

        <p className={styles.message}>
          Please visit our offline store to purchase or collect your items.
        </p>

        <div className={styles.buttons}>
          <button
            className={styles.homeBtn}
            onClick={() => window.location.href = "/"}
          >
            Go to Home
          </button>

          <button
            className={styles.storeBtn}
            onClick={() => window.location.href = "/contact"}
          >
            Store Details
          </button>
        </div>

      </div>
    </div>
  )
}

export default PaymentPage
