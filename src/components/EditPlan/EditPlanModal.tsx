import React from "react";
import EditPlanHeader from "../EditPlan/EditPlanHeader";
import EditPlanList from "../EditPlan/EditPlanList";
import "./EditPlanModal.css";

interface EditPlanModalProps {
  data: any;
  onClose: () => void;
}

const EditPlanModal: React.FC<EditPlanModalProps> = ({ data, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 콘텐츠 내부 클릭 시에는 모달이 닫히지 않도록 이벤트 전파를 막음
  };

  return (
    <div className="editplan_modal-overlay" onClick={handleOverlayClick}>
      <div className="editplan_modal-content" onClick={handleContentClick}>
        <EditPlanHeader />
        <EditPlanList />
      </div>
    </div>
  );
};

export default EditPlanModal;
