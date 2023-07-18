import React, { useEffect, useState } from "react";
import { ReactComponent as MagnifyingGlass } from "./../img/svg/magnifying-glass2.svg";
import { ReactComponent as ShoppingCart } from "./../img/svg/shopping-cart.svg";
import { ReactComponent as DefaultUser } from "./../img/svg/user.svg";
import { ReactComponent as ArrowUp } from "./../img/svg/up-arrow.svg";

import { useNavigate } from "react-router-dom";
import { logout } from "../Api/userAPI";
import { fetchCategoryNames } from "../Api/CategoryAPI";

function HeaderSmall({
  handleSubmit,
  searchTerm,
  setSearchTerm,
  handleLogoClick,
  cartItems,
  userInfo,
}) {
  const [navigationShow, setNavigationShow] = useState(false);

  const [categoryNames, setCategoryNames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategoryNames = async () => {
      try {
        const fetchedCategoryNames = await fetchCategoryNames();
        setCategoryNames(fetchedCategoryNames.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    getCategoryNames();
  }, []);

  const content = userInfo ? (
    <>
      {" "}
      <button
        className="navigation__side-bar--user"
        onClick={() => {
          navigate("/my-profile");
          setNavigationShow(false);
        }}
      >
        {userInfo.isAdmin ? <>Admin </> : <>My account</>}{" "}
        {userInfo.photo ? (
          <img className="user-photo" src={userInfo.photo} alt="" />
        ) : (
          <DefaultUser className="user-photo" />
        )}
      </button>
      <button
        className="navigation__side-bar--log-out"
        onClick={() => logout()}
      >
        Log out
      </button>
    </>
  ) : (
    <button
      className="navigation__side-bar--log-in"
      onClick={() => {
        navigate("/login");
        setNavigationShow(false);
      }}
    >
      Log in
    </button>
  );

  return (
    <header className="header-small">
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
          checked={navigationShow}
          onChange={(e) => setNavigationShow(e.target.checked)}
        />
        <label htmlFor="navi-toggle" className="navigation__icon">
          &nbsp;
        </label>
        <div
          className="navigation__side-bar"
          style={{ transform: navigationShow ? "translateX(0)" : "" }}
        >
          {content}
          <button className="navigation__side-bar--categories-title">
            Categories
          </button>

          {categoryNames.map((category) => (
            <button
              key={category.name}
              className="navigation__side-bar--category"
              onClick={() => {
                navigate(`/category/${category.name}`);
                setNavigationShow(false);
              }}
            >
              {category.name} <ArrowUp id="arrow-right" />
            </button>
          ))}
        </div>
      </div>
      <h3 className="header-small__title" onClick={handleLogoClick}>
        OS
      </h3>
      <form className="header-small__search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="header-small__search__input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button>
          <MagnifyingGlass className="header-small__search__svg" />
        </button>
      </form>

      <button className="header-small__cart" onClick={() => navigate("/cart")}>
        <div className="cart">
          <ShoppingCart className="cart__svg" />
          {cartItems.length > 0 ? (
            <span className="cart__items-number"> {cartItems.length}</span>
          ) : (
            <></>
          )}
        </div>
      </button>
    </header>
  );
}

export default HeaderSmall;
