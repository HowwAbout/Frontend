import React from "react";
import EditNoteIcon from "../../assets/icons/EditNoteIcon.svg";
import "./AddScheduleHeader.css";

export default function TextAndImage() {
  return (
    <div className="addscheduleheader_text-and-image">
      <div className="addscheduleheader_group-6">
        <div className="addscheduleheader_content">
          <div className="addscheduleheader_title-description">
            <p className="addscheduleheader_title">Date Activity Name (= Title)</p>
          </div>
          <div className="addscheduleheader_leading-trailing-icons">
            <img src={EditNoteIcon} alt="Not Found" className="addscheduleheader_edit-note" />
            <div className="addscheduleheader_leading">
              <p className="addscheduleheader_date">Today</p>
              <p className="addscheduleheader_separator">•</p>
              <p className="addscheduleheader_time">23 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
