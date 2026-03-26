import Navbar from "./Pages/JSX/Navbar";
import Footer from "./Pages/JSX/Footer";
import Scroll from "../Scrolling/scroll";
const Layout = ({ children, loggedIn, role, showFooter }) => {
  return (
    <>
      <Scroll />
      <Navbar loggedIn={loggedIn} role={role} />
      {children}
      {showFooter && <Footer />}
    </>
  )
}

export default Layout
