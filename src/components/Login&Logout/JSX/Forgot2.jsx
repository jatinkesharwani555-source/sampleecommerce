import React from 'react';
import styles from '../CSS/ForgotPassword.module.css';
import { useState } from 'react';

const Forgot2 = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleChange = (e) => {
    setOldPassword(e.target.value);
    setNewPassword(e.target.value);
  }
  const handleSubmit = (e) => {

  }
  return (
    <>
      <div className={styles['forgotpage-main-cnt']}>
        <div className={styles['forgotpage-container']} style={{ paddingTop: "100px" }}>
          <form className={styles['form-container']} onSubmit={handleSubmit}>
            <label className={styles['label']} htmlFor="userEmail">Old Password </label>
            <input className={styles['email-input']} type="email" placeholder='Please Enter Email' onChange={handleChange} value={oldPassword} />

            <label className={styles['label']} htmlFor="userEmail">New Password: </label>
            <input className={styles['email-input']} type="email" placeholder='Please Enter Email' onChange={handleChange} value={newPassword} />

            {/* {validationError && <p className={styles['validation-error']}>{validationError}</p>} */}
            <button className={styles['button']}>Submit</button>
          </form>
        </div>
      </div>   
    </>
  )
}

export default Forgot2
