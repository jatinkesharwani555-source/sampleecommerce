import { useState } from 'react';
import styles from '../CSS/Signup.module.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import { submitSignupForm } from '../../../api/signUpForm.api';
import { userValidation } from '../../../utils/userValidation.utils';

const SignUp = () => {
  // UseState 
  const [createdUserData, setCreatedUserData] = useState({
    userName: "",
    userEmail: "",
    userMobileNo: "",
    userPassword: ""
  });
  // Error State 
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Show Password State 
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // HandleChange Function 
  const handleChange = (e) => {
    setCreatedUserData({
      ...createdUserData,
      [e.target.name]: e.target.value
    });
  };

  // HandleSubmit Function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    if (!userValidation(createdUserData, setError)) return;
    try {
      setLoading(true);
      const response = await submitSignupForm(createdUserData);

      // Check If Email Is Already Registered 
      if (!response.data.success) {
        if (response.data.message === "Email Already Exists") {
          setError({ userEmail: "Email Already Exist" })
        }
        else {
          setServerError(response?.data?.message || "SOMETHING WENT WRONG");
        }
        return;
      }
      alert("User Created Successfully");

      // Reset Form 
      setCreatedUserData({
        userName: "",
        userEmail: "",
        userMobileNo: "",
        userPassword: ""
      });

      navigate("/login");

    } catch (err) {
      setServerError(err.response?.data?.message || "SOMETHING WENT WRONG");
      console.log("Error In Sending Data: ", err.message);
      alert("Something Went Wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles['signup-main-cnt']}>
        <div className={styles['signup-container']}>
          <h1 className={styles['dear-user-quote']}>Hey, Dear User</h1>
          <h4 className={styles['signup-quote']}>Please SignUp</h4>
          {serverError && <p className={styles['error-message']}>{serverError}</p>}
          <form className={styles['signup-page-form']} onSubmit={handleSubmit}>
            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userName">User Name : </label>
              <input type="text" name='userName' placeholder='Enter Your UserName Here...' className={`${styles['form-input']} ${styles['form-username']}`} value={createdUserData.userName} onChange={handleChange} />
            </div>
            {error.userName && <p className={styles['error']}>{error.userName}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userMobile">User Mobile : </label>
              <input type="number" name='userMobileNo' placeholder='Enter Your UserMobile Here...' className={`${styles['form-input']} ${styles['form-usermobile']}`} value={createdUserData.userMobileNo} onChange={handleChange} />
            </div>
            {error.userMobileNo && <p className={styles['error']}>{error.userMobileNo}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userEmail">User Email : </label>
              <input type="email" name='userEmail' placeholder='Enter Your UserEmail Here...' className={`${styles['form-input']} ${styles['form-useremail']}`} value={createdUserData.userEmail} onChange={handleChange} />
            </div>
            {error.userEmail && <p className={styles['error']}>{error.userEmail}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userPassword">User Password : </label>
              <div className={styles["password-wrapper"]}>
                <input type={showPassword ? "text" : "password"} name='userPassword' placeholder='Enter Your UserPassword Here...' className={`${styles['form-input']} ${styles['form-userpassword']}`} value={createdUserData.userPassword} onChange={handleChange} />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={styles['eye-icon']} onClick={() => setShowPassword(!showPassword)} />
              </div>
            </div>
            {error.userPassword && <p className={styles['error']}>{error.userPassword}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userImage">Image: </label>
              <input type="file" name='userImage' />
            </div>
            <button className={styles['form-submit-btn']} disabled={loading}>{loading ? "Submitting" : "Submit"}</button>
          </form>
          <div className={styles['login-button']}>
            <p className={styles['login-quote']}>Have An Account : </p>
            <NavLink className={styles['login-btn']} to={"/login"}>Login Now</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
