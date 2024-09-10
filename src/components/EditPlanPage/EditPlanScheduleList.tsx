import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditPlanScheduleItem from "./EditPlanScheduleItem";
import "./EditPlanScheduleList.css";
import AddSchedule from "./AddSchedule";
import AddScheduleModalDelete from "../AddScheduleModal/AddScheduleModal_Delete";

interface EditPlanScheduleItemProps {
  id: string;
  title: string;
  durationTime: string;
  description: string;
}

interface EditPlanScheduleListProps {
  items: EditPlanScheduleItemProps[];
}

const EditPlanScheduleList: React.FC<EditPlanScheduleListProps> = ({
  items,
}) => {
  const [schedules, setSchedules] = useState<EditPlanScheduleItemProps[]>([]); // Fix type here
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<EditPlanScheduleItemProps | null>(
    null
  ); // Fix type here

  useEffect(() => {
    const storedPlans = JSON.parse(
      localStorage.getItem("plans") || "[]"
    ) as EditPlanScheduleItemProps[];
    setSchedules(storedPlans);
  }, []);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setSchedules(reorderedItems); // Fix type here
  };

  const handleItemClick = (schedule: EditPlanScheduleItemProps) => {
    setModalData(schedule); // Fix type here
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const OpenAddModal = () => {
    setModalOpen(true);
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
                        title={schedule.title}
                        durationTime={schedule.durationTime}
                        description={schedule.description}
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
      <AddSchedule onClick={OpenAddModal} />
      {isModalOpen && (
        <AddScheduleModalDelete
          data={modalData}
          onClose={closeModal}
        ></AddScheduleModalDelete>
      )}
    </div>
  );
};

export default EditPlanScheduleList;
