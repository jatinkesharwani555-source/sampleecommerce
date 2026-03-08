import { useNavigate } from "react-router-dom";
import styles from "../CSS/ShopByCategory.module.css";

const ShopByCategory = ({ slides = [] }) => {

  const navigate = useNavigate();

  const handleSlideClick = (slide) => {
    if (!slide?.link) return;
    navigate(`${slide.link}?category=${slide.category}`);
  };

  if (!slides.length) return null;

  return (
    <div className={styles['page-cnt']}>
      <h1 className={styles['page-heading']}>Shop By Category</h1>
      <div className={styles.carouselList}>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={styles.carouselItem}
            onClick={() => handleSlideClick(slide)}
          >
            <img
              src={slide.image}
              alt={slide.title || slide.category}
              className={styles.carouselImage}
            />

            <p className={styles.carouselText}>
              {slide.title || slide.category}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ShopByCategory;