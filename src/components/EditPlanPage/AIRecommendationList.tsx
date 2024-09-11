import React, { useState, useEffect } from "react";
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
}

const EditPlanScheduleList: React.FC<EditPlanScheduleListProps> = ({
  items,
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
        ></AddScheduleModal>
      )}
    </div>
  );
};

export default EditPlanScheduleList;
