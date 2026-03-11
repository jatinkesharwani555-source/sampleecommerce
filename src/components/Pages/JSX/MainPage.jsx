// No Use -- Faltu hai 
import { Link } from 'react-router-dom';
import styles from "../CSS/MainPage.module.css";

const MainPage = () => {
  // For SEO 
  useEffect(() => {
    document.title = "Main Page | Kesharwani Mart";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <div className={styles['mainpage-main-cnt']}>
        <div className={styles['mainpage-container']}>
          <h1 className={styles['dear-user-quote']}>Hey, Dear User</h1>
          <h3 className={styles['welcome-quote']}>Welcome To Kesharwani Mart</h3>
          <h5 className={styles['signup-login-quote']}>Please SignUp Or Login</h5>
          <div className={styles['signup-login-btn']}>
            <Link to="/signup" className={`${styles['signup-btn']} ${styles['btn']}`}>SignUp</Link>
            <Link to="/login" className={`${styles['login-btn']} ${styles['btn']}`}>Login</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage
