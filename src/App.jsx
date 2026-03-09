import { useEffect, useState, Suspense, lazy } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import MainPage from './components/Pages/JSX/MainPage';
import PageNotFound from './components/Pages/JSX/PageNotFound';
import LoadingSpinner from './components/LoadingSpinner'; // create a simple spinner component
import SearchProductsList from './components/Products/JSX/SearchProductsList';
import ManageProducts from './components/Admin/ManageProducts';
import EditProduct from './components/Admin/EditProduct';
import DeleteProduct from './components/Admin/DeleteProduct';
import ImagePreview from './components/Products/JSX/ProductImagePreview';
import { authCheck } from './api/authCheck';

// Lazy load big components
const SignUp = lazy(() => import('./components/Login&Logout/JSX/SignUp'));
const Login = lazy(() => import('./components/Login&Logout/JSX/Login'));
const Logout = lazy(() => import('./components/Login&Logout/JSX/Logout'));
const HomePage = lazy(() => import('./components/Pages/JSX/HomePage'));
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
const DetailedProduct = lazy(() => import('./components/Products/JSX/DetailedProduct'));
const ProductCart = lazy(() => import('./components/Pages/JSX/ProductCart'));
const CategoryWiseProductList = lazy(() => import('./components/Products/JSX/CategoryWiseProductList'));

// ===== ProtectedRoute Component =====
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

// ===== AdminRoute Component =====
const AdminRoute = ({ isLoggedIn, role, children }) => {
  if (!isLoggedIn || role !== "admin") return <Navigate to="/" replace />;
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== Check auth status =====
  const checkAuth = async () => {
    try {
      const response = await authCheck();
      if (response.data.success) {
        setIsLoggedIn(true);
        setRole(response.data.role);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ===== Routes =====
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/signup",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            {!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            {!isLoggedIn ? <Login loggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} setRole={setRole} /> : <Navigate to="/" />}
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/logout",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <Logout loggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} setRole={setRole} />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <AboutPage />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <ContactPage />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/profile",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/profile-edit",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileEdit />
            </ProtectedRoute>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/profile-delete",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileDelete />
            </ProtectedRoute>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <ForgotPassword />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/change-password",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ChangePassword />
            </ProtectedRoute>
          </Suspense>
        </Layout>
      ),
    },
    // ===== Admin Routes =====
    {
      path: "/admin/dashboard",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <AdminRoute isLoggedIn={isLoggedIn} role={role}>
              <Dashboard />
            </AdminRoute>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/admin/all-users",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <AdminRoute isLoggedIn={isLoggedIn} role={role}>
              <AllUsers />
            </AdminRoute>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/admin/create-product",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <AdminRoute isLoggedIn={isLoggedIn} role={role}>
              <CreateProduct />
            </AdminRoute>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/admin/manage-products",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <AdminRoute isLoggedIn={isLoggedIn} role={role}>
              <ManageProducts />
            </AdminRoute>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/admin/edit-product/:id",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <AdminRoute isLoggedIn={isLoggedIn} role={role}>
              <EditProduct />
            </AdminRoute>
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/admin/delete-product/:id",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <AdminRoute isLoggedIn={isLoggedIn} role={role}>
              <DeleteProduct />
            </AdminRoute>
          </Suspense>
        </Layout>
      ),
    },
    // ===== Product Routes =====
    {
      path: "/product/:id",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <DetailedProduct loggedIn={isLoggedIn} role={role} />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/product/image-preview/:id/:image",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={false}>
          <Suspense fallback={<LoadingSpinner text='Loading Image'/>}>
            <ImagePreview />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/product-cart",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductCart />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/product-list",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <CategoryWiseProductList />
          </Suspense>
        </Layout>
      ),
    },
    {
      path: "/products",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <SearchProductsList loggedIn={isLoggedIn} role={role} />
          </Suspense>
        </Layout>
      ),
    },

    // ===== 404 =====
    {
      path: "*",
      element: (
        <Layout loggedIn={isLoggedIn} role={role} showFooter={true}>
          <Suspense fallback={<LoadingSpinner />}>
            <PageNotFound />
          </Suspense>
        </Layout>
      ),
    },
  ]);

  return <>{loading ? <LoadingSpinner text='Fetching Products...' /> : <RouterProvider router={router} />}</>;
}

export default App;
