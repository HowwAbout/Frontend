import React from "react";
import "./DatePlanTitle.css";
import DefaultImage_XLarge from "../../assets/images/DefaultImage_XLarge.svg";
import Favorite_Red from "../../assets/icons/Favorite_Red.svg";

export default function ImageAndTitle() {
  return (
    <div className="dateplantitle_image-and-title">
      <div className="dateplantitle_content">
        <img
          src={DefaultImage_XLarge}
          alt="Not Found"
          className="dateplantitle_trailing-element"
        />
        <div className="dateplantitle_headline-and-reviews">
          <p className="dateplantitle_headline">Dating Schedule Title</p>
        </div>
        <div className="dateplantitle_supporting-text-1">
          <div className="dateplantitle_details">
            <p className="dateplantitle_date">2000.01.01</p>
            <p className="dateplantitle_categorylocation">
              Category • Location
            </p>
            <p className="dateplantitle_theme">Theme</p>
          </div>
          <p className="dateplantitle_supporting-text">
            Supporting line text lorem ipsum dolor sit amet, consectetur.
          </p>
        </div>
        <img
          src={Favorite_Red}
          alt="Not Found"
          className="dateplantitle_favorites"
        />
      </div>
    </div>
  );
}
