import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/ForgotPassword.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getPresentUserApi } from '../../../api/profile.api';
import {changePasswordValidation} from '../../../utils/changePasswordValidation.utils';
import { submitChangePasswordFormApi } from '../../../api/changePassword.api';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({});
  const [validationError, setValidationError] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // HandleChange Functions 
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  }
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  // Fetch Email From Backend 
  const fetchEmail = async () => {
    setError({});
    try {
      setLoading(true);
      const response = await getPresentUserApi();
      setEmail(response.data.user.userEmail);
    } catch (err) {
      setError({ errorMessage: err.response?.data?.message || "Something Went Wrong" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmail();
  }, [])

  // Handle Form Submitting 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    if (!changePasswordValidation(email, oldPassword, newPassword, setValidationError)) return;
    try {
      setLoading(true);
      const response = await submitChangePasswordFormApi({
        oldPassword,
        newPassword
      });

      if (!response.data.success) {
        setError({ errorMessage: response.data.message });
        return;
      }

      navigate("/logout");
    } catch (err) {
      setError({ errorMessage: err.response?.data?.message || "Something Went Wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles['forgotpage-main-cnt']}>
        <div className={styles['forgotpage-container']} style={{ paddingTop: "100px" }}>
          {error.errorMessage && <p className={styles['error-message']}>{error.errorMessage}</p>}
          <h1 className={styles['enter-email-quote']}>Please Enter Your Email</h1>
          <form className={styles['form-container']} onSubmit={handleSubmit}>
            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userEmail">Email: </label>
              <input className={styles['input']} type="email" placeholder='Please Enter Email' onChange={handleChangeEmail} value={email} readOnly />
            </div>
            {validationError.userEmail && <p className={styles['validation-error']}>{validationError.userEmail}</p>}

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
      </div >
    </>
  )
}

export default ChangePassword
