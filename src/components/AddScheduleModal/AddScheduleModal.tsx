import React, { useState } from "react";
import "./AddScheduleModal.css";
import AddScheduleHeader from "./AddScheduleHeader";
import AddScheduleContents from "./AddScheduleContents";

interface AIRecommendation {
  activityDescription: string;
  activityImage: string;
  activityLocation: string;
  activityTitle: string;
  timeTotal: string;
}

interface AddScheduleModalProps {
  aiRecommendation: AIRecommendation; // Data from AIRecommendationList
  onClose: () => void;
  onAddActivity: () => void;
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  aiRecommendation,
  onClose,
  onAddActivity,
}) => {
  const [formData, setFormData] = useState({
    title: aiRecommendation.activityTitle,
    location: aiRecommendation.activityLocation,
    durationTime: aiRecommendation.timeTotal,
    description: aiRecommendation.activityDescription,
  });

  const handleFormChange = (updatedData: {
    title: string;
    location: string;
    durationTime: string;
    description: string;
  }) => {
    // Update form data state when changes occur in AddScheduleContents
    setFormData(updatedData);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 콘텐츠 내부 클릭 시에는 모달이 닫히지 않도록 이벤트 전파를 막음
  };

  return (
    <div className="addschedule_modal-overlay" onClick={handleOverlayClick}>
      <div className="addschedule_modal-content" onClick={handleContentClick}>
        <AddScheduleHeader formData={formData} onSubmit={onAddActivity} />
        <AddScheduleContents
          aiRecommendation={aiRecommendation}
          onFormChange={handleFormChange}
        />
      </div>
    </div>
  );
};

export default AddScheduleModal;
