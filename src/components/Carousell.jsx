import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Carousel.module.css";

const Carousell = ({ slides, autoPlay = true, delay = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, delay);
    return () => clearInterval(timer);
  }, [current, autoPlay, delay]);


  const handleSlideClick = (slide) => {
    navigate(`${slide.link}?category=${slide.category}`);
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.left} onClick={prevSlide}>❮</button>

        <img
          src={slides[current].image}
          alt="banner"
          className={styles.image}
          onClick={()=> handleSlideClick(slides[current])}
        />

      <button className={styles.right} onClick={nextSlide}>❯</button>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${current === index ? styles.active : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousell;
