import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.spinnerText}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
