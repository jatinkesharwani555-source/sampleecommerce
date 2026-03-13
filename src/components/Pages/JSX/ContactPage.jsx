import { Link, useNavigate } from "react-router-dom";
import styles from "../CSS/ContactPage.module.css";
import useContactForm from "../../../hooks/useContactForm.js";
import { useEffect } from "react";

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
              <span>Mobile: </span>
              <a className={styles['mobile-no-link']} href="tel:7706034432">7706034432</a>
            </p>
            <p className={styles["contact-details"]}>
              <span>WhatsApp: </span>
              <a className={styles['mobile-no-link']} href="https://wa.me/7706034432">7706034432</a>
            </p>
            <p className={styles["contact-details"]}>
              <span>Email: </span>
              <a className={styles['email-link']} href="mailto:jatinkesharwani555@gmail.com">jatinkesharwani555@gmail.com</a>
            </p>
          </div>
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
    </div>
  );
};

export default ContactPage;
