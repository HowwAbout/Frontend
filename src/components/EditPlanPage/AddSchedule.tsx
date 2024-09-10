import React, { useState } from "react";
import "./AddSchedule.css";
import AddActivity from "../../assets/icons/AddActivity.svg";
import AddScheduleModalDelete from "../AddScheduleModal/AddScheduleModal_Delete";

interface AddScheduleProps {
  onClick?: () => void;
}

const AddList: React.FC<AddScheduleProps> = ({ onClick }) => {
  return (
    <div className="add-list" onClick={onClick}>
      <img src={AddActivity} alt="Not Found" className="forms-add-on" />
      <div className="state-layer">
        <div className="content clip-contents">
          <p className="headline">Add Activity...</p>
        </div>
      </div>
    </div>
  );
};

export default AddList;
