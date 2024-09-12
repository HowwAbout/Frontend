import React, { useState } from "react";
import axios from "axios";
import "./AddScheduleModal.css";
import AddScheduleHeaderDelete from "./AddScheduleHeader_Delete";
import AddScheduleContents from "./AddScheduleContents";

interface DateActivityResponse {
  id: number;
  title: string;
  location: string;
  durationTime: string;
  description: string;
}

interface AIRecommendation {
  activityTitle: string;
  activityLocation: string;
  timeTotal: string;
  activityDescription: string;
}

interface AddScheduleModalProps {
  dateActivityResponse: DateActivityResponse; // Data from AIRecommendationList
  onClose: () => void;
  datePlanId: number;
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  dateActivityResponse,
  onClose,
  datePlanId,
}) => {
  const [formData, setFormData] = useState({
    id: dateActivityResponse.id, // id는 상태에서 유지
    title: dateActivityResponse.title,
    location: dateActivityResponse.location,
    durationTime: dateActivityResponse.durationTime,
    description: dateActivityResponse.description,
  });

  const aiRecommendation: AIRecommendation = {
    activityTitle: dateActivityResponse.title,
    activityLocation: dateActivityResponse.location,
    timeTotal: dateActivityResponse.durationTime,
    activityDescription: dateActivityResponse.description,
  };

  const handleFormChange = (updatedData: {
    title: string;
    location: string;
    durationTime: string;
    description: string;
  }) => {
    // id를 제외하고 상태를 업데이트
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...updatedData,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { id, ...dataToSend } = formData;

      const response = await axios.put(
        `http://assemblytown.com/api/dateActivities/${dateActivityResponse.id}`, // Use the dateActivityId from the response
        {
          ...dataToSend,
          image: "미정", // Assuming the image is fixed
        }
      );

      console.log("Backend response:", response.data);

      // Additional logic, e.g., refreshing the data or closing the modal
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const PlanDelete = async () => {
    try {
      await axios.delete(
        `http://assemblytown.com/api/dateActivities/${dateActivityResponse.id}`
      );
      console.log("Plan Deleted");
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
        <AddScheduleHeaderDelete
          formData={formData}
          onSubmit={handleSubmit}
          PlanDelete={PlanDelete}
        />
        <AddScheduleContents
          aiRecommendation={aiRecommendation}
          onFormChange={handleFormChange} // onFormChange에서 id 제외
        />
      </div>
    </div>
  );
};

export default AddScheduleModal;
