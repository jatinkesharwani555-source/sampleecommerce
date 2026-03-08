import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import styles from './ProfileEdit.module.css';
import { getPresentUserApi } from '../../api/profile.api';
import { userValidation } from '../../utils/userValidation.utils';
import { submitProfileEditFormApi } from '../../api/profileEditForm.api';

const ProfileEdit = () => {
  const navigate = useNavigate();
  // User 
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userMobileNo: "",
    userPassword: ""
  });
  // File State 
  const [file, setFile] = useState(null);
  // Error State 
  const [error, setError] = useState({});
  // Loading State 
  const [loading, setLoading] = useState(false);
  // Show Password State 
  const [showPassword, setShowPassword] = useState(false);

  // HandleChange Function 
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // HandleChange Function For File 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  // Fetch User From Backend 
  const fetchUser = async () => {
    setError({});
    try {
      setLoading(true);
      const response = await getPresentUserApi();
      setUser({
        userName: response.data.user.userName,
        userEmail: response.data.user.userEmail,
        userMobileNo: response.data.user.userMobileNo,
        userPassword: ""
      });
    } catch (err) {
      setError({ errorMessage: err.response?.data?.message || "Something Went Wrong" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // HandleSubmit Function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    if (!userValidation(user, setError)) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", user.userName);
      formData.append("email", user.userEmail);
      formData.append("mobile", user.userMobileNo);
      formData.append("password", user.userPassword);
      if (file) formData.append("profileImage", file);

      const response = await submitProfileEditFormApi(formData);

      if (!response.data.success) {
        setError({ errorMessage: response.data.message });
        return;
      }
      alert("Profile Updated Successfully");
      navigate("/profile");

    } catch (err) {
      setError({ errorMessage: err.response?.data?.message || "Something Went Wrong"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles['signup-main-cnt']}>
        <div className={styles['signup-container']}>
          {error.errorMessage && <p className={styles['error']}>{error.errorMessage}</p>}
          <h1 className={styles['dear-user-quote']}>Hey, {user.userName}</h1>
          <h4 className={styles['signup-quote']}>Update Profile</h4>
          <form className={styles['signup-page-form']} onSubmit={handleSubmit} encType='multipart/form-data'>

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userName">User Name : </label>
              <input type="text" name='userName' placeholder='Enter Your UserName Here...' className={`${styles['form-input']} ${styles['form-username']}`} value={user.userName} onChange={handleChange} />
            </div>
            {error.userName && <p className={styles['error']}>{error.userName}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userMobile">User Mobile : </label>
              <input type="number" name='userMobileNo' placeholder='Enter Your UserMobile Here...' className={`${styles['form-input']} ${styles['form-usermobile']}`} value={user.userMobileNo} onChange={handleChange} />
            </div>
            {error.userMobileNo && <p className={styles['error']}>{error.userMobileNo}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userEmail">User Email : </label>
              <input type="email" name='userEmail' placeholder='Enter Your UserEmail Here...' className={`${styles['form-input']} ${styles['form-useremail']}`} value={user.userEmail} onChange={handleChange} readOnly />
            </div>
            {error.userEmail && <p className={styles['error']}>{error.userEmail}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userPassword">User Password : </label>
              <div className={styles["password-wrapper"]}>
                <input type={showPassword ? "text" : "password"} name='userPassword' placeholder='Enter Your UserPassword Here...' className={`${styles['form-input']} ${styles['form-userpassword']}`} value={user.userPassword} onChange={handleChange} />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={styles['eye-icon']} onClick={() => setShowPassword(!showPassword)} />
              </div>
            </div>
            {error.userPassword && <p className={styles['error']}>{error.userPassword}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="userImage">Image: </label>
              <input type="file" name='profileImage' onChange={handleFileChange} />
            </div>
            <button className={styles['form-submit-btn']}>Submit</button>
          </form>
          <div className={styles['login-button']}>
            <p className={styles['login-quote']}>Click To Change Password : </p>
            <NavLink className={styles['login-btn']} to={"/change-password"}>Change Password</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileEdit
