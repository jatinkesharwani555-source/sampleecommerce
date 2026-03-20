import React, { useState } from "react";
import styles from "../CSS/AddressForm.module.css";
import { useNavigate } from "react-router-dom";
import { validateAddress } from '../../../utils/addressValidation.utils';
import { submitAddressForm } from "../../../api/submitAddress.api";

const AddressForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    state: "Uttar Pradesh",
    city: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone: only numbers
    if (name === "phone" && !/^\d*$/.test(value)) return;

    // Pincode: only numbers & max 6 digits
    if (name === "pincode") {
      if (!/^\d*$/.test(value) || value.length > 6) return;
    }

    setFormData((prev) => {
      let updated = { ...prev, [name]: value };

      if (name === "pincode" && value.length === 6) {
        updated.city = "Kanpur";
        updated.state = "Uttar Pradesh";
      }

      return updated;
    });
    // Real-time error remove
    setValidationError((prev) => ({ ...prev, [name]: "" }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("object")
    setError(null);
    if (!validateAddress(formData, setValidationError)) return;
    try {
      setLoading(true);
      console.log("object2")
      const response = await submitAddressForm(formData);
      if (!response.data.success) {
        setError(response?.data?.message || "Something Went Wrong");
        return;
      }

          console.log("object3")

      alert("Address Saved ✅");
      navigate("/payment");

    } catch (err) {
      setError(err.response?.data?.message || "Something Went Wrongggg");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["addressform-main-cnt"]}>
      <div className={styles["addressform-container"]}>

        <h1 className={styles["addressform-heading"]}>
          Delivery Address
        </h1>
        {/* Global Error */}
        {error && (
          <div className={styles["global-error"]}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles["address-form"]}>

          <div className={styles["input-group"]}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Full Name</label>
            {validationError.name && <span className={styles.error}>{validationError.name}</span>}
          </div>

          <div className={styles["input-group"]}>
            <input
              type="text"
              name="phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Mobile Number</label>
            {validationError.phone && <span className={styles.error}>{validationError.phone}</span>}
          </div>

          <div className={styles["input-group"]}>
            <input
              type="text"
              name="pincode"
              maxLength={6}
              value={formData.pincode}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Pincode</label>
            {validationError.pincode && <span className={styles.error}>{validationError.pincode}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles["input-group"]}>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>City</label>
              {validationError.city && <span className={styles.error}>{validationError.city}</span>}
            </div>

            <div className={styles["input-group"]}>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder=" "
                readOnly
              />
              <label>State</label>
            </div>
          </div>

          <div className={styles["input-group"]}>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Full Address</label>
            {validationError.address && <span className={styles.error}>{validationError.address}</span>}
          </div>

          <button className={styles["save-btn"]} disabled={loading}>
            {loading ? "Saving..." : "Save & Continue"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddressForm;