import React from "react";
import "./PlanListItem.css";
import DefaultImage_Small from "../assets/images/DefaultImage_Small.svg";

interface PlanListItemProps {
  title: string;
  date : string;
  description: string;
  onClick: () => void;
}

const PlanListItem: React.FC<PlanListItemProps> = ({
  title,
  description,
  date,
  onClick,
}) => {
  return (
    <div className="planlist_state-layer" onClick={onClick}>
      <img
        src={DefaultImage_Small}
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
