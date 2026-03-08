import Navbar from "./Pages/JSX/Navbar";
import Footer from "./Pages/JSX/Footer";
import ContactPage from "./Pages/JSX/ContactPage";
import Scroll from "../Scrolling/scroll";
const Layout = ({ children, loggedIn, role, showFooter }) => {
  return (
    <>
      <Scroll />
      <Navbar loggedIn={loggedIn} role={role} />
      {children}
      {/* <ContactPage /> */}
      {showFooter && <Footer />}
    </>
  )
}

export default Layout
