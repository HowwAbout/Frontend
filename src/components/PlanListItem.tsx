import React from "react";
import "./PlanListItem.css";
import DefaultImage_Small from "../assets/images/DefaultImage_Small.svg";
import Image1 from "../assets/images/city-3622494_1280.jpg";
import Image2 from "../assets/images/coffee-5303998_1280.jpg";
import Image3 from "../assets/images/wine-4100669_1280.jpg";

interface PlanListItemProps {
  title: string;
  date: string;
  description: string;
  onClick: () => void;
  index: number;
}

const PlanListItem: React.FC<PlanListItemProps> = ({
  title,
  description,
  date,
  onClick,
  index,
}) => {
  // index 값에 따라 이미지 결정
  const getImageByIndex = () => {
    switch (index) {
      case 0:
        return Image1;
      case 1:
        return Image2;
      case 2:
        return Image3;
      default:
        return DefaultImage_Small;
    }
  };

  return (
    <div className="planlist_state-layer" onClick={onClick}>
      <img
        src={getImageByIndex()}
        alt="Not Found"
        className="leading-element"
      />
      <div className="planlist_content">
        <p className="planlist_headline">{title}</p>
        <p className="planlist_date">{date}</p>
        <p className="planlist_supporting-text">{description}</p>
      </div>
    </div>
  );
};

export default PlanListItem;
