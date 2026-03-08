import styles from '../CSS/HomePageOptions.module.css';

const HomePageOptions = () => {
  return (
    <div className={styles['options-main-container']}>
      <div className={styles['options-cnt']}>
        <div className={styles['option']}>
          <div className={styles['image']}><i className="fa-solid fa-arrow-right-arrow-left"></i></div>
          <h4>Easy Exchange Policy</h4>
          <p>We offer hassle free exchange policy</p>
        </div>

        <div className={styles['option']}>
          <div className={styles['image']}><i className="fa-solid fa-calendar-check"></i></div>
          <h4>7 Days Return Policy</h4>
          <p>We provide 7 days free return policy</p>
        </div>

        <div className={styles['option']}>
          <div className={styles['image']}><i className="fa-solid fa-headset"></i></div>
          <h4>Best customer support</h4>
          <p>we provide 24/7 customer support</p>
        </div>

      </div>
    </div>

  )
}

export default HomePageOptions
