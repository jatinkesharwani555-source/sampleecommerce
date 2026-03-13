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
                  Kesharwani Mart is your trusted online store offering quality products at affordable prices.
                  Browse a wide range of items, add them to your cart, and enjoy a smooth and secure shopping experience.                </div>
              </div>
              <div className={styles['address-cnt']}>
                <div className={styles['address']}>
                  <span className={styles['address-quote']}>Address: </span>
                  <a href='https://maps.app.goo.gl/efkp2zxdk9yVjafx5' target='_blank' rel='noopener noreferrer' className={styles['address-link']}>
                    Hanuman Mandir, Khatu Shyam Mandir, Naya Bazar, Bharwari Kaushambi, Uttar Pradesh, 212201
                  </a>
                </div>
              </div>
              <div className={styles['contact-cnt']}>
                <div className={styles['contact']}>
                  <span className={styles['contact-quote']}>Mobile: </span>
                  <a href="tel:7706034432">7706034432, 9874563210</a>
                </div>

                <div className={styles["contact"]}>
                  <span className={styles["contact-quote"]}>Email: </span>
                  <a href="mailto:jatinkesharwani555@gmail.com">jatinkesharwani555@gmail.com</a>
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

              {/* Payment Methods */}
              <div className={styles["payment-methods"]}>
                <h3>We Accept</h3>
                <div className={styles["payments"]}>
                  <span>UPI</span>
                  <span>Visa</span>
                  <span>MasterCard</span>
                  <span>Paytm</span>
                </div>
              </div>

            </div>
          </div>
          {/* Right Section  */}
          <div className={styles['right-section']}>
            {/* Footer  */}
            <div className={styles['footer']}>
              <ul className={styles['ul']}>
                <h2 className={styles['ul-heading']}>Quick Links</h2>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/'}>Home Page</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/products'}>All Products</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/product-cart'}>Cart</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/about-us'}>About Us</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/contact-us'}>Contact Us</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/login'}>Login / Register</Link></li>
              </ul>

              <ul className={styles['ul']}>
                <h2 className={styles['ul-heading']}>Support & Login/SignUp</h2>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/contact-us'}>Help Center</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/contact-us'}>Customer Support</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/signup'}>Sign Up</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/login'}>Login</Link></li>
                <li className={styles['link-li']}><Link className={styles['link']} to={'/contact-us'}>Location</Link></li>
              </ul>

              {/* Newsletter */}
              <div className={styles["newsletter"]}>
                <h3>Subscribe</h3>
                <p>Get updates about new products and offers.</p>

                <div className={styles["newsletter-box"]}>
                  <input type="email" placeholder="Enter your email" />
                  <button>Subscribe</button>
                </div>
              </div>

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
        {/* COPYRIGHT */}
        <div className={styles["copyright"]}>
          © {new Date().getFullYear()} Kesharwani Mart. All Rights Reserved.
        </div>
      </div>
    </>
  )
}

export default Footer
