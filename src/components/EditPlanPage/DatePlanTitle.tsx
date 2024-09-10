import React from "react";
import "./DatePlanTitle.css";
import DefaultImage_XLarge from "../../assets/images/DefaultImage_XLarge.svg";
import Favorite_Red from "../../assets/icons/Favorite_Red.svg";

interface ImageAndTitleProps {
  title: string;
  date: string;
  description: string;
}

export default function ImageAndTitle({
  title,
  date,
  description,
}: ImageAndTitleProps) {
  return (
    <div className="dateplantitle_image-and-title">
      <div className="dateplantitle_content">
        <img
          src={DefaultImage_XLarge}
          alt="Not Found"
          className="dateplantitle_trailing-element"
        />
        <div className="dateplantitle_headline-and-reviews">
          <p className="dateplantitle_headline">{title}</p>
        </div>
        <div className="dateplantitle_supporting-text-1">
          <div className="dateplantitle_details">
            <p className="dateplantitle_date">{date}</p>
          </div>
          <p className="dateplantitle_supporting-text">{description}</p>
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
