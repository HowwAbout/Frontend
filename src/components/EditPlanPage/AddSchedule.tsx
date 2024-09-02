import React from "react";
import "./AddSchedule.css";
import AddActivity from "../../assets/icons/AddActivity.svg";

export default function AddList() {
  return (
    <div className="add-list">
      <img src={AddActivity} alt="Not Found" className="forms-add-on" />
      <div className="state-layer">
        <div className="content clip-contents">
          <p className="headline">Add Activity...</p>
        </div>
      </div>
    </div>
  );
}
