import { useEffect } from 'react';
import styles from '../CSS/AboutPage.module.css';

const AboutPage = () => {
  // For SEO 
  useEffect(() => {
    document.title = "About Us | Kesharwani Mart";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className={styles['aboutpage-main-cnt']}>
        <div className={styles['aboutpage-container']}>
          <h1 className={styles['aboutpage-heading']}>About Us</h1>
          <div className={styles['first-section']}>
            <div className={styles['image-cnt']}>
              <img className={styles['image']} src="/shop.jpg" alt="Shop Image" loading='lazy' />
            </div>
            <div className={styles['description-cnt']}>
              <p className={styles['description']}>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
              <p className={styles['description']}>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>

              <h3 className={styles['desc-heading']}>Our Mission</h3>
              <p className={styles['description']}>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
            </div>
          </div>
          <div className={styles['second-section']}>
            <h2 className={styles['second-section-heading']}>Why Choose Us</h2>
            <div className={styles['second-section-cards']}>
              <div className={styles['mini-cnt']}>
                <h4 className={styles['mini-heading']}>Quality Assurance</h4>
                <p className={styles['mini-para']}>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
              </div>
              <div className={styles['mini-cnt']}>
                <h4 className={styles['mini-heading']}>Convenience</h4>
                <p className={styles['mini-para']}>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
              </div>
              <div className={styles['mini-cnt']}>
                <h4 className={styles['mini-heading']}>Exceptional Customer Service</h4>
                <p className={styles['mini-para']}>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
