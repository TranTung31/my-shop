import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSuccessPage from "../pages/OrderSuccessPage/OrderSuccessPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import OrderDetailPage from "../pages/OrderDetailPage/OrderDetailPage";
import IntroPage from "../pages/IntroPage/IntroPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import MyContactPage from "../pages/MyContactPage/MyContactPage";
import ProductAuthorPage from "../pages/ProductAuthorPage/ProductAuthorPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/order-success",
    page: OrderSuccessPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/order-detail/:id",
    page: OrderDetailPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/product-spage",
    page: ProductsPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/user-detail",
    page: ProfilePage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/product-detail/:id",
    page: ProductDetail,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
    isShowFooter: false,
  },
  {
    path: "/intro",
    page: IntroPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/product-author/:id",
    page: ProductAuthorPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/contact",
    page: ContactPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/my-contact",
    page: MyContactPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
