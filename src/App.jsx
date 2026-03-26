import { useEffect, useState, Suspense, lazy } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import { authCheck } from './api/authCheck';
import PaymentPage from './components/Pages/JSX/PaymentPage';
import Orders from './components/Admin/Orders';
import AddressPage from './components/Pages/JSX/AddressPage';
import AddressForm from './components/Pages/JSX/AddressForm';

// Lazy load heavy components
const SignUp = lazy(() => import('./components/Login&Logout/JSX/SignUp'));
const Login = lazy(() => import('./components/Login&Logout/JSX/Login'));
const Logout = lazy(() => import('./components/Login&Logout/JSX/Logout'));
// const HomePage = lazy(() => import('./components/Pages/JSX/HomePage'));
import HomePage from './components/Pages/JSX/HomePage';
const AboutPage = lazy(() => import('./components/Pages/JSX/AboutPage'));
const ContactPage = lazy(() => import('./components/Pages/JSX/ContactPage'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const ProfileEdit = lazy(() => import('./components/Profile/ProfileEdit'));
const ProfileDelete = lazy(() => import('./components/Profile/ProfileDelete'));
const ForgotPassword = lazy(() => import('./components/Login&Logout/JSX/ForgotPassword'));
const ChangePassword = lazy(() => import('./components/Login&Logout/JSX/ChangePassword'));
const Dashboard = lazy(() => import('./components/Admin/Dashboard'));
const AllUsers = lazy(() => import('./components/Admin/AllUsers'));
const CreateProduct = lazy(() => import('./components/Admin/CreateProduct'));
const ManageProducts = lazy(() => import('./components/Admin/ManageProducts'));
const EditProduct = lazy(() => import('./components/Admin/EditProduct'));
const DeleteProduct = lazy(() => import('./components/Admin/DeleteProduct'));
const DetailedProduct = lazy(() => import('./components/Products/JSX/DetailedProduct'));
const ProductCart = lazy(() => import('./components/Pages/JSX/ProductCart'));
const CategoryWiseProductList = lazy(() => import('./components/Products/JSX/CategoryWiseProductList'));
const SearchProductsList = lazy(() => import('./components/Products/JSX/SearchProductsList'));
const PageNotFound = lazy(() => import('./components/Pages/JSX/PageNotFound'));
const ProductImagePreview = lazy(() => import('./components/Products/JSX/ProductImagePreview'));

// ===== ProtectedRoute Component =====
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn === null) return <LoadingSpinner text="Checking Auth..." />;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

// ===== AdminRoute Component =====
const AdminRoute = ({ isLoggedIn, role, children }) => {
  if (isLoggedIn === null) return <LoadingSpinner text="Checking Auth..." />;
  if (!isLoggedIn || role !== "admin") return <Navigate to="/" replace />;
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = checking
  const [role, setRole] = useState(null);

  // ===== Check auth status =====
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authCheck();
        if (res.data.success) {
          setIsLoggedIn(true);
          setRole(res.data.role);
        } else {
          setIsLoggedIn(false);
          setRole(null);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setRole(null);
      }
    };
    checkAuth();
  }, []);

  // ===== Routes =====
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <HomePage />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/signup",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          {!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          {!isLoggedIn ? <Login loggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} setRole={setRole} /> : <Navigate to="/" />}
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/logout",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <Logout loggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} setRole={setRole} />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <AboutPage />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <ContactPage />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/profile",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile />
          </ProtectedRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/profile-edit",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ProfileEdit />
          </ProtectedRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/profile-delete",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ProfileDelete />
          </ProtectedRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <ForgotPassword />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/change-password",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ChangePassword />
          </ProtectedRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },

    // ===== Admin Routes =====
    {
      path: "/admin/dashboard",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <AdminRoute isLoggedIn={isLoggedIn} role={role}>
            <Dashboard />
          </AdminRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/admin/all-users",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <AdminRoute isLoggedIn={isLoggedIn} role={role}>
            <AllUsers />
          </AdminRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/admin/create-product",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <AdminRoute isLoggedIn={isLoggedIn} role={role}>
            <CreateProduct />
          </AdminRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/admin/manage-products",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <AdminRoute isLoggedIn={isLoggedIn} role={role}>
            <ManageProducts />
          </AdminRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/admin/edit-product/:id",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <AdminRoute isLoggedIn={isLoggedIn} role={role}>
            <EditProduct />
          </AdminRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },

    {
      path: "/admin/all-orders",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <Orders loggedIn={isLoggedIn} role={role} />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    // ===== Product Routes =====

    {
      path: "/product/:id",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <DetailedProduct />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/product/image-preview/:id/:image",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          {/* <Suspense fallback={<LoadingSpinner text='Loading Image...' />}> */}
          <ProductImagePreview />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/product-cart",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ProductCart />
          </ProtectedRoute>
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/product-list",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <CategoryWiseProductList />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/products",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <SearchProductsList loggedIn={isLoggedIn} role={role} />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/payment",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <PaymentPage loggedIn={isLoggedIn} role={role} />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/address-page",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <AddressPage loggedIn={isLoggedIn} role={role} />
          {/* </Suspense> */}
        </Layout>
      ),
    },
    {
      path: "/address-form",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <AddressForm loggedIn={isLoggedIn} role={role} />
          {/* </Suspense> */}
        </Layout>
      ),
    },

    // ===== 404 =====
    {
      path: "*",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          {/* <Suspense fallback={<LoadingSpinner />}> */}
          <PageNotFound />
          {/* </Suspense> */}
        </Layout>
      ),
    },
  ]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App;