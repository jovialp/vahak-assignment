import React from "react";
import logo from "./logo.svg";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <div className={style["header"]}>
      <div className={style["siteLogo"]}>
        <a className={style["logoLink"]} href="/">
          <img src={logo} alt="logo" className={style["logo"]} />
        </a>
      </div>
    </div>
  );
};

export default Header;
