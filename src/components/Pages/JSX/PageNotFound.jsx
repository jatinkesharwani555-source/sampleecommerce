import { Link } from "react-router-dom";
import styles from "../CSS/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.card}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.desc}>
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className={styles.homeBtn}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
