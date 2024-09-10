import React from "react";
import "./AIRecommendationItem.css";
import PlusIcon from "../../assets/icons/PlusIcon.svg";
import Horizontal_Triangle from "../../assets/icons/Horizontal_Triangle.svg";

type AIRecommendationItemProps = {
  id: string;
  activityTitle: string;
  activityDescription: string;
  activityLocation: string;
  timeTotal: string;
  onClick?: () => void; // Make sure to add this line
};

const ListItem01: React.FC<AIRecommendationItemProps> = ({
  activityTitle,
  activityDescription,
  activityLocation,
  timeTotal,
  onClick,
}) => {
  return (
    <div className="airecommendationitem_list-item-01" onClick={onClick}>
      <div className="airecommendationitem_text-and-image">
        <div className="airecommendationitem_content">
          <div className="airecommendationitem_title-description">
            <p className="airecommendationitem_title">{activityTitle}</p>
            <p className="airecommendationitem_secondary-text">
              {activityDescription}
            </p>
          </div>
          <div className="airecommendationitem_leading-trailing-icons">
            <div className="airecommendationitem_leading">
              <img
                src={PlusIcon}
                alt="Not Found"
                className="airecommendationitem_icon"
              />
              <p className="airecommendationitem_date">{activityLocation}</p>
              <p className="airecommendationitem_separator">•</p>
              <p className="airecommendationitem_time">{timeTotal}</p>
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
