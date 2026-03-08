import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../../api/productApi";

const ImagePreview = () => {
  const { id, image } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchProduct = async () => {
    const { data } = await getProductById(id);
    const imgs = data.data.productImage;
    setImages(imgs);
    setIndex(imgs.findIndex((img) => img === image));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={container}>
      
      <button style={closeBtn} onClick={() => navigate(-1)}>
        ✕
      </button>

      <button style={leftBtn} onClick={prevImage}>
        ‹
      </button>

      {images.length > 0 && (
        <img
          src={`http://localhost:3000/uploads/${images[index]}`}
          style={imageStyle}
          alt=""
        />
      )}

      <button style={rightBtn} onClick={nextImage}>
        ›
      </button>

    </div>
  );
};

const container = {
  width: "100%",
  height: "100vh",
  background: "#111",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const imageStyle = {
  maxWidth: "90%",
  maxHeight: "90%",
  objectFit: "contain",
  borderRadius: "10px",
};

const closeBtn = {
  position: "absolute",
  top: "20px",
  right: "20px",
  fontSize: "25px",
  background: "rgba(255,255,255,0.2)",
  border: "none",
  color: "white",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  cursor: "pointer",
};

const leftBtn = {
  position: "absolute",
  left: "20px",
  fontSize: "40px",
  color: "white",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const rightBtn = {
  position: "absolute",
  right: "20px",
  fontSize: "40px",
  color: "white",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

export default ImagePreview;