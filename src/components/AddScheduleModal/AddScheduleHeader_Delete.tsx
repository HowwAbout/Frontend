import React from "react";
import EditNoteIcon from "../../assets/icons/EditNoteIcon.svg";
import ConfirmAndAddtoScheduleButton from "../../assets/icons/ConfirmandAddtoschedulelist.svg";
import DeleteButton from "../../assets/icons/DeleteButton.svg";
import "./AddScheduleHeader.css";

interface AddScheduleHeaderProps {
  formData: {
    title: string;
    location: string;
    durationTime: string;
    description: string;
  };
  onSubmit: () => void; // Callback function to trigger the form submission
  PlanDelete: () => void;
}

const TextAndImage: React.FC<AddScheduleHeaderProps> = ({
  formData,
  onSubmit,
  PlanDelete,
}) => {
  return (
    <div className="addscheduleheader_text-and-image">
      <div className="addscheduleheader_group-6">
        <div className="addscheduleheader_content">
          <div className="addscheduleheader_title-description">
            <p className="addscheduleheader_title">{formData.title}</p>
          </div>
          <div className="addscheduleheader_leading-trailing-icons">
            <img
              src={EditNoteIcon}
              alt="Not Found"
              className="addscheduleheader_edit-note"
            />
            <div className="addscheduleheader_leading">
              <p className="addscheduleheader_time">{formData.location}</p>
              <p className="addscheduleheader_date">{formData.durationTime}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="addscheduleheader_buttons">
        <img
          src={DeleteButton}
          alt="Not Found"
          className="addscheduleheader_delete-button"
          onClick={PlanDelete}
        />
        <img
          src={ConfirmAndAddtoScheduleButton}
          alt="Not Found"
          className="addscheduleheader_edit-button"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default TextAndImage;
