import React, { useState } from "react";
import "./PlanListItem.css";
import DefaultImage_Small from "../assets/images/DefaultImage_Small.svg";
import EditPlanModal from "./EditPlan/EditPlanModal";
import EditPlanHeader from "./EditPlan/EditPlanHeader";
import EditPlanList from "./EditPlan/EditPlanList";

interface PlanListItemProps {
  content: string;
}

const PlanListItem: React.FC<PlanListItemProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="planlist_state-layer" onClick={openModal}>
      <img
        src={DefaultImage_Small}
        alt="Not Found"
        className="leading-element"
      />
      <div className="planlist_content">
        <p className="planlist_headline">Date Plan Title</p>
        <p className="planlist_category">2000.01.01 Location // 추후 개발</p>
        <p className="planlist_supporting-text">Dating Plan에 대한 한줄 소개</p>
      </div>

      <EditPlanModal isOpen={isModalOpen} onClose={closeModal}>
        <EditPlanHeader />
        <EditPlanList />
      </EditPlanModal>
    </div>
  );
};

export default PlanListItem;
