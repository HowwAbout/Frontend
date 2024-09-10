import React from "react";
import "./EditPlanListItem.css";
import Checkbox_Checked from "../../assets/icons/Checkbox_Checked.svg";
import Checkbox_Unchecked from "../../assets/icons/Checkbox_Unchecked.svg";

export default function EditPlanListItem({ title, checked, onToggle }: any) {
  return (
    <div className="editplanitem_list-item-1">
      <div className="editplanitem_state-layer">
        <div className="editplanitem_content clip-contents">
          <p className="editplanitem_headline">{title}</p>
        </div>
        <img
          src={checked ? Checkbox_Checked : Checkbox_Unchecked}
          alt="Not Found"
          onClick={onToggle}
          className="editplanitem_trailing-element"
        />
      </div>
    </div>
  );
}
