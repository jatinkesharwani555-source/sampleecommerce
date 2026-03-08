import styles from '../CSS/HomePage.module.css';
import HomePageOptions from './HomePageOptions';
import ContactPage from './ContactPage';
import Carousel from '../../Carousel';
import BestSellerProducts from '../../Products/JSX/BestSellerProducts';
import AllProductList from '../../Products/JSX/AllProductList';
import { homeSlides } from '../../../constants/homeSlides';
import ShopByCategory from '../../Products/JSX/ShopByCategory';

const HomePage = () => {
  return (
    <>
      <div className={styles['mainpage-main-cnt']} id='home'>
        <div className={styles['mainpage-container']}>
          <div className={styles['section-1']}>
            <h1>Welcome To Kesharwani Mart</h1>
            <Carousel slides={homeSlides} />
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
