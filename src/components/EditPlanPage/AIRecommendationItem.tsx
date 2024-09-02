import React from "react";
import "./AIRecommendationItem.css";
import PlusIcon from "../../assets/icons/PlusIcon.svg";
import Horizontal_Triangle from "../../assets/icons/Horizontal_Triangle.svg";

const ListItem01: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="airecommendationitem_list-item-01">
      <div className="airecommendationitem_text-and-image">
        <div className="airecommendationitem_content">
          <div className="airecommendationitem_title-description">
            <p className="airecommendationitem_title">Date Activity Name</p>
            <p className="airecommendationitem_secondary-text">
              Description duis aute irure dolor in reprehenderit in voluptate
              velit.
            </p>
          </div>
          <div className="airecommendationitem_leading-trailing-icons">
            <div className="airecommendationitem_leading">
              <img
                src={PlusIcon}
                alt="Not Found"
                className="airecommendationitem_icon"
              />
              <p className="airecommendationitem_date">Today</p>
              <p className="airecommendationitem_separator">•</p>
              <p className="airecommendationitem_time">23 min</p>
            </div>
            <img
              src={Horizontal_Triangle}
              alt="Not Found"
              className="airecommendationitem_icon-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem01;
