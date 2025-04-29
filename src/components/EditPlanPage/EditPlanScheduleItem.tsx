import React from "react";
import "./EditPlanScheduleItem.css";
import MinusIcon from "../../assets/icons/MinusIcon.svg";
import Horizontal_Triangle from "../../assets/icons/Horizontal_Triangle.svg";

type EditPlanScheduleItemProps = {
  title: string;
  durationTime: string;
  description: string;
  onClick?: () => void; // Make sure to add this line
};

const ListItem01: React.FC<EditPlanScheduleItemProps> = ({
  title,
  durationTime,
  description,
  onClick,
}) => {
  return (
    <div className="editplanscheduleitem_list-item-01" onClick={onClick}>
      <div className="editplanscheduleitem_text-and-image">
        <div className="editplanscheduleitem_content">
          <div className="editplanscheduleitem_title-description">
            <p className="editplanscheduleitem_title">{title}</p>
            <p className="editplanscheduleitem_secondary-text">{description}</p>
          </div>
          <div className="editplanscheduleitem_leading-trailing-icons">
            <div className="editplanscheduleitem_leading">
              <img
                src={MinusIcon}
                alt="Not Found"
                className="editplanscheduleitem_icon"
              />
              <p className="editplanscheduleitem_date">{durationTime}</p>
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
