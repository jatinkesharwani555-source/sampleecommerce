import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../CSS/ForgotPassword.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [emailFromForm, setEmailFromForm] = useState("");
  const [error, setError] = useState({});
  const [validationError, setValidationError] = useState({});
  const [successfullyFetch, setSuccessfullyFetch] = useState(false);
  // FORGOT PASSWORD 2
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  const navigate = useNavigate();
  // HandleChange Functions 
  const handleChangeEmail = (e) => {
    setEmailFromForm(e.target.value);
  }
  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  }
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const validate1 = () => {
    const userEmail = emailFromForm;
    if (!userEmail.trim()) {
      setValidationError({ userEmail: "Email Is Required" });
      return false;
    }
    setValidationError({});
    return true;
  }

  const validate2 = () => {
    if (!oldPassword.trim()) {
      setValidationError({ oldPassword: "Old Password Is Required" });
      return false;
    }
    if (!newPassword.trim()) {
      setValidationError({ newPassword: "New Password Is Required" });
      return false;
    } else if (newPassword.length < 8) {
      setValidationError({ newPassword: "New Password Must Be Atleast 8 Characters" });
      return false;
    }
    setValidationError({});
    return true;
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (!validate1()) return;
    setError({});
    try {
      const response = await axios.post("https://sampleecommercebackend-2.onrender.com/api/forgot-password", {
        email: emailFromForm
      });

      if (!response.data.success) {
        setError({ errorMessage: response.data.message });
        setSuccessfullyFetch(false);
        return;
      }
      setSuccessfullyFetch(true);
    } catch (err) {
      setError({ errorMessage: err.response?.data?.message || "Something Went Wrong" });
      setSuccessfullyFetch(false);
    }
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setError({});
    if (!validate2()) return;
    try {
      const response = await axios.post("https://sampleecommercebackend-2.onrender.com/api/change-password-without-login", {
        email: emailFromForm,
        oldPassword: oldPassword,
        newPassword: newPassword
      },
        { withCredentials: true }
      );

      if (!response.data.success) {
        setError({ errorMessage: response.data.message });
        return;
      }
      navigate("/login");
    } catch (err) {
      setError({ errorMessage: err.response?.data?.message || "Something Went Wrong" });
    }
  }

  return (
    <>
      <div className={styles['forgotpage-main-cnt']}>
        {!successfullyFetch &&
          <div className={styles['forgotpage-container']}>
            {error.errorMessage && <p className={styles['error-message']}>{error.errorMessage}</p>}
            <h1 className={styles['enter-email-quote']}>Please Enter Email</h1>
            <form className={styles['form-container']} onSubmit={handleSubmit1}>
              <label className={styles['label']} htmlFor="userEmail">Email: </label>
              <input className={styles['input']} type="email" placeholder='Please Enter Email' onChange={handleChangeEmail} value={emailFromForm} />
              {validationError.userEmail && <p className={styles['validation-error']}>{validationError.userEmail}</p>}
              <button className={styles['button']}>Submit</button>
            </form>
          </div>
        }
        {successfullyFetch &&
          <div className={styles['forgotpage-container']} style={{ paddingTop: "100px" }}>
            {error.errorMessage && <p className={styles['error-message']}>{error.errorMessage}</p>}
            <h1 className={styles['enter-email-quote']}>Please Enter Your Email</h1>
            <form className={styles['form-container']} onSubmit={handleSubmit2}>
              <div className={styles['input-wrapper']}>
                <label className={styles['label']} htmlFor="userEmail">Email: </label>
                <input className={styles['input']} type="email" placeholder='Please Enter Email' onChange={handleChangeEmail} value={emailFromForm} disabled />
              </div>

              <div className={styles['input-wrapper']}>
                <label className={styles['label']} htmlFor="oldPassword">Old Password: </label>
                <div className={styles['password-wrapper']}>
                  <input className={styles['input']} type={showOldPassword ? "text" : "password"} placeholder='Please Enter Old Password' onChange={handleChangeOldPassword} value={oldPassword} />
                  <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} className={styles['eye-icon']} onClick={() => setShowOldPassword(!showOldPassword)} />
                </div>
              </div>
              {validationError.oldPassword && <p className={styles['validation-error']}>{validationError.oldPassword}</p>}

              <div className={styles['input-wrapper']}>
                <label className={styles['label']} htmlFor="newPassword">New Password: </label>
                <div className={styles['password-wrapper']}>
                  <input className={styles['input']} type={showNewPassword ? "text" : "password"} placeholder='Please Enter New Password' onChange={handleChangeNewPassword} value={newPassword} />
                  <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} className={styles['eye-icon']} onClick={() => setShowNewPassword(!showNewPassword)} />
                </div>
              </div>
              {validationError.newPassword && <p className={styles['validation-error']}>{validationError.newPassword}</p>}

              <button className={styles['button']}>Submit</button>
            </form>
          </div>
        }
      </div >
    </>
  )
}

export default ForgotPassword
