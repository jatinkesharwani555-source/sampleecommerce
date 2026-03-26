import { NavLink, useNavigate } from "react-router-dom";
import styles from "../CSS/Navbar.module.css";
import { useState } from "react";
import SearchBar from "../../SearchBar.jsx";
import {
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaShoppingCart,
  FaUser,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaUserShield,
  FaClipboardList,
  FaPlusCircle,
  FaUsers
} from "../../../react-icons.js";

const Navbar = ({ loggedIn, role }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>

        {/* Logo */}
        <div className={styles.logo} onClick={() => navigate("/")}>
          <span className={styles.logoText}>KESHARWANI MART</span>
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <ul className={styles.menu}>

          <li>
            <NavLink to="/" className={styles.navItem}>
              <FaHome className={styles.icon} />
              <span className={styles.tooltip}>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className={styles.navItem}>
              <FaBoxOpen className={styles.icon} />
              <span className={styles.tooltip}>Products</span>
            </NavLink>
          </li>

          {/* ADMIN SECTION */}
          {loggedIn && role === "admin" && (
            <>
              <li>
                <NavLink to="/admin/dashboard" className={styles.navItem}>
                  <FaUserShield className={styles.icon} />
                      <span className={styles.tooltip}>Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/create-product" className={styles.navItem}>
                  <FaPlusCircle className={styles.icon} />
                      <span className={styles.tooltip}>Create Product</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/manage-products" className={styles.navItem}>
                  <FaClipboardList className={styles.icon} />
                      <span className={styles.tooltip}>Manage Products</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/all-users" className={styles.navItem}>
                  <FaUsers className={styles.icon} />
                      <span className={styles.tooltip}>All Users</span>
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink to="/about-us" className={styles.navItem}>
              <FaInfoCircle className={styles.icon} />
                  <span className={styles.tooltip}>About Us</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact-us" className={styles.navItem}>
              <FaPhoneAlt className={styles.icon} />
                  <span className={styles.tooltip}>Contact Us</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/product-cart" className={styles.navItem}>
              <FaShoppingCart className={styles.icon} />
                  <span className={styles.tooltip}>Cart</span>
            </NavLink>
          </li>

          {loggedIn ? (
            <li>
              <NavLink to="/profile" className={styles.navItem}>
                <FaUser className={styles.icon} />
                    <span className={styles.tooltip}>Account</span>
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/signup" className={styles.navItem}>
                <FaUserPlus className={styles.icon} />
                    <span className={styles.tooltip}>Signup/Login</span>
              </NavLink>
            </li>
          )}

        </ul>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* ================= MOBILE RIGHT SECTION ================= */}
        <div className={styles.mobileRightSection}>

          {/* Cart Icon Always Visible in Mobile */}
          <NavLink to="/product-cart" className={styles.mobileCart}>
            <FaShoppingCart />
          </NavLink>

          {/* Hamburger Icon */}
          <div
            className={styles.mobileIcon}
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </div>

        </div>

      </nav>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className={styles.mobileMenu}>

          <NavLink to="/" onClick={() => setOpen(false)}>
            <FaHome className={styles.icon} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/products" onClick={() => setOpen(false)}>
            <FaBoxOpen className={styles.icon} />
            <span>Products</span>
          </NavLink>

          {loggedIn && role === "admin" && (
            <>
              <NavLink to="/admin/dashboard" onClick={() => setOpen(false)}>
                <FaUserShield className={styles.icon} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="/admin/create-product" onClick={() => setOpen(false)}>
                <FaPlusCircle className={styles.icon} />
                <span>Create Product</span>
              </NavLink>

              <NavLink to="/admin/manage-products" onClick={() => setOpen(false)}>
                <FaClipboardList className={styles.icon} />
                <span>Manage Products</span>
              </NavLink>

              <NavLink to="/admin/all-users" onClick={() => setOpen(false)}>
                <FaUsers className={styles.icon} />
                <span>All Users</span>
              </NavLink>
            </>
          )}

          <NavLink to="/about-us" onClick={() => setOpen(false)}>
            <FaInfoCircle className={styles.icon} />
            <span>About</span>
          </NavLink>

          <NavLink to="/contact-us" onClick={() => setOpen(false)}>
            <FaPhoneAlt className={styles.icon} />
            <span>Contact</span>
          </NavLink>

          <NavLink to="/product-cart" onClick={() => setOpen(false)}>
            <FaShoppingCart className={styles.icon} />
            <span>Cart</span>
          </NavLink>

          {loggedIn ? (
            <NavLink to="/profile" onClick={() => setOpen(false)}>
              <FaUser className={styles.icon} />
              <span>Profile</span>
            </NavLink>
          ) : (
            <NavLink to="/signup" onClick={() => setOpen(false)}>
              <FaUserPlus className={styles.icon} />
              <span>Sign Up</span>
            </NavLink>
          )}

          <SearchBar onSearch={handleSearch} />

        </div>
      )}
    </>
  );
};

export default Navbar;