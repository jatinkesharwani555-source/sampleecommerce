import React, { useEffect, useState } from "react";
import styles from "../CSS/AddressPage.module.css";
import { useNavigate } from "react-router-dom";
import { getUserAddresses } from "../../../api/address.api";

const AddressPage = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await getUserAddresses();
      setAddresses(response.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedId) {
      alert("Please select address");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className={styles["address-main"]}>
      <div className={styles["address-container"]}>

        <h1 className={styles["heading"]}>Select Address</h1>

        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <>
            {/* ADDRESS LIST */}
            <div className={styles["address-list"]}>
              {addresses.length === 0 ? (
                <p className={styles.empty}>No Address Found</p>
              ) : (
                addresses.map((addr) => (
                  <div
                    key={addr._id}
                    className={`${styles.card} ${
                      selectedId === addr._id ? styles.active : ""
                    }`}
                    onClick={() => setSelectedId(addr._id)}
                  >
                    <p><strong>{addr.name}</strong></p>
                    <p>{addr.phone}</p>
                    <p>{addr.address}</p>
                    <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                  </div>
                ))
              )}
            </div>

            {/* BUTTONS */}
            <div className={styles.actions}>
              <button
                className={styles["add-btn"]}
                onClick={() => navigate("/address-form")}
              >
                + Add New Address
              </button>

              <button
                className={styles["continue-btn"]}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default AddressPage;