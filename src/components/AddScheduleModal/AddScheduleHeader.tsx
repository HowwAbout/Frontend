import React from "react";
import EditNoteIcon from "../../assets/icons/EditNoteIcon.svg";
import ConfirmAndAddtoScheduleButton from "../../assets/icons/ConfirmandAddtoschedulelist.svg";
import "./AddScheduleHeader.css";

interface AddScheduleHeaderProps {
  formData: {
    title: string;
    location: string;
    durationTime: string;
    description: string;
  };
  onSubmit: () => void; // Callback function to trigger the form submission
}

const TextAndImage: React.FC<AddScheduleHeaderProps> = ({ formData, onSubmit }) => {
  
  const handleSubmit = async () => {
    try {
      // First POST request to /api/dateActivities
      const response = await fetch(`/api/dateActivities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          durationTime: formData.durationTime,
          description: formData.description,
          image: "미정", // Placeholder for image
        }),
      });

      const result = await response.json();

      if (onSubmit) {
        onSubmit(); // Trigger further actions if needed
      }

      // Log response for debugging purposes
      console.log(result);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  
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
      <div className="editplan_buttons">
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
