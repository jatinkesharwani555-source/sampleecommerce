import { useEffect } from 'react';
import { useState } from 'react';
import styles from './AllUsers.module.css';
import { getAllUsersApi } from '../../api/allUsers.api';

const AllUsers = () => {
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    setServerError(null);
    try {
      setLoading(true);
      const response = await getAllUsersApi();
      setAllUsers(response.data.allUsers);
    } catch (err) {
      setServerError(err.response?.data?.message || "SOMETHING WENT WRONG");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading) return <p className={styles['loading']}>Loading...</p>
  if (serverError) return <p className={styles['main-error']}>{serverError}</p>

  return (
    <div className={styles['all-users-main-cnt']}>
      <div className={styles['all-users-container']}>

        {allUsers.length === 0 && <p className={styles['nousers-quote']}>No Users Found</p>}

        {allUsers.length > 0 &&
          allUsers.map((user, index) => (
            <ul className={styles['list-ul']} key={user._id}>
              <li className={styles['sr-no']}>{index + 1}</li>
              <li className={styles['user-name']}>{user.userName}</li>
              <li className={styles['user-email']}>{user.userEmail}</li>
              <li className={styles['user-mobile']}>{user.userMobileNo}</li>
              <li className={styles['user-image']}>
                <img className={styles['image']} src={`http://localhost:3000/uploads/${user.userImage}`} alt='Image' />
              </li>
            </ul>
          ))}
      </div>
    </div>
  )
}

export default AllUsers
