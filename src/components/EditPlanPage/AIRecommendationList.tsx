import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AIRecommendationItem from "./AIRecommendationItem"; // Adjust the import path as necessary
import "./AIRecommendationList.css"; // Ensure to style the list if needed
import AddSchedule from "./AddSchedule";
import AddScheduleModal from "../AddScheduleModal/AddScheduleModal";

interface AIRecommendationListProps {
  activityDescription: string;
  activityImage: string;
  activityLocation: string;
  activityTitle: string;
  timeTotal: string;
}

interface EditPlanScheduleListProps {
  items: AIRecommendationListProps[];
  id: number;
  addActivity: () => void;
}

const EditPlanScheduleList: React.FC<EditPlanScheduleListProps> = ({
  items,
  id,
  addActivity,
}) => {
  const [recommendations, setRecommendations] = useState<
    AIRecommendationListProps[]
  >([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<AIRecommendationListProps | null>(
    null
  );

  useEffect(() => {
    const storedRecommendations = JSON.parse(
      localStorage.getItem("recommendations") || "[]"
    ) as AIRecommendationListProps[];
    setRecommendations(storedRecommendations);
  }, []);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(recommendations); // Use the recommendations state
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setRecommendations(reorderedItems);
    localStorage.setItem("recommendations", JSON.stringify(reorderedItems));
  };

  const handleItemClick = (schedule: AIRecommendationListProps) => {
    setModalData(schedule);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const AddActivity = async () => {
    if (!modalData) return; // Ensure there's modal data to send

    try {
      const activityData = {
        title: modalData.activityTitle,
        location: modalData.activityLocation,
        durationTime: modalData.timeTotal,
        description: modalData.activityDescription,
        image: modalData.activityImage, // Use the provided image
      };

      // First POST request to create a new activity
      const response = await axios.post(
        `https://assemblytown.com/api/dateActivities`,
        activityData
      );
      const newActivityId = response.data.dateActivityId;

      // Second POST request to link the activity to the plan
      const response_post = await axios.post(
        `https://assemblytown.com/api/plan-activities/${id}`, // Use the provided datePlan.id
        {
          dateActivityId: newActivityId,
          order: recommendations.length + 1, // Use the length of the current recommendations
        }
      );

      console.log(
        "Activity linked to the plan successfully:",
        response_post.data
      );

      // You can fetch updated data if necessary
      closeModal();
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <div className="airecommendation-list">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="airecommendation-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`plan-item ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                    >
                      <AIRecommendationItem
                        key={index}
                        id={index.toString()} // Pass index as id
                        activityTitle={item.activityTitle}
                        activityDescription={item.activityDescription}
                        activityLocation={item.activityLocation}
                        timeTotal={item.timeTotal}
                        onClick={() => handleItemClick(item)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isModalOpen && modalData && (
        <AddScheduleModal
          aiRecommendation={modalData}
          onClose={closeModal}
          onAddActivity={addActivity}
        ></AddScheduleModal>
      )}
    </div>
  );
};

export default EditPlanScheduleList;
