import styles from '../CSS/Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className={styles['footer-main-cnt']} id='footer'>
        <div className={styles['footer-container']}>
          {/* Left Section  */}
          <div className={styles['left-section']}>
            {/* Header  */}
            <div className={styles['header']}>
              <div className={styles['logo-cnt']}>
                <p className={styles['logo']}>Kesharwani Mart</p>
              </div>
            </div>
            {/* Body  */}
            <div className={styles['body']}>
              <div className={styles['description-cnt']}>
                <div className={styles['description']}>
                  Where creativity meets craftsmanship. Founded with a passion for excellence, we specialize in delivering unique, high-quality products that blend tradition with innovation.
                </div>
              </div>
              <div className={styles['address-cnt']}>
                <div className={styles['address']}>
                  <span className={styles['address-quote']}>Address: </span><a href='https://maps.app.goo.gl/efkp2zxdk9yVjafx5' target='_blank' rel='noopener noreferrer' className={styles['address-link']}>Hanuman Mandir, Khatu Shyam Mandir, Naya Bazar, Bharwari Kaushambi, Uttar Pradesh, 212201</a>
                </div>
              </div>
              <div className={styles['contact-cnt']}>
                <div className={styles['contact']}>
                  <span className={styles['contact-quote']}>Contact: </span>0123456789, 9874563210
                </div>
              </div>
              <div className={styles['social-links-cnt']}>
                <h2 className={styles['social-links-quote']}>Follow Us: </h2>
                <ul className={styles['social-ul']}>
                  <li className={`${styles['social-link']}`}><Link to={"#"}><i className="fa-brands fa-whatsapp"></i></Link></li>
                  <li className={`${styles['social-link']}`}><Link to={"#"}><i className="fa-brands fa-instagram"></i></Link></li>
                  <li className={`${styles['social-link']}`}><Link to={"#"}><i className="fa-brands fa-facebook"></i></Link></li>
                  <li className={`${styles['social-link']}`}><Link to={"#"}><i className="fa-brands fa-twitter"></i></Link></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Right Section  */}
          <div className={styles['right-section']}>
            {/* Footer  */}
            <div className={styles['footer']}>
              <ul className={styles['ul']}>
                <h2 className={styles['ul-heading']}>Links</h2>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/contact-us'}>Contact Us</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Delivery Information</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Privacy Policy</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Terms & Conditions</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Events</Link></li>
              </ul>

              <ul className={styles['ul']}>
                <h2 className={styles['ul-heading']}>Custumer Service</h2>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>About Us</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Delivery Information</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Privacy Policy</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Terms & Conditions</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Events</Link></li>
              </ul>

              {/* <ul className={styles['ul']}>
                <h2 className={styles['ul-heading']}>Links</h2>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>About Us</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Delivery Information</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Privacy Policy</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Terms & Conditions</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Events</Link></li>
              </ul> */}

              {/* <ul className={styles['ul']}>
                <h2 className={styles['ul-heading']}>Costumer Service</h2>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>About Us</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Delivery Information</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Privacy Policy</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Terms & Conditions</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Events</Link></li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
