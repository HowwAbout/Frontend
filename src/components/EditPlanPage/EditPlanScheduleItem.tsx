import React from "react";
import "./EditPlanScheduleItem.css";
import MinusIcon from "../../assets/icons/MinusIcon.svg";
import Horizontal_Triangle from "../../assets/icons/Horizontal_Triangle.svg";

const ListItem01: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="editplanscheduleitem_list-item-01">
      <div className="editplanscheduleitem_text-and-image">
        <div className="editplanscheduleitem_content">
          <div className="editplanscheduleitem_title-description">
            <p className="editplanscheduleitem_title">Date Activity Name</p>
            <p className="editplanscheduleitem_secondary-text">
              Description duis aute irure dolor in reprehenderit in voluptate
              velit.
            </p>
          </div>
          <div className="editplanscheduleitem_leading-trailing-icons">
            <div className="editplanscheduleitem_leading">
              <img
                src={MinusIcon}
                alt="Not Found"
                className="editplanscheduleitem_icon"
              />
              <p className="editplanscheduleitem_date">Today</p>
              <p className="editplanscheduleitem_separator">•</p>
              <p className="editplanscheduleitem_time">23 min</p>
            </div>
            <img
              src={Horizontal_Triangle}
              alt="Not Found"
              className="editplanscheduleitem_icon-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem01;
