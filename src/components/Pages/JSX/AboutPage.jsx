import { useEffect } from 'react';
import styles from '../CSS/AboutPage.module.css';

const AboutPage = () => {
  // For SEO and scroll to top
  useEffect(() => {
    document.title = "About Us | Kesharwani Mart";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={styles['aboutpage-main-cnt']}>
      <div className={styles['aboutpage-container']}>
        <h1 className={styles['aboutpage-heading']}>About Us</h1>

        {/* First Section */}
        <div className={styles['first-section']}>
          <div className={styles['image-cnt']}>
            <img 
              className={styles['image']} 
              src="/shop.jpg" 
              alt="Kesharwani Mart Shop" 
              loading="lazy" 
            />
          </div>
          <div className={styles['description-cnt']}>
            <p className={styles['description']}>
              Kesharwani Mart was founded with a vision to make online shopping simple, reliable, and enjoyable for everyone. We strive to bring a wide variety of products directly to your doorstep, so you can shop without any hassle.
            </p>
            <p className={styles['description']}>
              From everyday essentials to trending products, we carefully select items from trusted suppliers to ensure quality and satisfaction. Our platform is designed to cater to all your shopping needs under one roof.
            </p>

            <h3 className={styles['desc-heading']}>Our Mission</h3>
            <p className={styles['description']}>
              Our mission at Kesharwani Mart is to empower customers with convenience, choice, and confidence. We are committed to providing a seamless shopping experience, from browsing to delivery, making sure you always feel valued and supported.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className={styles['second-section']}>
          <h2 className={styles['second-section-heading']}>Why Choose Kesharwani Mart</h2>
          <div className={styles['second-section-cards']}>
            <div className={styles['mini-cnt']}>
              <h4 className={styles['mini-heading']}>Trusted Quality</h4>
              <p className={styles['mini-para']}>
                Every product is carefully selected and verified to meet our high standards, ensuring you get the best.
              </p>
            </div>
            <div className={styles['mini-cnt']}>
              <h4 className={styles['mini-heading']}>Easy & Convenient</h4>
              <p className={styles['mini-para']}>
                Our website is designed to make shopping quick and effortless, so you can find what you need in just a few clicks.
              </p>
            </div>
            <div className={styles['mini-cnt']}>
              <h4 className={styles['mini-heading']}>Customer First Approach</h4>
              <p className={styles['mini-para']}>
                Our dedicated support team is always ready to assist you, making sure your shopping experience is smooth and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;