import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditPlanScheduleItem from "./EditPlanScheduleItem"; // Adjust the import path as necessary
import "./EditPlanScheduleList.css"; // Ensure to style the list if needed
import AddSchedule from "./AddSchedule";
import AddScheduleModal from "../AddScheduleModal/AddScheduleModal";

interface ScheduleItem {
  id: string;
  content: string;
}

const EditPlanScheduleList: React.FC<{
  items: Array<{ id: string; content: string }>;
}> = ({ items }) => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ScheduleItem | null>(null);

  useEffect(() => {
    const storedPlans = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    ) as ScheduleItem[];
    setSchedules(storedPlans);
  }, []);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setSchedules(reorderedItems);
  };

  const handleItemClick = (schedule: ScheduleItem) => {
    setModalData(schedule);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="editplanschedule-list">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="editplanschedule-list">
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
                      <EditPlanScheduleItem
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
      <AddSchedule />
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
