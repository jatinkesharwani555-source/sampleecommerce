import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { getPresentUserApi } from "../../api/profile.api";
import { FaUserEdit, FaTrash, FaSignOutAlt } from "react-icons/fa";
import LoadingSpinner from '../LoadingSpinner';
const Profile = () => {
  const [presentUser, setPresentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const fetchPresentUser = async () => {
    setServerError(null);
    try {
      setLoading(true);
      const response = await getPresentUserApi();
      setPresentUser(response.data.user);
    } catch (err) {
      setServerError(err.response?.data?.message || "SOMETHING WENT WRONG");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentUser();
  }, []);

  if (loading) return <LoadingSpinner />
  if (serverError) return <p className={styles["main-error"]}>{serverError}</p>;

  return (
    <div className={styles.profileMain}>
      <div className={styles.profileCard}>
        
        {/* Profile Image */}
        <div className={styles.imageSection}>
          {presentUser.userImage ? (
            <img
              src={`https://sampleecommercebackend-2.onrender.com/uploads/${presentUser.userImage}`}
              alt="Profile"
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.defaultAvatar}>👤</div>
          )}
        </div>

        {/* User Info */}
        <div className={styles.infoSection}>
          <h2 className={styles.username}>Hey, {presentUser.userName}</h2>

          <div className={styles.details}>
            <p><strong>Name:</strong> {presentUser.userName}</p>
            <p><strong>Mobile:</strong> {presentUser.userMobileNo}</p>
            <p><strong>Email:</strong> {presentUser.userEmail}</p>
          </div>

          {/* Buttons */}
          <div className={styles.buttons}>
            <Link to="/profile-edit" className={`${styles.btn} ${styles.edit}`}>
              <FaUserEdit /> Edit
            </Link>

            <Link to="/profile-delete" className={`${styles.btn} ${styles.delete}`}>
              <FaTrash /> Delete
            </Link>

            <Link to="/logout" className={`${styles.btn} ${styles.logout}`}>
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;