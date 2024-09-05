import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AIRecommendationItem from "./AIRecommendationItem"; // Adjust the import path as necessary
import "./AIRecommendationList.css"; // Ensure to style the list if needed
import AddSchedule from "./AddSchedule";
import AddScheduleModal from "../AddScheduleModal/AddScheduleModal";

interface RecommendationItem {
  id: string;
  content: string;
}

const EditPlanScheduleList: React.FC<{
  items: Array<{ id: string; content: string }>;
}> = ({ items }) => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    []
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<RecommendationItem | null>(null);

  useEffect(() => {
    const storedPlans = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    ) as RecommendationItem[];
    setRecommendations(storedPlans);
  }, []);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setRecommendations(reorderedItems);
  };

  const handleItemClick = (schedule: RecommendationItem) => {
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
              {items.map((schedule, index) => (
                <Draggable
                  key={schedule.id}
                  draggableId={schedule.id}
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
                        content={schedule.content}
                        onClick={() => handleItemClick(schedule)}
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
      {isModalOpen && (
        <AddScheduleModal
          data={modalData}
          onClose={closeModal}
        ></AddScheduleModal>
      )}
    </div>
  );
};

export default EditPlanScheduleList;
