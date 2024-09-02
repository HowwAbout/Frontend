import React from "react";
import "./EditPlanHeader.css";
import { useNavigate } from "react-router-dom";
import DefaultImage_Small from "../../assets/images/DefaultImage_Small.svg";
import EditButton from "../../assets/icons/EditButton.svg";
import DeleteButton from "../../assets/icons/DeleteButton.svg";

const EditPlanHeader: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEditClick = () => {
    navigate("/editplan_page"); // Navigate to the desired route
  };

  return (
    <div className="editplan_contents">
      <div className="editplan_dating-schedule-title">
        <div className="editplan_text">
          <div className="editplan_state-layer">
            <img
              src={DefaultImage_Small}
              alt="Not Found"
              className="editplan_leading-element"
            />
            <div className="editplan_content">
              <div className="editplan_headline-and-reviews">
                <p className="editplan_headline">Date Plan Title</p>
              </div>
              <div className="editplan_supporting-text-1">
                <div className="editplan_details">
                  <p className="editplan_category">
                    2024.08.19 Location (서울) // 추후 개발
                  </p>
                </div>
                <p className="editplan_supporting-text">
                  Dating Plan에 대한 한줄 소개
                </p>
              </div>
            </div>
            <div className="editplan_buttons">
              <img
                src={EditButton}
                alt="Not Found"
                className="editplan_edit-button"
                onClick={handleEditClick}
              />
              <img
                src={DeleteButton}
                alt="Not Found"
                className="editplan_delete-button"
              />
            </div>
          </div>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/5stwe6j8uq-41%3A3670?alt=media&token=affc8d87-800c-4eba-851c-0865d78edd2b"
          alt="Not Found"
          className="editplan_divider"
        />
      </div>
    </div>
  );
};

export default EditPlanHeader;
