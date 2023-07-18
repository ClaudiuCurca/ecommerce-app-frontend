import React, { useEffect, useState } from "react";
import { ReactComponent as MagnifyingGlass } from "./../img/svg/magnifying-glass2.svg";
import { ReactComponent as ShoppingCart } from "./../img/svg/shopping-cart.svg";
import { ReactComponent as DefaultUser } from "./../img/svg/user.svg";
import { ReactComponent as ArrowUp } from "./../img/svg/up-arrow.svg";
import { useNavigate, useLocation } from "react-router-dom";

import { logout } from "../Api/userAPI";

import Dropdown from "../Pages/Components/Dropdown";

import HeaderSmall from "./HeaderSmall";

function Header({ setSearchByTerm, userInfo, cartItems }) {
  const [dropdownShow, setDropdownShow] = useState(false);
  const [cartDropdownShow, setCartDropdownShow] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.length >= 3) {
      setSearchByTerm(searchTerm);

      // if we're not on the /products page navigate there
      if (location.pathname !== "/products") {
        navigate("/products");
      }
    } else {
      // TODO: show sometinh here to notify the user that he cna't search for someting that's less than 3 char
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 801);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogoClick = (e) => {
    setSearchByTerm("");
    setSearchTerm("");
    navigate("/");
  };

  if (!isSmallScreen) {
    const content = (
      <>
        {userInfo ? (
          <>
            {" "}
            <button
              className="header__nav__btn--my-account"
              id="dropdown-toggle"
              onMouseEnter={() => {
                setDropdownShow(true);
                setCartDropdownShow(false);
              }}
              onClick={() => setDropdownShow(!dropdownShow)}
            >
              {userInfo.photo ? (
                <img className="user-photo" src={userInfo.photo} alt="" />
              ) : (
                <DefaultUser className="user-photo" />
              )}{" "}
              {userInfo.isAdmin ? (
                <>Admin</>
              ) : (
                <>
                  My account <ArrowUp id="arrow-down"></ArrowUp>
                </>
              )}
              <Dropdown
                dropdownShow={dropdownShow}
                setDropdownShow={setDropdownShow}
              >
                <div
                  onClick={() => {
                    navigate("/my-profile");
                    setDropdownShow(false);
                  }}
                >
                  My profile
                </div>
                <div onClick={() => logout()}>Log out</div>
              </Dropdown>
            </button>
          </>
        ) : (
          <button
            className="header__nav__btn--login"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        )}
      </>
    );

    return (
      <div
        className="header"
        onMouseLeave={() => {
          setCartDropdownShow(false);
          setDropdownShow(false);
        }}
      >
        <h3 className="header__title" onClick={handleLogoClick}>
          Online shop
        </h3>
        <form className="header__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="header__search__input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button>
            <MagnifyingGlass className="header__search__svg" />
          </button>
        </form>
        <nav className="header__nav">
          {content}
          <button
            className="header__nav__btn--cart"
            onClick={() => navigate("/cart")}
            id="dropdown-cart-toggle"
            onMouseEnter={() => {
              setDropdownShow(false);
              setCartDropdownShow(true);
            }}
          >
            <div className="cart">
              <span className="cart__text">My cart</span>
              <ShoppingCart className="cart__svg" />
              {cartItems.length > 0 ? (
                <span className="cart__items-number"> {cartItems.length}</span>
              ) : (
                <></>
              )}
            </div>
            <Dropdown
              dropdownShow={cartDropdownShow}
              setDropdownShow={setCartDropdownShow}
            >
              {cartItems.map((item) => {
                return (
                  <div className="cart-item" key={item.productId}>
                    <img
                      src={item.productImage}
                      className="cart-item__image"
                      alt="not found"
                    ></img>
                    <div className="cart-item__name"> {item.productName} </div>
                    <div className="cart-item__price">
                      {" "}
                      {item.productPrice}${" "}
                    </div>
                    <div className="cart-item__quantity">
                      {" "}
                      x{item.productQuantity}{" "}
                    </div>
                  </div>
                );
              })}
              <div className="cart-total">
                Total:{" "}
                {cartItems.reduce(
                  (partialSum, item) =>
                    partialSum + item.productQuantity * item.productPrice,
                  0
                )}
                $
              </div>
            </Dropdown>
          </button>
        </nav>
      </div>
    );
  } else {
    return (
      <HeaderSmall
        handleSubmit={handleSubmit}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleLogoClick={handleLogoClick}
        cartItems={cartItems}
        userInfo={userInfo}
      />
    );
  }
}

export default Header;
