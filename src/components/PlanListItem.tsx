import React from "react";
import "./PlanListItem.css";
import DefaultImage_Small from "../assets/images/DefaultImage_Small.svg";

interface PlanListItemProps {
  content: string;
  onClick: () => void;
}

const PlanListItem: React.FC<PlanListItemProps> = ({ onClick }) => {
  return (
    <div className="planlist_state-layer" onClick={onClick}>
      <img
        src={DefaultImage_Small}
        alt="Not Found"
        className="leading-element"
      />
      <div className="planlist_content">
        <p className="planlist_headline">Date Plan Title</p>
        <p className="planlist_category">2000.01.01 Location // 추후 개발</p>
        <p className="planlist_supporting-text">Dating Plan에 대한 한줄 소개</p>
      </div>
    </div>
  );
};

export default PlanListItem;
