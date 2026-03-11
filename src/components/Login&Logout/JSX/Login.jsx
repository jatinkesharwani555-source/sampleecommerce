import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from '../CSS/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { submitLoginForm } from '../../../api/loginForm.api';
import { loginValidation } from '../../../utils/loginValidation.utils';

const Login = (props) => {
  // UseState 
  const [userFromForm, setUserFromForm] = useState({
    userEmail: "",
    userPassword: ""
  });

  // Error State 
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState(null);

  // Loading State 
  const [loading, setLoading] = useState(false);

  // Show Password State 
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // HandleChange Function 
  const handleChange = (e) => {
    setUserFromForm({
      ...userFromForm,
      [e.target.name]: e.target.value
    });
  };

  // HandleSubmit Function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    if (!loginValidation(userFromForm, setError)) return;
    try {
      setLoading(true);

      const response = await submitLoginForm(userFromForm);

      if (!response.data.success) {
        setServerError(response.data.message || "SUCCESS FALSE");
        return;
      }
      // Login Success 
      if (response.data.success) {
        props.setLoggedIn(true);
        props.setRole(response.data.role);
        navigate("/");
      }
    } catch (err) {
      setServerError(err.response?.data?.message || "SOMETHING WENT WRONG");
    } finally {
      setLoading(false);
    }
  };

  // For SEO 
  useEffect(() => {
    document.title = "Login | Kesharwani Mart";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className={styles['loginpage-main-cnt']}>
        <div className={styles['loginpage-container']}>
          <h1 className={styles['dear-user-quote']}>Hey, Dear User</h1>
          <h4 className={styles['login-qoute']}>Please Login</h4>
          {serverError && <h4 className={styles['error']}>{serverError}</h4>}
          <form className={styles['login-page-form']} onSubmit={handleSubmit}>

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userEmail">User Email : </label>
              <input type="email" name='userEmail' placeholder='Enter Your UserEmail Here...' className={`${styles['form-input']} ${styles['form-useremail']}`} value={userFromForm.userEmail} onChange={handleChange} />
            </div>
            {error.userEmail && <p className={styles['error']}>{error.userEmail}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userPassword">User Password : </label>
              <div className={styles["password-wrapper"]}>
                <input type={showPassword ? "text" : "password"} name='userPassword' placeholder='Enter Your UserPassword Here...' className={`${styles['form-input']} ${styles['form-userpassword']}`} value={userFromForm.userPassword} onChange={handleChange} />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={styles['eye-icon']} onClick={() => setShowPassword(!showPassword)} />
              </div>
            </div>
            {error.userPassword && <p className={styles['error']}>{error.userPassword}</p>}
            <NavLink className={styles['forgot-password']} to="/forgot-password">forgot password</NavLink>

            <button className={styles['form-submit-btn']} disabled={loading}>{loading ? "Logging In..." : "Submit"}</button>
          </form>
          <div className={styles['signup-button']}>
            <p className={styles['signup-quote']}>Don't Have An Account : </p>
            <NavLink className={styles['signup-btn']} to={"/signup"}>SignUp Now</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
