/* eslint-disable import/no-duplicates */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { lazy, Suspense } from 'react';
import DashboardLayout from './layouts/dashboard';
//

import DashboardAppPage from './pages/DashboardAppPage';
import Home from './src/Pages/Home';
import Login from './src/Pages/Login';

import WebLayout from './src/layout/Layout';
import ShippingLayout from './src/layout/Shipping';
import Protected from './Protected';
import SignUp from './src/Pages/SignUp';

const About = lazy(() => import('./src/Pages/About'));
const Contact = lazy(() => import('./src/Pages/Contact'));
const Terms = lazy(() => import('./src/Pages/Terms'));
const Shipping = lazy(() => import('./src/Pages/Shipping'));
const Refund = lazy(() => import('./src/Pages/Refund'));
const ProductCatgorey = lazy(() => import('./src/Pages/ProductCatgorey'));
const ProductDetail = lazy(() => import('./src/Pages/ProductDetail'));
const Cart = lazy(() => import('./src/Pages/Cart'));
const InformationShiping = lazy(() => import('./src/Pages/Shiping/InformationShiping'));
const ShippingPage = lazy(() => import('./src/Pages/Shiping/ShippingPage'));
const PaymentShipping = lazy(() => import('./src/Pages/Shiping/PaymentShipping'));
const Order = lazy(() => import('./src/Pages/Shiping/Order'));
const Products = lazy(() => import('./pages/Products'));
const NewProducts = lazy(() => import('./components/products/NewProducts'));
const EditProduct = lazy(() => import('./components/products/EditProduct'));
const Chat = lazy(() => import('./src/Pages/Chat/Chat'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <WebLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/chat',
          element: (
            <Protected>
              <Suspense fallback="loading...">
                <Chat />
              </Suspense>
            </Protected>
          ),
        },
        {
          path: 'cart',
          element: (
            <Suspense fallback="loading...">
              <Cart />
            </Suspense>
          ),
        },
        {
          path: 'cart/information',
          element: (
            <Suspense fallback="loading...">
              <InformationShiping />
            </Suspense>
          ),
        },
        {
          path: 'pages/about',
          element: (
            <Suspense fallback="loading...">
              <About />
            </Suspense>
          ),
        },
        {
          path: 'pages/contact',
          element: (
            <Suspense fallback="loading...">
              <Contact />
            </Suspense>
          ),
        },
        {
          path: 'pages/terms',
          element: (
            <Suspense fallback="loading...">
              <Terms />
            </Suspense>
          ),
        },
        {
          path: 'pages/shipping',
          element: (
            <Suspense fallback="loading...">
              <Shipping />
            </Suspense>
          ),
        },
        {
          path: 'pages/refund',
          element: (
            <Suspense fallback="loading...">
              <Refund />
            </Suspense>
          ),
        },
        {
          path: 'pages/:categorey',
          element: (
            <Suspense>
              <ProductCatgorey />
            </Suspense>
          ),
        },
        {
          path: 'pages/:categorey/:product',
          element: (
            <Suspense fallback="loading...">
              <ProductDetail />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/proceed',
      element: <ShippingLayout />,
      children: [
        { element: <Navigate to="/proceed/information" />, index: true },
        {
          path: 'information',
          element: (
            <Suspense fallback="loading...">
              <InformationShiping />
            </Suspense>
          ),
        },
        {
          path: 'information/shipping',
          element: (
            <Suspense fallback="loading...">
              <ShippingPage />
            </Suspense>
          ),
        },
        {
          path: 'information/shipping/payment',
          element: (
            <Suspense fallback="loading...">
              <PaymentShipping />
            </Suspense>
          ),
        },
        {
          path: 'information/shipping/payment/order',
          element: (
            <Suspense fallback="loading...">
              <Order />
            </Suspense>
          ),
        },
      ],
    },

    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        {
          path: 'products',
          element: (
            <Suspense fallback="loading...">
              <Products />
            </Suspense>
          ),
        },
        {
          path: 'products/new-product',
          element: (
            <Suspense fallback="loading...">
              <NewProducts />
            </Suspense>
          ),
        },
        {
          path: 'products/edit-product',
          element: (
            <Suspense fallback="loading...">
              <EditProduct />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'signup',
      element: <SignUp />,
    },
  ]);

  return routes;
}
