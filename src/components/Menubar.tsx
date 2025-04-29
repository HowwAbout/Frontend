// MenuBar.tsx
import React from "react";
import "./Menubar.css"; // 스타일 파일
import MenuIcon from "../assets/icons/MenuIcon.svg";

const MenuBar: React.FC = () => {
  return (
    <div className="menu-bar">
      <img src={MenuIcon} alt="Menu Icon" className="menu-icon" />
    </div>
  );
};

export default MenuBar;
