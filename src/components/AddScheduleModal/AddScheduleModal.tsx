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
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  aiRecommendation,
  onClose,
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

  const handleSubmit = async () => {
    try {
      // Example backend submission (you can customize the endpoint and request)
      const response = await fetch("/api/dateActivities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: "미정", // Assuming image is fixed
        }),
      });

      const result = await response.json();
      console.log("Backend response:", result);

      // Add additional logic here, e.g., refreshing the data or closing the modal
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
        <AddScheduleHeader formData={formData} onSubmit={handleSubmit} />
        <AddScheduleContents
          aiRecommendation={aiRecommendation}
          onFormChange={handleFormChange}
        />
      </div>
    </div>
  );
};

export default AddScheduleModal;
