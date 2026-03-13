import { Link, useNavigate } from "react-router-dom";
import styles from "../CSS/ContactPage.module.css";
import useContactForm from "../../../hooks/useContactForm.js";
import { useEffect } from "react";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactPage = () => {
  const navigate = useNavigate();
  const { data, handleChange, handleSubmit, loading, error, serverError, success } = useContactForm(navigate);

  useEffect(() => {
    document.title = "Contact Us | Kesharwani Mart";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles["contactpage-main-cnt"]} id="contact-us">
      <div className={styles["contactpage-container"]}>
        <h1 className={styles["contactpage-heading"]}>Contact Us</h1>

        <div className={styles["first-section"]}>
          <div className={styles["image-cnt"]}>
            <img
              className={styles["image"]}
              src="/contactpagerandom.jpg"
              alt="Contact Page Image"
              loading="lazy"
            />
          </div>

          <div className={styles["address-cnt"]}>
            <h4 className={styles["address-heading"]}>Our Store</h4>
            <p className={styles["address-para"]}>
              <FaMapMarkerAlt />
              <span>Address: </span>
              <a
                className={styles["contact-details"]}
                href="https://maps.app.goo.gl/efkp2zxdk9yVjafx5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hanuman Mandir, Khatu Shyam Mandir, Naya Bazar, Bharwari
                Kaushambi, Uttar Pradesh, 212201
              </a>
            </p>

            <p className={styles["contact-details"]}>
              <FaPhone />
              <span>Mobile: </span>
              <a className={styles['mobile-no-link']} href="tel:7706034432" target="_blank" rel="noopener noreferrer">7706034432</a>
            </p>
            <p className={styles["contact-details"]}>
              <FaWhatsapp />
              <span>WhatsApp: </span>
              <a className={styles['mobile-no-link']} href="https://wa.me/7706034432" target="_blank" rel="noopener noreferrer">7706034432</a>
            </p>
            <p className={styles["contact-details"]}>
              <FaEnvelope />
              <span>Email: </span>
              <a className={styles['email-link']} href="mailto:jatinkesharwani555@gmail.com" target="_blank" rel="noopener noreferrer">jatinkesharwani555@gmail.com</a>
            </p>

            {/* Business Hours */}
            <div className={styles["business-hours"]}>
              <h4><FaClock /> Business Hours</h4>
              <p>Monday - Saturday : 9 AM - 9 PM</p>
              <p>Sunday : 10 AM - 6 PM</p>
            </div>

            {/* Call Button */}
            <a href="tel:7706034432" className={styles["call-btn"]}>
              Call Now
            </a>
          </div>
        </div>

        <div className={styles["map-cnt"]}>
          <iframe
            src="https://www.google.com/maps?q=Hanuman%20Mandir%20Bharwari%20Kaushambi&output=embed"
            width="100%"
            height="260"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

        <div className={styles["second-section"]}>
          <h1 className={styles["get-in-touch-quote"]}>Request To Call</h1>

          {serverError && (
            <p className={styles["server-error"]}>{serverError}</p>
          )}

          <form className={styles["contact-page-form"]} onSubmit={handleSubmit}>
            <div className={styles["input-label-cnt"]}>
              <label className={styles["label"]} htmlFor="name">Name:</label>
              <input
                className={styles["input"]}
                name="name"
                id="name"
                type="text"
                placeholder="Enter Your Name Here..."
                onChange={handleChange}
                value={data.name}
                required
              />
            </div>
            {error.name && <p className={styles["error"]}>{error.name}</p>}

            <div className={styles["input-label-cnt"]}>
              <label className={styles["label"]} htmlFor="mobileNo">Mobile No.:</label>
              <input
                className={styles["input"]}
                name="mobileNo"
                id="mobileNo"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="Enter Mobile Number Here..."
                onChange={handleChange}
                value={data.mobileNo}
                required
              />
            </div>
            {error.mobileNo && <p className={styles["error"]}>{error.mobileNo}</p>}

            <div className={styles["input-label-cnt"]}>
              <label className={styles["label"]} htmlFor="email">Email:</label>
              <input
                className={styles["input"]}
                name="email"
                id="email"
                type="email"
                placeholder="Enter Email Here..."
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>
            {error.email && <p className={styles["error"]}>{error.email}</p>}

            <div className={styles["input-label-cnt"]}>
              <label className={styles["label"]} htmlFor="description">Description:</label>
              <textarea
                className={styles["input"]}
                name="description"
                id="description"
                rows={3}
                placeholder="Please Describe Your Problem..."
                onChange={handleChange}
                value={data.description}
                required
              />
            </div>
            {error.description && <p className={styles["error"]}>{error.description}</p>}

            <div className={styles["button-cnt"]}>
              <button
                disabled={loading}
                className={styles["submit-btn"]}
                type="submit"
              >
                {loading ? "Submitting..." : "Submit Your Details"}
              </button>
            </div>
          </form>
          {/* If Form Is Submitted  */}
          {success && (
            <p className={styles.success}>Thank You! We Will Contact You Shortly.</p>
          )}
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/917706034432"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["whatsapp-float"]}
      >
        WhatsApp
      </a>
    </div>
  );
};

export default ContactPage;
