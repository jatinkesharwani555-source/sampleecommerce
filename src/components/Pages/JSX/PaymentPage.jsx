import React from 'react';
import styles from '../CSS/PaymentPage.module.css';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  return (
        <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.icon}>⚠️</div>

        <h1 className={styles.title}>
          असुविधा के लिए खेद है
        </h1>

        <p className={styles.message}>
          हमें हुई असुविधा के लिए खेद है।
          फिलहाल ऑनलाइन ऑर्डर/चेकआउट उपलब्ध नहीं है।
        </p>

        <p className={styles.message}>
          कृपया सामान खरीदने या लेने के लिए हमारे ऑफलाइन स्टोर पर विजिट करें।
        </p>

        <div className={styles.buttons}>
          <Link
            to={"/"}
            className={styles.homeBtn}
          >
            होम पेज पर जाएं
          </Link>

          <Link
            to={"/contact-us"}
            className={styles.storeBtn}
          >
            स्टोर की जानकारी
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PaymentPage
