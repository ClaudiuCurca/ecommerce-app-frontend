import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "./Components/Header";

import ProductsBySearch from "./Pages/ProductsBySearchPage";
import ProductsByCategory from "./Pages/ProductsByCategoryPage";
import LoginPage from "./Pages/LoginPage";
import { getMyInfo } from "./Api/userAPI";
import Cookies from "js-cookie";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import MyProfilePage from "./Pages/User/MyProfilePage";
import PageNotFound from "./Pages/PageNotFound";
import ChangePasswordPage from "./Pages/User/ChangePasswordPage";
import EditReviewPage from "./Pages/User/EditReviewPage";
import OrderPage from "./Pages/User/OrderPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import WriteReviewPage from "./Pages/User/WriteReviewPage";
import CartPage from "./Pages/CartPage";
import { useSelector } from "react-redux";
import CheckoutPage from "./Pages/CheckoutPage";
import AdminNavigation from "./Pages/Admin/Components/AdminNavigation";
import AdminProductsPage from "./Pages/Admin/AdminProductsPage";
import AdminCategoriesPage from "./Pages/Admin/AdminCategoriesPage";
import AdminUsersPage from "./Pages/Admin/AdminUsersPage";
import AdminOrdersPage from "./Pages/Admin/AdminOrdersPage";
import AdminAddProductPage from "./Pages/Admin/AdminAddProductPage";
import AdminEditProductPage from "./Pages/Admin/AdminEditProductPage";
import AdminAddCategoryPage from "./Pages/Admin/AdminAddCategoryPage";
import AdminEditCategoryPage from "./Pages/Admin/AdminEditCategoryPage";
import AdminEditOrderPage from "./Pages/Admin/AdminEditOrderPage";
import AdminUserDetailsPage from "./Pages/Admin/AdminUserDetailsPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

function App() {
  const [searchByTerm, setSearchByTerm] = useState("");
  const [userInfo, setUserInfo] = useState(undefined);
  const [userInfoIsLoading, setUserInfoIsLoading] = useState(true);

  const cartItems = useSelector((state) => state.cart);

  // chcking the cookie to see if the user is logged in and retrieving userInfo
  useEffect(() => {
    const getMyUserInfo = async () => {
      try {
        setUserInfoIsLoading(true);
        const token = Cookies.get("token");

        if (token) {
          const fetchedUserInfo = await getMyInfo();
          console.log(fetchedUserInfo);
          setUserInfo({
            ...fetchedUserInfo.user,
            productsReviewed: fetchedUserInfo.productsReviewed,
          });
        }

        setUserInfoIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getMyUserInfo();
  }, []);

  if (userInfoIsLoading) {
    return <div></div>; //TODO:
  }

  return (
    <BrowserRouter>
      <Header
        setSearchByTerm={setSearchByTerm}
        userInfo={userInfo}
        cartItems={cartItems}
      />

      {userInfo?.isAdmin ? <AdminNavigation /> : <></>}

      <Routes>
        <Route>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route
            path="/resetPassword/:passwordResetToken"
            element={<ResetPasswordPage />}
          />

          <Route
            path="/products"
            element={<ProductsBySearch searchByTerm={searchByTerm} />}
          />
          <Route
            path="/product/:productId"
            element={<ProductDetailsPage userInfo={userInfo} />}
          />
          <Route
            path="/category/:categoryName"
            element={<ProductsByCategory searchByTerm={searchByTerm} />}
          />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route element={<ProtectedRoutes userInfo={userInfo} admin={false} />}>
          {/* User routes */}
          <Route
            path="/my-profile"
            element={<MyProfilePage userInfo={userInfo} />}
          ></Route>
          <Route
            path="/my-profile/change-password"
            element={<ChangePasswordPage />}
          ></Route>
          <Route
            path="/edit-review/:reviewId"
            element={<EditReviewPage userInfo={userInfo} />}
          ></Route>
          <Route
            path="/product/:productId/write-review"
            element={<WriteReviewPage userInfo={userInfo} />}
          ></Route>
          <Route
            path="/my-orders/:orderId"
            element={<OrderPage userInfo={userInfo} />}
          ></Route>
          <Route
            path="/cart/checkout"
            element={<CheckoutPage userInfo={userInfo} />}
          />
        </Route>

        <Route element={<ProtectedRoutes userInfo={userInfo} admin={true} />}>
          {/* Admin routes */}

          <Route path="/admin/products" element={<AdminProductsPage />}></Route>
          <Route
            path="/admin/products/add-product"
            element={<AdminAddProductPage />}
          ></Route>
          <Route
            path="/admin/products/:productId"
            element={<AdminEditProductPage />}
          ></Route>

          <Route
            path="/admin/categories"
            element={<AdminCategoriesPage />}
          ></Route>
          <Route
            path="/admin/categories/add-category"
            element={<AdminAddCategoryPage />}
          ></Route>
          <Route
            path="/admin/categories/:categoryName"
            element={<AdminEditCategoryPage />}
          ></Route>

          <Route path="/admin/users" element={<AdminUsersPage />}></Route>
          <Route
            path="/admin/users/:userId"
            element={<AdminUserDetailsPage />}
          />

          <Route path="/admin/orders" element={<AdminOrdersPage />}></Route>
          <Route
            path="/admin/orders/:orderId"
            element={<AdminEditOrderPage />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
