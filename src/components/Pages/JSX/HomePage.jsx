import styles from '../CSS/HomePage.module.css';
import HomePageOptions from './HomePageOptions.jsx';
import ContactPage from './ContactPage.jsx';
import Carousell from '../../Carousell.jsx';
import BestSellerProducts from '../../Products/JSX/BestSellerProducts.jsx';
import AllProductList from '../../Products/JSX/AllProductList.jsx';
import { homeSlides } from '../../../constants/homeSlides.js';
import ShopByCategory from '../../Products/JSX/ShopByCategory.jsx';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  // For SEO 
  useEffect(() => {
    // document.title = "Home Page | Kesharwani Mart";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  <Helmet>
    <title>Kesharwani Mart - Gift Shop</title>
    <meta name="description" content="Best Prasad & Gift Store in Bharwari Kaushambi." />
    <link rel="canonical" href="https://www.kesharwanimart.in/" />
  </Helmet>

  return (
    <>
      <div className={styles['mainpage-main-cnt']} id='home'>
        <div className={styles['mainpage-container']}>
          <div className={styles['section-1']}>
            <h1>Welcome To Kesharwani Mart</h1>
            <Carousell slides={homeSlides} />
          </div>
          <BestSellerProducts />
          <ShopByCategory slides={homeSlides} />
          <AllProductList />
          <HomePageOptions />
          <ContactPage />
        </div>
      </div>
    </>
  )
}

export default HomePage
